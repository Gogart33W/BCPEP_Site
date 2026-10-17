import { BELL_SCHEDULE } from '../data/collegeData';

export function parseRawSubstitutions(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const parsed = [];

  lines.forEach((line, index) => {
    // Формат: П-422 | 2 пара | Бази даних -> Хмарні технології | Пелихівський Л.О. | ауд. 34
    const parts = line.split('|').map(p => p.trim());
    if (parts.length >= 3) {
      const group = parts[0].toUpperCase().replace(/\s+/g, '-');
      const pairMatch = parts[1].match(/\d+/);
      const pair = pairMatch ? parseInt(pairMatch[0], 10) : 1;
      const subjects = parts[2].split('->').map(s => s.trim());
      const oldSubject = subjects[0] || '—';
      const newSubject = subjects[1] || subjects[0];
      const teacher = parts[3] || 'Викладач за розкладом';
      const room = parts[4] || 'За вказівкою';

      parsed.push({
        id: `custom-sub-${Date.now()}-${index}`,
        group,
        day: new Date().getDay() || 1,
        pair,
        oldSubject,
        newSubject: `⚡ ЗАМІНА: ${newSubject}`,
        teacher,
        room,
        reason: 'Диспетчерська заміна',
        meetUrl: ''
      });
    } else {
      const groupMatch = line.match(/([ПАЕФЮМТЛ]|ЛХЛ|ФВ|МХ|ТКТ)-\d+/i);
      const pairMatch = line.match(/(\d+)\s*пара/i);

      if (groupMatch && pairMatch) {
        parsed.push({
          id: `custom-sub-${Date.now()}-${index}`,
          group: groupMatch[0].toUpperCase(),
          day: new Date().getDay() || 1,
          pair: parseInt(pairMatch[1], 10),
          oldSubject: 'Пара за розкладом',
          newSubject: `⚡ ЗАМІНА: ${line}`,
          teacher: 'За наказом',
          room: 'Згідно оголошення',
          reason: 'Експрес-заміна',
          meetUrl: ''
        });
      }
    }
  });

  return parsed;
}

export function getMergedSchedule(baseSchedule, substitutions, groupId, dayNumber) {
  const groupSchedule = (baseSchedule[groupId] && baseSchedule[groupId][String(dayNumber)]) || [];
  
  const result = BELL_SCHEDULE.map(bell => {
    const basePair = groupSchedule.find(p => p.pair === bell.pair);
    const sub = substitutions.find(
      s => (s.group === groupId || s.group.replace('-', '') === groupId.replace('-', '')) &&
           Number(s.day) === Number(dayNumber) &&
           Number(s.pair) === Number(bell.pair)
    );

    if (sub) {
      return {
        pair: bell.pair,
        time: `${bell.start} – ${bell.end}`,
        subject: sub.newSubject,
        oldSubject: sub.oldSubject || (basePair ? basePair.subject : '—'),
        teacher: sub.teacher,
        room: sub.room,
        type: 'Заміна',
        isSubstituted: true,
        reason: sub.reason,
        meetUrl: sub.meetUrl || (basePair && basePair.meetUrl) || ''
      };
    }

    if (basePair) {
      return {
        pair: bell.pair,
        time: `${bell.start} – ${bell.end}`,
        subject: basePair.subject,
        oldSubject: null,
        teacher: basePair.teacher,
        room: basePair.room,
        type: basePair.type || 'Пара',
        isSubstituted: false,
        reason: null,
        meetUrl: basePair.meetUrl || ''
      };
    }

    return {
      pair: bell.pair,
      time: `${bell.start} – ${bell.end}`,
      subject: '—',
      oldSubject: null,
      teacher: '',
      room: '',
      type: 'Вікно',
      isSubstituted: false,
      reason: null,
      meetUrl: ''
    };
  });

  return result;
}

export function getCurrentPairInfo() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const item of BELL_SCHEDULE) {
    const [startH, startM] = item.start.split(':').map(Number);
    const [endH, endM] = item.end.split(':').map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (currentMinutes >= startTotal && currentMinutes <= endTotal) {
      const remainingMinutes = endTotal - currentMinutes;
      return {
        status: 'in_progress',
        pair: item.pair,
        remainingMinutes,
        text: `Зараз триває ${item.pair}-а пара (залишилось ${remainingMinutes} хв)`
      };
    }

    if (currentMinutes < startTotal) {
      const untilStart = startTotal - currentMinutes;
      if (untilStart <= 30) {
        return {
          status: 'upcoming',
          pair: item.pair,
          remainingMinutes: untilStart,
          text: `Перерва. До початку ${item.pair}-ї пари: ${untilStart} хв`
        };
      }
    }
  }

  return {
    status: 'idle',
    pair: null,
    remainingMinutes: 0,
    text: 'Навчальний день завершено або пари ще не розпочались'
  };
}
