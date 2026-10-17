export const COLLEGE_INFO = {
  fullName: 'Відокремлений структурний підрозділ «Бердичівський фаховий коледж промисловості, економіки та права»',
  shortName: 'ВСП БФКПЕП',
  codeEDRPOU: '01566088',
  address: 'Україна, 13300, Житомирська обл., м. Бердичів, вул. Замкова, 2а',
  phoneReception: '+380 (4143) 4-07-34',
  phoneAdmissions: '+380 (96) 666-86-45',
  phoneCourses: '+380 (97) 554-54-20',
  email: 'bcpep@ukr.net',
  emailAdmissions: 'vstup@bcpep.org.ua',
  telegram: 'https://t.me/bcpep',
  social: {
    facebook: 'https://www.facebook.com/%D0%91%D0%B5%D1%80%D0%B4%D0%B8%D1%87%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B8%D0%B9-%D1%84%D0%B0%D1%85%D0%BE%D0%B2%D0%B8%D0%B9-%D0%BA%D0%BE%D0%BB%D0%B5%D0%B4%D0%B6-%D0%BF%D1%80%D0%BE%D0%BC%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%D1%81%D1%82%D1%96-%D0%B5%D0%BA%D0%BE%D0%BD%D0%BE%D0%BC%D1%96%D0%BA%D0%B8-%D1%82%D0%B0-%D0%BF%D1%80%D0%B0%D0%B2%D0%B0-107888211930267/',
    instagram: 'https://instagram.com/bcpep_official?igshid=NmNmNjAwNzg=',
    youtube: 'https://www.youtube.com/channel/UCku8dpAWRGjQ6QgBSHN5CWw'
  },
  iban: 'UA128201720343160001000034567',
  recipient: 'ВСП БФКПЕП, Держказначейська служба України',
  schedulePdfUrl: 'https://drive.google.com/file/d/1TVcTiQTXSIRDZXGKvASHMQmrva7liXOf/view',
  substitutionsChatUrl: 'https://chat.whatsapp.com/FI1XamYDoGoJPk54nahKFx'
};

export const CURRENT_NOTICE = {
  title: 'Увага! Формат навчального процесу',
  dates: 'З 19 по 23 жовтня',
  offlineText: 'Студенти 1–2 курсів, а також групи А-330, Е-328, Ф-325, Ю-352, Ю-353, Ю-450, Ю-451.',
  onlineText: 'Студенти 3–4 курсів (крім груп, зазначених вище).',
  bellSummary: '1 пара: 08:30–09:45 | 2 пара: 10:00–11:15 | 3 пара: 11:40–12:55 | 4 пара: 13:10–14:25'
};

export const BELL_SCHEDULE_WEEKDAY = [
  { pair: 1, name: 'Перша пара', start: '08:30', end: '09:45', breakAfter: '15 хв' },
  { pair: 2, name: 'Друга пара', start: '10:00', end: '11:15', breakAfter: '25 хв (велика перерва)' },
  { pair: 3, name: 'Третя пара', start: '11:40', end: '12:55', breakAfter: '15 хв' },
  { pair: 4, name: 'Четверта пара', start: '13:10', end: '14:25', breakAfter: 'кінець' }
];

export const BELL_SCHEDULE_SATURDAY = [
  { pair: 1, name: 'Перша пара', start: '08:30', end: '09:30', breakAfter: '10 хв' },
  { pair: 2, name: 'Друга пара', start: '09:40', end: '10:40', breakAfter: '20 хв' },
  { pair: 3, name: 'Третя пара', start: '11:00', end: '12:00', breakAfter: '10 хв' },
  { pair: 4, name: 'Четверта пара', start: '12:10', end: '13:10', breakAfter: 'кінець' }
];

export const BELL_SCHEDULE = BELL_SCHEDULE_WEEKDAY;

