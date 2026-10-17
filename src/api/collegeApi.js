// REST API шлюз для сайту та Android-клієнта БФКПЕП
import { 
  COLLEGE_INFO, 
  BELL_SCHEDULE, 
  SATURDAY_BELL_SCHEDULE, 
  ACADEMIC_GROUPS, 
  INITIAL_SUBSTITUTIONS, 
  COLLEGE_NEWS,
  SPECIALTIES_DATA,
  ADMINISTRATION_MEMBERS
} from '../data/collegeData';

// Розклад за замовчуванням для демонстрації API
const MOCK_TIMETABLES = {
  'P-422': {
    groupName: 'П-422',
    specialty: '121 Інженерія програмного забезпечення',
    course: 4,
    curator: 'Гіневська І.В.',
    academicYear: '2025/2026',
    semester: 2,
    days: [
      {
        day: 'Понеділок',
        lessons: [
          { pair: 1, time: '08:30 - 09:45', subject: 'Конструювання ПЗ', teacher: 'Пелихівський Л.О.', room: 'ауд. 308', type: 'Лекція' },
          { pair: 2, time: '10:00 - 11:15', subject: 'Архітектура та проектування ПЗ', teacher: 'Гіневська І.В.', room: 'ауд. 312', type: 'Лабораторна' },
          { pair: 3, time: '11:40 - 12:55', subject: 'Технології розробки мобільних додатків', teacher: 'Пелихівський Л.О.', room: 'ауд. 308', type: 'Практична' }
        ]
      },
      {
        day: 'Вівторок',
        lessons: [
          { pair: 1, time: '08:30 - 09:45', subject: 'Бази даних та інформаційні системи', teacher: 'Гіневська І.В.', room: 'ауд. 312', type: 'Лекція' },
          { pair: 2, time: '10:00 - 11:15', subject: 'Розробка Web-застосунків', teacher: 'Осадчук В.М.', room: 'ауд. 305', type: 'Лабораторна' },
          { pair: 3, time: '11:40 - 12:55', subject: 'Іноземна мова за проф. спрямуванням', teacher: 'Ковальчук О.П.', room: 'ауд. 210', type: 'Практична' }
        ]
      },
      {
        day: 'Середа',
        lessons: [
          { pair: 1, time: '08:30 - 09:45', subject: 'Безпека програм та даних', teacher: 'Мартинюк С.В.', room: 'ауд. 301', type: 'Лекція' },
          { pair: 2, time: '10:00 - 11:15', subject: 'Конструювання ПЗ', teacher: 'Пелихівський Л.О.', room: 'ауд. 308', type: 'Лабораторна' },
          { pair: 3, time: '11:40 - 12:55', subject: 'Фізичне виховання', teacher: 'Мельничук В.І.', room: 'Спортзал', type: 'Практична' }
        ]
      },
      {
        day: 'Четвер',
        lessons: [
          { pair: 1, time: '08:30 - 09:45', subject: 'Управління ІТ-проєктами', teacher: 'Гіневська І.В.', room: 'ауд. 312', type: 'Лекція' },
          { pair: 2, time: '10:00 - 11:15', subject: 'Технології захисту інформації', teacher: 'Мартинюк С.В.', room: 'ауд. 301', type: 'Лабораторна' },
          { pair: 3, time: '11:40 - 12:55', subject: 'Переддипломна практика / Консультація', teacher: 'Пелихівський Л.О.', room: 'ауд. 308', type: 'Консультація' }
        ]
      },
      {
        day: 'П’ятниця',
        lessons: [
          { pair: 1, time: '08:30 - 09:45', subject: 'Розробка Web-застосунків', teacher: 'Осадчук В.М.', room: 'ауд. 305', type: 'Лабораторна' },
          { pair: 2, time: '10:00 - 11:15', subject: 'Архітектура та проектування ПЗ', teacher: 'Гіневська І.В.', room: 'ауд. 312', type: 'Практична' }
        ]
      }
    ]
  }
};

// Експорт функцій API
export const collegeApi = {
  // GET /api/v1/schedule?group=:group
  getSchedule: (group = 'P-422') => {
    const timetable = MOCK_TIMETABLES[group] || {
      groupName: group,
      specialty: 'Фахова передвища освіта',
      course: 3,
      days: [
        {
          day: 'Понеділок',
          lessons: [
            { pair: 1, time: '08:30 - 09:45', subject: 'Загальноосвітня / Профільна дисципліна', teacher: 'Викладач кафедри', room: 'ауд. 204', type: 'Лекція' },
            { pair: 2, time: '10:00 - 11:15', subject: 'Спеціальний курс за фахом', teacher: 'Викладач спецкурсу', room: 'ауд. 206', type: 'Практична' },
            { pair: 3, time: '11:40 - 12:55', subject: 'Практикум з фахової майстерності', teacher: 'Керівник практики', room: 'ауд. 102', type: 'Лабораторна' }
          ]
        }
      ]
    };

    return {
      status: 200,
      timestamp: new Date().toISOString(),
      bells: {
        weekday: BELL_SCHEDULE,
        saturday: SATURDAY_BELL_SCHEDULE
      },
      data: timetable
    };
  },

  // GET /api/v1/substitutions
  getSubstitutions: (customSubs = null) => {
    const list = customSubs || INITIAL_SUBSTITUTIONS;
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      count: list.length,
      data: list
    };
  },

  // GET /api/v1/news
  getNews: (limit = 10) => {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      count: Math.min(limit, COLLEGE_NEWS.length),
      data: COLLEGE_NEWS.slice(0, limit)
    };
  },

  // GET /api/v1/groups
  getGroups: () => {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      total: ACADEMIC_GROUPS.length,
      data: ACADEMIC_GROUPS
    };
  },

  // GET /api/v1/specialties
  getSpecialties: () => {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      total: SPECIALTIES_DATA.length,
      data: SPECIALTIES_DATA
    };
  },

  // GET /api/v1/info
  getCollegeInfo: () => {
    return {
      status: 200,
      timestamp: new Date().toISOString(),
      data: {
        ...COLLEGE_INFO,
        administration: ADMINISTRATION_MEMBERS
      }
    };
  }
};
