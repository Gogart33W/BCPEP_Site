import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Video, AlertTriangle, RefreshCw, Upload, 
  CheckCircle, FileText, Download, Share2, Sparkles, MapPin, User,
  Bot, Check
} from 'lucide-react';
import { GROUPS, BASE_SCHEDULE } from '../data/collegeData';
import { getMergedSchedule, getCurrentPairInfo, parseRawSubstitutions } from '../utils/scheduleParser';

const DAYS = [
  { id: 1, name: 'Понеділок', short: 'Пн' },
  { id: 2, name: 'Вівторок', short: 'Вт' },
  { id: 3, name: 'Середа', short: 'Ср' },
  { id: 4, name: 'Четвер', short: 'Чт' },
  { id: 5, name: 'П’ятниця', short: 'Пт' }
];

export default function ScheduleModule({ 
  substitutions, 
  onUpdateSubstitutions, 
  selectedGroup, 
  onSelectGroup 
}) {
  const [activeDay, setActiveDay] = useState(5);
  const [weekType, setWeekType] = useState('numerator');
  const [dispatcherOpen, setDispatcherOpen] = useState(false);
  const [goshaOpen, setGoshaOpen] = useState(false);
  const [goshaSyncing, setGoshaSyncing] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);
  const [rawText, setRawText] = useState(
`ПЗ-41 | 1 пара | Дипломне проектування -> Архітектура хмарних систем | Пелихівський Л.О. | ауд. 34
ПЗ-41 | 4 пара | вікно -> Консультація до дипломного проєкту | Пелихівський Л.О. | Google Meet
ПЗ-31 | 2 пара | Операційні системи -> Практикум з Linux | Пелихівський Л.О. | ауд. 34`
  );
  const [successToast, setSuccessToast] = useState(null);
  const [currentPair, setCurrentPair] = useState(getCurrentPairInfo());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPair(getCurrentPairInfo());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const currentSchedule = getMergedSchedule(
    BASE_SCHEDULE,
    substitutions,
    selectedGroup,
    activeDay
  );

  const activeSubCount = currentSchedule.filter(p => p.isSubstituted).length;

  const handleApplySubstitutions = () => {
    const parsed = parseRawSubstitutions(rawText);
    if (parsed.length > 0) {
      onUpdateSubstitutions([...substitutions, ...parsed]);
      setSuccessToast(`Застосовано ${parsed.length} нових замін!`);
      setTimeout(() => setSuccessToast(null), 4000);
      setDispatcherOpen(false);
    }
  };

  const getTomorrowDayId = () => {
    const day = new Date().getDay();
    if (day >= 5 || day === 0) return 1;
    return day + 1;
  };

  const handleSelectTomorrow = () => {
    const nextDay = getTomorrowDayId();
    setActiveDay(nextDay);
    setSuccessToast(`Перемкнуто на розклад на завтра (${DAYS.find(d => d.id === nextDay)?.name})`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleGoshaSync = () => {
    setGoshaSyncing(true);
    setTimeout(() => {
      setGoshaSyncing(false);
      setSuccessToast(`Гоша: заміни для ${selectedGroup} успішно синхронізовано з Telegram!`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 600);
  };

  const handleCopyTelegramSchedule = () => {
    const dayName = DAYS.find(d => d.id === activeDay)?.name;
    const lines = [
      `📌 Розклад для ${selectedGroup} на ${dayName} (${weekType === 'numerator' ? 'чисельник' : 'знаменник'}):`
    ];
    currentSchedule.forEach(p => {
      if (p.subject === '—') return;
      if (p.isSubstituted) {
        lines.push(`${p.pair} пара (${p.time}) ⚡ ЗАМІНА: ${p.subject.replace('⚡ ЗАМІНА: ', '')} | ${p.teacher} | ${p.room}`);
      } else {
        lines.push(`${p.pair} пара (${p.time}) • ${p.subject} | ${p.teacher} | ${p.room}`);
      }
    });
    lines.push('\n🔗 Офіційний портал: bfcpep.org.ua (синхронізовано з ботом Гоша)');
    
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedTelegram(true);
    setTimeout(() => setCopiedTelegram(false), 2500);
  };

  return (
    <section className="schedule-section" id="schedule-block">
      <div className="container">
        {/* Заголовок блоку */}
        <div className="schedule-header">
          <div>
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Динамічний розклад нового покоління</span>
            </div>
            <h2 className="section-title">Розклад пар та оперативні заміни</h2>
            <p className="section-subtitle">
              Більше ніяких нечитабельних сканів документів. 
              Система автоматично накладає заміни на розклад твоєї групи у реальному часі.
            </p>
          </div>

          <div className="schedule-header-actions">
            <button 
              className="btn btn-primary btn-sm gosha-toggle-btn"
              onClick={() => setGoshaOpen(!goshaOpen)}
              title="Інтеграція з ботом Гоша"
            >
              <Bot size={16} />
              <span>{goshaOpen ? 'Сховати Гошу' : 'Гоша-синк (Telegram)'}</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setDispatcherOpen(!dispatcherOpen)}
            >
              <Upload size={16} />
              <span>{dispatcherOpen ? 'Сховати диспетчерську' : 'Диспетчерська (імпорт)'}</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => window.print()}
              title="Друк розкладу"
            >
              <Download size={16} />
              <span>Експорт / Друк</span>
            </button>
          </div>
        </div>

        {/* Спливаюче повідомлення */}
        {successToast && (
          <div className="toast-success">
            <CheckCircle size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* Панель швидкого імпорту замін диспетчера */}
        {dispatcherOpen && (
          <div className="dispatcher-panel">
            <div className="dispatcher-header">
              <div>
                <h4>Швидкий парсер замін диспетчерської коледжу</h4>
                <p>Встав текст замін рядками: <code>Група | Номер пари | Старий предмет -&gt; Новий предмет | Викладач | Ауд</code></p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={handleResetSubstitutions}>
                Скинути до стандартних
              </button>
            </div>
            <textarea 
              className="dispatcher-textarea"
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="ПЗ-41 | 1 пара | Математика -> Веб-розробка | Пелихівський Л.О. | ауд. 34"
            />
            <div className="dispatcher-footer">
              <span className="format-hint">Підтримує копіювання з Viber/Word або Google Таблиць</span>
              <button className="btn btn-primary btn-sm" onClick={handleApplySubstitutions}>
                Застосувати зміни для сайту
              </button>
            </div>
          </div>
        )}

        {/* Панель бота Гоша */}
        {goshaOpen && (
          <div className="gosha-panel">
            <div className="gosha-header">
              <div className="gosha-title-wrap">
                <div className="gosha-avatar">
                  <Bot size={22} />
                </div>
                <div>
                  <h4>Асистент розкладу «Гоша» • Live Telegram Sync</h4>
                  <p>Автоматична перевірка замін для {selectedGroup} та швидкий експорт у бесіду групи</p>
                </div>
              </div>
              <div className="gosha-status-badge">
                <span className="pulse-dot"></span>
                <span>Бот активний • База синхронізована</span>
              </div>
            </div>

            <div className="gosha-actions-grid">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleSelectTomorrow}
              >
                <Calendar size={15} />
                <span>Відкрити розклад на завтра</span>
              </button>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleGoshaSync}
                disabled={goshaSyncing}
              >
                <RefreshCw size={15} className={goshaSyncing ? 'spin-icon' : ''} />
                <span>{goshaSyncing ? 'Оновлення...' : 'Синхронізувати заміни'}</span>
              </button>

              <button 
                className="btn btn-primary btn-sm gosha-share-btn"
                onClick={handleCopyTelegramSchedule}
              >
                {copiedTelegram ? <Check size={15} /> : <Share2 size={15} />}
                <span>{copiedTelegram ? 'Скопійовано для чату!' : 'Скопіювати для Telegram-бесіди'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Панель фільтрів: Вибір групи та дня */}
        <div className="schedule-controls">
          {/* Вибір групи */}
          <div className="group-selector-box">
            <label className="control-label">Оберіть академічну групу:</label>
            <div className="group-pills">
              {GROUPS.map(g => (
                <button
                  key={g.id}
                  className={`group-pill ${selectedGroup === g.id ? 'active' : ''}`}
                  onClick={() => onSelectGroup(g.id)}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Вибір тижня (Чисельник/Знаменник) */}
          <div className="week-toggle-box">
            <label className="control-label">Тиждень:</label>
            <div className="segmented-control">
              <button 
                className={`segment-btn ${weekType === 'numerator' ? 'active' : ''}`}
                onClick={() => setWeekType('numerator')}
              >
                Чисельник
              </button>
              <button 
                className={`segment-btn ${weekType === 'denominator' ? 'active' : ''}`}
                onClick={() => setWeekType('denominator')}
              >
                Знаменник
              </button>
            </div>
          </div>
        </div>

        {/* Вкладки днів тижня з швидким переходом на завтра */}
        <div className="day-tabs-wrapper">
          <div className="day-tabs">
            {DAYS.map(day => (
              <button
                key={day.id}
                className={`day-tab ${activeDay === day.id ? 'active' : ''}`}
                onClick={() => setActiveDay(day.id)}
              >
                <span className="day-title">{day.name}</span>
                <span className="day-short">{day.short}</span>
                {day.id === 5 && (
                  <span className="sub-count-badge">2 заміни</span>
                )}
              </button>
            ))}
          </div>

          <button 
            className="btn btn-secondary btn-sm tomorrow-quick-btn"
            onClick={handleSelectTomorrow}
            title="Швидкий перехід на розклад наступного навчального дня"
          >
            <Clock size={14} />
            <span>Пари на завтра</span>
          </button>
        </div>

        {/* Статус-плашка поточної групи */}
        <div className="group-status-bar">
          <div className="status-group-info">
            <span className="current-group-tag">Група {selectedGroup}</span>
            <span className="status-day-text">
              {DAYS.find(d => d.id === activeDay)?.name} • {weekType === 'numerator' ? 'Чисельник' : 'Знаменник'}
            </span>
          </div>

          <div className="status-stats">
            {activeSubCount > 0 ? (
              <span className="badge badge-rose pulse-badge">
                <AlertTriangle size={14} />
                На цей день є {activeSubCount} замін{activeSubCount > 1 ? 'и' : 'а'}!
              </span>
            ) : (
              <span className="badge badge-emerald">
                <CheckCircle size={14} />
                Замін немає (пари за графіком)
              </span>
            )}
          </div>
        </div>

        {/* Список пар розкладу */}
        <div className="pairs-grid">
          {currentSchedule.map(item => {
            const isCurrentPair = currentPair.status === 'in_progress' && currentPair.pair === item.pair && activeDay === 5;

            return (
              <div 
                key={item.pair} 
                className={`pair-card ${item.isSubstituted ? 'is-substituted' : ''} ${isCurrentPair ? 'is-current' : ''}`}
              >
                <div className="pair-time-col">
                  <span className="pair-index">{item.pair} пара</span>
                  <span className="pair-time">{item.time}</span>
                  {isCurrentPair && (
                    <span className="badge badge-blue current-badge">
                      Зараз триває
                    </span>
                  )}
                </div>

                <div className="pair-content-col">
                  {item.isSubstituted && (
                    <div className="substitution-header">
                      <span className="badge badge-rose">⚡ ЗАМІНА ПАРИ</span>
                      {item.reason && <span className="sub-reason">{item.reason}</span>}
                    </div>
                  )}

                  <div className="subject-container">
                    {item.oldSubject && (
                      <span className="old-subject-line">
                        Було: {item.oldSubject}
                      </span>
                    )}
                    <h3 className="pair-subject">
                      {item.subject}
                    </h3>
                  </div>

                  {item.subject !== '—' && (
                    <div className="pair-meta">
                      {item.teacher && (
                        <div className="meta-item">
                          <User size={15} />
                          <span>{item.teacher}</span>
                        </div>
                      )}
                      {item.room && (
                        <div className="meta-item">
                          <MapPin size={15} />
                          <span>{item.room}</span>
                        </div>
                      )}
                      {item.meetUrl && (
                        <a 
                          href={item.meetUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary btn-sm meet-btn"
                        >
                          <Video size={14} />
                          <span>Google Meet (онлайн)</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Додаткова інформація під розкладом */}
        <div className="schedule-footer-notes">
          <div className="note-card">
            <Clock size={18} className="note-icon" />
            <div>
              <strong>Розклад дзвінків</strong>
              <p>1 пара: 08:30–09:50 | 2 пара: 10:05–11:25 | Велика перерва (обід 25 хв) | 3 пара: 11:50–13:10 | 4 пара: 13:25–14:45</p>
            </div>
          </div>
          <div className="note-card">
            <FileText size={18} className="note-icon" />
            <div>
              <strong>Архів офіційних наказів диспетчерської</strong>
              <p>Оригінальні паперові відомості та скани замін доступні в деканаті коледжу або за запитом у навчальну частину.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .schedule-section {
          padding: 4.5rem 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-subtle);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-size: 2.25rem;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
          max-width: 700px;
          line-height: 1.5;
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .schedule-header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .toast-success {
          background: var(--accent-emerald-subtle);
          color: var(--accent-emerald);
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        /* Диспетчерська */
        .dispatcher-panel {
          background: var(--bg-muted);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          margin-bottom: 2rem;
        }

        .dispatcher-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .dispatcher-header h4 {
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .dispatcher-header p {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .dispatcher-textarea {
          width: 100%;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          font-family: monospace;
          font-size: 0.85rem;
          color: var(--text-main);
          resize: vertical;
          margin-bottom: 0.75rem;
        }

        .dispatcher-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .format-hint {
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        /* Панель бота Гоша */
        .gosha-panel {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(99, 102, 241, 0.04));
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2rem;
        }

        .gosha-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .gosha-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .gosha-avatar {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: var(--primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
          flex-shrink: 0;
        }

        .gosha-header h4 {
          font-size: 1.05rem;
          color: var(--text-main);
          font-weight: 700;
        }

        .gosha-header p {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .gosha-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--accent-emerald);
          background: var(--accent-emerald-subtle);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .gosha-actions-grid {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .gosha-share-btn {
          margin-left: auto;
        }

        .spin-icon {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Контроли */
        .schedule-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          background: var(--bg-muted);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .control-label {
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }

        .group-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .group-pill {
          padding: 0.45rem 0.85rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          transition: all 0.15s ease;
        }

        .group-pill:hover {
          border-color: var(--primary);
        }

        .group-pill.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }

        .segmented-control {
          display: inline-flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.25rem;
        }

        .segment-btn {
          padding: 0.35rem 0.85rem;
          font-size: 0.825rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: all 0.15s ease;
        }

        .segment-btn.active {
          background: var(--primary-subtle);
          color: var(--primary);
        }

        /* Дні */
        .day-tabs-wrapper {
          display: flex;
          align-items: stretch;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .day-tabs {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          flex: 1;
        }

        .tomorrow-quick-btn {
          white-space: nowrap;
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .day-tab {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.15s ease;
          position: relative;
        }

        .day-tab:hover {
          border-color: var(--border-subtle);
          background: var(--bg-muted);
        }

        .day-tab.active {
          border-color: var(--primary);
          background: var(--primary-subtle);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12);
        }

        .day-title {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .day-short {
          display: none;
          font-weight: 700;
        }

        .sub-count-badge {
          font-size: 0.675rem;
          font-weight: 800;
          background: var(--accent-rose);
          color: #fff;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          margin-top: 0.25rem;
        }

        /* Статус-бар */
        .group-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: var(--bg-muted);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }

        .current-group-tag {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
          margin-right: 0.75rem;
          color: var(--text-main);
        }

        .status-day-text {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        /* Список пар */
        .pairs-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .pair-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.5rem;
          align-items: center;
          transition: all 0.2s ease;
        }

        .pair-card:hover {
          border-color: var(--border-subtle);
          box-shadow: var(--shadow-md);
        }

        .pair-card.is-substituted {
          border-left: 5px solid var(--accent-rose);
          background: linear-gradient(90deg, var(--accent-rose-subtle) 0%, var(--bg-surface) 35%);
        }

        .pair-card.is-current {
          border: 2px solid var(--primary);
          box-shadow: 0 0 16px rgba(37, 99, 235, 0.2);
        }

        .pair-time-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border-right: 1px solid var(--border-color);
          padding-right: 1.5rem;
        }

        .pair-index {
          font-family: var(--font-heading);
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .pair-time {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .current-badge {
          margin-top: 0.35rem;
          align-self: flex-start;
        }

        .pair-content-col {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .substitution-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sub-reason {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .old-subject-line {
          font-size: 0.825rem;
          color: var(--text-muted);
          text-decoration: line-through;
          display: block;
        }

        .pair-subject {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }

        .pair-meta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .meet-btn {
          background: #107c41;
          border: none;
          padding: 0.35rem 0.8rem;
          font-size: 0.8rem;
        }
        .meet-btn:hover {
          background: #0b5e31;
        }

        /* Примітки під розкладом */
        .schedule-footer-notes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .note-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .note-icon {
          color: var(--primary);
          margin-top: 0.15rem;
          flex-shrink: 0;
        }

        .note-card strong {
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.2rem;
        }

        .note-card p {
          font-size: 0.775rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .day-title {
            display: none;
          }
          .day-short {
            display: inline;
          }
          .pair-card {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .pair-time-col {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            padding-right: 0;
            padding-bottom: 0.5rem;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .schedule-footer-notes {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