export const ADMINISTRATION = [
  {
    name: 'Демусь Іван Омелянович',
    role: 'В.о. директора коледжу',
    qualification: 'Спеціаліст вищої категорії, викладач-методист',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/photo_2022-10-17_11-47-27.jpg'
  },
  {
    name: 'Левченко Людмила Василівна',
    role: 'Заступник директора з навчальної роботи',
    qualification: 'Спеціаліст вищої категорії, старший викладач',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2025/09/levchenko.jpg'
  },
  {
    name: 'Богун Світлана Анатоліївна',
    role: 'Заступник директора з виховної роботи',
    qualification: 'Спеціаліст вищої категорії',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2025/09/bogun.jpg'
  },
  {
    name: 'Кухарук Олена Миколаївна',
    role: 'Заступник директора з виробничого навчання',
    qualification: 'Спеціаліст вищої категорії',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2025/09/kuharuk.jpg'
  }
];

export const SPECIALTIES = [
  {
    id: '121',
    code: '121',
    name: 'Інженерія програмного забезпечення',
    shortDesc: 'Розробка програмних систем, веб-додатків, мобільних застосунків, баз даних та системного ПЗ.',
    term: '3 роки 10 місяців (на базі 9 кл.) / 2 роки 10 місяців (на базі 11 кл.)',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Програмування C++, C#, JavaScript, Python', 'Реляційні бази даних та SQL', 'Web-технології та розробка додатків', 'Тестування та супровід ПЗ'],
    career: ['Розробник програмного забезпечення', 'Web-розробник', 'Фахівець з тестування ПЗ (QA)', 'Адміністратор баз даних']
  },
  {
    id: '133',
    code: '133',
    name: 'Галузеве машинобудування',
    shortDesc: 'Комп’ютерне 3D-моделювання, технологія машинобудування, експлуатація сучасних верстатів з ЧПК.',
    term: '3 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['CAD/CAM проєктування (AutoCAD, SolidWorks)', 'Налагодження верстатів з ЧПК', 'Технологічні процеси обробки деталей'],
    career: ['Технік-технолог з машинобудування', 'Оператор та програміст верстатів з ЧПК', 'Технік-конструктор']
  },
  {
    id: '073',
    code: '073',
    name: 'Менеджмент',
    shortDesc: 'Управління виробничими процесами, операційний менеджмент, маркетинг, логістика та бізнес-адміністрування.',
    term: '2 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Організація діяльності підрозділів', 'Управління проєктами', 'Маркетинговий аналіз ринку', 'Бізнес-планування'],
    career: ['Менеджер підрозділу', 'Помічник керівника підприємства', 'Диспетчер виробництва', 'Фахівець з матеріально-технічного постачання']
  },
  {
    id: '136',
    code: '136',
    name: 'Металургія',
    shortDesc: 'Виробництво чавунного, сталевого та кольорового литва, ливарне устаткування, матеріалознавство.',
    term: '3 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Технології ливарного виробництва', 'Контроль хімічного складу і властивостей сплавів', 'Проєктування оснастки'],
    career: ['Технік-металург', 'Майстер ливарної дільниці', 'Контролер якості металургійної продукції']
  },
  {
    id: '071',
    code: '071',
    name: 'Облік і оподаткування',
    shortDesc: 'Ведення первинного обліку, фінансова та податкова звітність, автоматизація бухгалтерських процесів.',
    term: '2 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Бухгалтерський та податковий облік', 'Автоматизовані системи обліку', 'Аналіз фінансово-господарської діяльності'],
    career: ['Бухгалтер підприємства', 'Помічник аудитора', 'Ревізор', 'Касир-експерт']
  },
  {
    id: '072',
    code: '072',
    name: 'Фінанси, банківська справа, страхування та фондовий ринок',
    shortDesc: 'Організація грошово-кредитних відносин, операції комерційних банків, страхування та фінансовий контроль.',
    term: '2 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Банківські операції та кредитний аналіз', 'Страхові послуги', 'Бюджетний процес і податки'],
    career: ['Економіст з фінансової роботи', 'Кредитний інспектор банку', 'Страховий агент', 'Брокер']
  },
  {
    id: '017',
    code: '017',
    name: 'Фізична культура і спорт',
    shortDesc: 'Методика тренувального процесу, суддівство спортивних змагань, оздоровча та адаптивна фізична культура.',
    term: '3 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Методика викладання фізичної культури', 'Організація спортивно-масових заходів', 'Оздоровчий фітнес'],
    career: ['Вчитель фізичної культури базової школи', 'Інструктор тренажерного залу', 'Тренер з видів спорту']
  },
  {
    id: '029',
    code: '029',
    name: 'Секретарська та офісна справа',
    shortDesc: 'Організація діловодства, документообіг, кадрова документація, референтська діяльність та діловий етикет.',
    term: '2 роки 10 місяців',
    degree: 'Фаховий молодший бакалавр',
    skills: ['Електронний документообіг', 'Кадрове діловодство', 'Ділове листування та переговори', 'Комп’ютерні офісні пакети'],
    career: ['Офіс-менеджер', 'Секретар-референт керівника', 'Інспектор відділу кадрів', 'Завідувач архіву']
  }
];

export const GROUPS = [
  { id: 'P-422', name: 'П-422', course: 4, department: 'Інженерія програмного забезпечення' },
  { id: 'P-323', name: 'П-323', course: 3, department: 'Інженерія програмного забезпечення' },
  { id: 'P-224', name: 'П-224', course: 2, department: 'Інженерія програмного забезпечення' },
  { id: 'P-125', name: 'П-125', course: 1, department: 'Інженерія програмного забезпечення' },
  { id: 'A-330', name: 'А-330', course: 3, department: 'Галузеве машинобудування' },
  { id: 'E-328', name: 'Е-328', course: 3, department: 'Менеджмент' },
  { id: 'F-325', name: 'Ф-325', course: 3, department: 'Фінанси і кредит' },
  { id: 'U-450', name: 'Ю-450', course: 4, department: 'Право та офісна справа' },
  { id: 'U-352', name: 'Ю-352', course: 3, department: 'Право та офісна справа' },
  { id: 'FV-217', name: 'ФВ-217', course: 2, department: 'Фізичне виховання і спорт' },
  { id: 'L-346', name: 'Лхл-346', course: 3, department: 'Металургія' },
  { id: 'M-305', name: 'М-305', course: 3, department: 'Машинобудування та технології' }
];

export const BASE_SCHEDULE = {
  'P-422': {
    '1': [
      { pair: 1, subject: 'Архітектура комп’ютерів', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лекція', meetUrl: '' },
      { pair: 2, subject: 'Бази даних та інформаційні системи', teacher: 'Гіневська І.В.', room: 'ауд. 31', type: 'Лабораторна', meetUrl: '' },
      { pair: 3, subject: 'Розробка Web-додатків', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Практична', meetUrl: '' },
      { pair: 4, subject: 'Фізичне виховання', teacher: 'Сидорко В.П.', room: 'Спортзал', type: 'Практика', meetUrl: '' }
    ],
    '2': [
      { pair: 1, subject: 'Об’єктно-орієнтоване програмування', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лекція', meetUrl: '' },
      { pair: 2, subject: 'Комп’ютерні мережі', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лекція', meetUrl: '' },
      { pair: 3, subject: 'Іноземна мова за проф. спрямуванням', teacher: 'Іванченко О.М.', room: 'ауд. 14', type: 'Практична', meetUrl: '' }
    ],
    '3': [
      { pair: 1, subject: 'Технології захисту інформації', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Лекція', meetUrl: '' },
      { pair: 2, subject: 'Розробка Web-додатків', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Лабораторна', meetUrl: '' },
      { pair: 3, subject: 'Бази даних та інформаційні системи', teacher: 'Гіневська І.В.', room: 'ауд. 31', type: 'Лабораторна', meetUrl: '' }
    ],
    '4': [
      { pair: 1, subject: 'Проєктний менеджмент в ІТ', teacher: 'Гіневська І.В.', room: 'ауд. 31', type: 'Лекція', meetUrl: '' },
      { pair: 2, subject: 'Архітектура комп’ютерів', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лабораторна', meetUrl: '' },
      { pair: 3, subject: 'Хмарні технології та сервіси', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лабораторна', meetUrl: '' }
    ],
    '5': [
      { pair: 1, subject: 'Дипломне проєктування', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Консультація', meetUrl: '' },
      { pair: 2, subject: 'Тестування програмних систем (QA)', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Практична', meetUrl: '' },
      { pair: 3, subject: 'Виховна година', teacher: 'Гіневська І.В.', room: 'ауд. 31', type: 'Виховна', meetUrl: '' }
    ]
  },
  'P-323': {
    '1': [
      { pair: 1, subject: 'Алгоритми та структури даних', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Лекція' },
      { pair: 2, subject: 'Операційні системи (Linux)', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лабораторна' },
      { pair: 3, subject: 'Вища математика', teacher: 'Ковальчук Н.І.', room: 'ауд. 12', type: 'Практична' }
    ],
    '5': [
      { pair: 1, subject: 'Web-дизайн та верстка', teacher: 'Куроп С.І.', room: 'ауд. 28', type: 'Лабораторна' },
      { pair: 2, subject: 'Операційні системи (Linux)', teacher: 'Пелихівський Л.О.', room: 'ауд. 34', type: 'Лекція' },
      { pair: 3, subject: 'Фізичне виховання', teacher: 'Сидорко В.П.', room: 'Спортзал', type: 'Практика' }
    ]
  },
  'A-330': {
    '1': [
      { pair: 1, subject: 'Технологія машинобудування', teacher: 'Кухарук О.М.', room: 'ауд. 18', type: 'Лекція' },
      { pair: 2, subject: 'Програмування верстатів з ЧПК', teacher: 'Васильчук І.П.', room: 'Майстерні', type: 'Практична' },
      { pair: 3, subject: 'Технічна механіка', teacher: 'Поліщук С.В.', room: 'ауд. 22', type: 'Лекція' }
    ]
  },
  'E-328': {
    '1': [
      { pair: 1, subject: 'Економіка підприємства', teacher: 'Левченко Л.В.', room: 'ауд. 15', type: 'Лекція' },
      { pair: 2, subject: 'Фінансовий менеджмент', teacher: 'Мельник О.С.', room: 'ауд. 16', type: 'Практична' },
      { pair: 3, subject: 'Маркетинг', teacher: 'Дмитрук Н.А.', room: 'ауд. 19', type: 'Лекція' }
    ]
  }
};

export const INITIAL_SUBSTITUTIONS = [
  {
    id: 'sub-1',
    group: 'P-422',
    day: 5,
    pair: 1,
    oldSubject: 'Дипломне проєктування (ауд. 34)',
    newSubject: '⚡ ЗАМІНА: Хмарні технології та сервіси',
    teacher: 'Пелихівський Л.О.',
    room: 'ауд. 34 (комп. клас)',
    reason: 'Виробнича необхідність',
    meetUrl: ''
  },
  {
    id: 'sub-2',
    group: 'P-422',
    day: 5,
    pair: 4,
    oldSubject: '— (вікно)',
    newSubject: '⚡ ДОДАТКОВА ПАРА: Консультація до дипломного проєкту',
    teacher: 'Пелихівський Л.О.',
    room: 'ауд. 34',
    reason: 'Заміна за вівторок',
    meetUrl: ''
  },
  {
    id: 'sub-3',
    group: 'P-323',
    day: 5,
    pair: 2,
    oldSubject: 'Операційні системи (Пелихівський Л.О.)',
    newSubject: '⚡ ЗАМІНА: Практикум з системного адміністрування Linux',
    teacher: 'Пелихівський Л.О.',
    room: 'ауд. 34',
    reason: 'Розпорядження навчальної частини',
    meetUrl: ''
  }
];

export const REAL_NEWS = [
  {
    id: 'news-1',
    title: 'З Днем ЮРИСТА!',
    date: 'Жов 8, 2026',
    category: 'Вітання',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/z-dnem-yurysta_-berdychivskyj-koledzh.png',
    link: 'https://www.bfcpep.org.ua/z-dnem-yurysta/'
  },
  {
    id: 'news-2',
    title: 'Спортивний флешмоб «Рух — наше здоров’я»: енергія, активність та командний дух.',
    date: 'Жов 7, 2026',
    category: 'Спорт та виховання',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/sertyfikat_page-0001-724x1024.jpg',
    link: 'https://www.bfcpep.org.ua/sportyvnyj-fleshmob-ruh-nashe-zdorovya/'
  },
  {
    id: 'news-3',
    title: 'Першокурсники вчаться долати стрес: психологічне заняття у гуртожитку',
    date: 'Жов 7, 2026',
    category: 'Психологічна служба',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/photo_4_2026-10-06_16-53-34.jpg',
    link: 'https://www.bfcpep.org.ua/pershokursnyky-vchatsya-dolaty-stres/'
  },
  {
    id: 'news-4',
    title: 'Вітаємо викладачів коледжу з високою урядовою нагородою!',
    date: 'Жов 6, 2026',
    category: 'Нагороди',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/kolazh_2_foto_poruch.jpg',
    link: 'https://www.bfcpep.org.ua/vitayemo-vykladachiv-koledzhu-z-vysokoyu-uryadovoyu-nagorodoyu/'
  },
  {
    id: 'news-5',
    title: 'День працівників освіти та День коледжу: свято вдячності, тепла та єдності',
    date: 'Жов 5, 2026',
    category: 'Події коледжу',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/zobrazhennya_viber_2026-10-05_11-58-30-517.jpg',
    link: 'https://www.bfcpep.org.ua/den-praczivnykiv-osvity-ta-den-koledzhu/'
  },
  {
    id: 'news-6',
    title: 'Загинув наш випускник Володимир Іванович Сич',
    date: 'Жов 3, 2026',
    category: 'Вічна пам’ять',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/sych.jpg',
    link: 'https://www.bfcpep.org.ua/zagynuv-nash-vypusknyk-volodymyr-ivanovych-sych/'
  },
  {
    id: 'news-7',
    title: 'Патріотичний виховний захід «Все буде Україна» у стінах коледжу',
    date: 'Жов 3, 2026',
    category: 'Виховна робота',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/zobrazhennya_viber_2026-10-03_07-57-06-430.jpg',
    link: 'https://www.bfcpep.org.ua/patriotychnyj-vyhovnyj-zahid-vse-bude-ukrayina/'
  },
  {
    id: 'news-8',
    title: '🎓 День працівників освіти та День рідного коледжу: щирі вітання зі святом!',
    date: 'Жов 2, 2026',
    category: 'Вітання',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/09/den-praczivnykiv-osvity.png',
    link: 'https://www.bfcpep.org.ua/den-praczivnykiv-osvity-ta-den-ridnogo-koledzhu/'
  },
  {
    id: 'news-9',
    title: 'Від традиційної майстерності до високих технологій: дев’ятикласники Красівського ліцею відвідали наш коледж',
    date: 'Жов 1, 2026',
    category: 'Профорієнтація',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/zobrazhennya_viber_2026-10-01_16-34-11-307.jpg',
    link: 'https://www.bfcpep.org.ua/vid-tradyczijnoyi-majsternosti-do-vysokyх-tehnologij/'
  },
  {
    id: 'news-10',
    title: 'Посвята першокурсників у мешканці гуртожитку',
    date: 'Жов 1, 2026',
    category: 'Студентське життя',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/10/photo_9_2026-10-01_09-51-46.jpg',
    link: 'https://www.bfcpep.org.ua/posvyata-pershokursnykiv-u-meshkanczi-gurtozhytku/'
  },
  {
    id: 'news-11',
    title: 'День захисників і захисниць України — свято відваги та незламності',
    date: 'Жов 1, 2026',
    category: 'Патріотичне виховання',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/09/den-zahysnykiv.png',
    link: 'https://www.bfcpep.org.ua/den-zahysnykiv-i-zahysnycz-ukrayiny/'
  },
  {
    id: 'news-12',
    title: 'Студентська спільнота коледжу передала смаколики захисникам і захисницям України',
    date: 'Вер 30, 2026',
    category: 'Волонтерство',
    image: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/09/zobrazhennya_viber_2026-09-30_11-25-42-902.jpg',
    link: 'https://www.bfcpep.org.ua/studentska-spilnota-peredala-smakolyky/'
  }
];

export const PARTNERS = [
  { name: 'КНУБА', url: 'https://www.knuba.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/knuba.png' },
  { name: 'КиМУ', url: 'https://kymu.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/kymu.png' },
  { name: 'Одеська політехніка', url: 'https://op.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/op.png' },
  { name: 'НУХТ', url: 'https://nuft.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/nuft.png' },
  { name: 'Житомирська політехніка', url: 'https://ztu.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/ztu.png' },
  { name: 'ЖДУ ім. Івана Франка', url: 'https://zu.edu.ua/', logo: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/zu.png' }
];

export const USEFUL_LINKS = [
  { name: 'Міністерство освіти і науки України', url: 'https://mon.gov.ua/ua' },
  { name: 'Єдина державна електронна база з питань освіти (ЄДЕБО)', url: 'https://vstup.edbo.gov.ua/' },
  { name: 'Український центр оцінювання якості освіти (УЦОЯО)', url: 'https://testportal.gov.ua/' },
  { name: 'Вінницький регіональний центр оцінювання якості освіти', url: 'https://vintest.org.ua/' },
  { name: 'Освіта UA', url: 'http://osvita.ua/' }
];

export const OFFICIAL_DOCUMENTS = [
  {
    id: 'doc-1',
    title: 'Статут ВСП «Бердичівський фаховий коледж промисловості, економіки та права»',
    category: 'Установчі документи',
    date: '2024-05-12',
    size: '2.4 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/statut.pdf'
  },
  {
    id: 'doc-2',
    title: 'Ліцензія на провадження освітньої діяльності у сфері фахової передвищої освіти',
    category: 'Ліцензії та акредитація',
    date: '2023-11-20',
    size: '1.8 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/licenziya.pdf'
  },
  {
    id: 'doc-3',
    title: 'Сертифікати про акредитацію освітньо-професійних програм (ІПЗ, Машинобудування, Економіка)',
    category: 'Ліцензії та акредитація',
    date: '2024-02-15',
    size: '5.1 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/sertyfikaty.pdf'
  },
  {
    id: 'doc-4',
    title: 'Положення про організацію освітнього процесу у ВСП БФКПЕП',
    category: 'Нормативні документи',
    date: '2024-08-30',
    size: '1.2 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/polozhennya-osvita.pdf'
  },
  {
    id: 'doc-5',
    title: 'Кошторис коледжу та план використання бюджетних коштів на 2026 рік',
    category: 'Фінансова звітність',
    date: '2026-01-10',
    size: '980 КБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/01/koshtorys.pdf'
  },
  {
    id: 'doc-6',
    title: 'Звіт про фінансові результати та баланс коледжу',
    category: 'Фінансова звітність',
    date: '2026-02-01',
    size: '1.4 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2026/02/balans.pdf'
  },
  {
    id: 'doc-7',
    title: 'Положення про академічну доброчесність та етику в коледжі',
    category: 'Нормативні документи',
    date: '2023-09-01',
    size: '850 КБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/dobrochesnist.pdf'
  },
  {
    id: 'doc-8',
    title: 'План заходів з цивільного захисту, безпеки життєдіяльності та дій у надзвичайних ситуаціях',
    category: 'Безпека та правопорядок',
    date: '2024-09-01',
    size: '1.1 МБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/cyvilna-bezpeka.pdf'
  },
  {
    id: 'doc-9',
    title: 'Порядок реагування на доведені випадки булінгу (цькування) та правила поведінки здобувачів освіти',
    category: 'Безпека та правопорядок',
    date: '2023-10-15',
    size: '720 КБ',
    pdfUrl: 'https://www.bfcpep.org.ua/wp-content/uploads/2022/10/buling.pdf'
  }
];
