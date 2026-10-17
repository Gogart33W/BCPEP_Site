import React, { useState } from 'react';
import { 
  X, User, Calendar, Check, Copy, 
  ExternalLink, LogOut, Shield, Laptop, BookOpen, AlertCircle,
  Bot, Video
} from 'lucide-react';
import { COLLEGE_INFO, BASE_SCHEDULE, INITIAL_SUBSTITUTIONS } from '../data/collegeData';
import { getMergedSchedule } from '../utils/scheduleParser';

export default function StudentCabinetModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onLogin, 
  onLogout,
  onNavigate 
}) {
  const [copied, setCopied] = useState(false);
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  if (!isOpen) return null;

  const tomorrowDayId = (() => {
    const day = new Date().getDay();
    if (day >= 5 || day === 0) return 1;
    return day + 1;
  })();

  const dayNames = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'];
  const tomorrowDayName = dayNames[tomorrowDayId];

  const tomorrowSchedule = currentUser ? getMergedSchedule(
    BASE_SCHEDULE,
    INITIAL_SUBSTITUTIONS,
    currentUser.group,
    tomorrowDayId
  ).filter(p => p.subject !== '—') : [];

  const handleCopyTomorrowSchedule = () => {
    const lines = [
      `📌 Розклад для ${currentUser.group} на ${tomorrowDayName}:`
    ];
    tomorrowSchedule.forEach(p => {
      if (p.isSubstituted) {
        lines.push(`${p.pair} пара (${p.time}) ⚡ ЗАМІНА: ${p.subject.replace('⚡ ЗАМІНА: ', '')} | ${p.teacher} | ${p.room}`);
      } else {
        lines.push(`${p.pair} пара (${p.time}) • ${p.subject} | ${p.teacher} | ${p.room}`);
      }
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2000);
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText(COLLEGE_INFO.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickLogin = (email, name, group) => {
    onLogin({
      email,
      name,
      group,
      curator: 'Гіневська І.В.',
      supervisor: 'Пелихівський Л.О.',
      rating: 94.8
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <User size={20} className="modal-icon" />
            <div>
              <h3>Кабінет студента БФКПЕП</h3>
              <p>Корпоративний доступ до навчальних матеріалів</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          {currentUser ? (
            /* Якщо студент авторизований */
            <div className="cabinet-content">
              {/* Профіль студента */}
              <div className="profile-banner">
                <div className="profile-avatar">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="profile-details">
                  <h4>{currentUser.name}</h4>
                  <span className="profile-email">{currentUser.email}</span>
                  <div className="profile-tags">
                    <span className="badge badge-blue">Група {currentUser.group}</span>
                    <span className="badge badge-emerald">Рейтинг: {currentUser.rating} балів</span>
                  </div>
                </div>
              </div>

              {/* Академічні куратори */}
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-label">Керівник циклової комісії / дипломного:</span>
                  <strong className="info-val">{currentUser.supervisor}</strong>
                </div>
                <div className="info-card">
                  <span className="info-label">Куратор академічної групи:</span>
                  <strong className="info-val">{currentUser.curator}</strong>
                </div>
              </div>

              {/* Швидкі сервіси */}
              <h5 className="sub-heading">Корпоративні інструменти Google Workspace</h5>
              <div className="services-grid">
                <a 
                  href="https://classroom.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="service-btn"
                >
                  <BookOpen size={18} />
                  <div>
                    <strong>Google Classroom</strong>
                    <span>Завдання та оцінки</span>
                  </div>
                  <ExternalLink size={14} className="ext-icon" />
                </a>

                <button 
                  className="service-btn"
                  onClick={() => { onClose(); onNavigate('schedule'); }}
                >
                  <Calendar size={18} />
                  <div>
                    <strong>Мій розклад із замінами</strong>
                    <span>Пари на сьогодні/завтра</span>
                  </div>
                </button>
              </div>

              {/* Розклад на завтра від Гоші */}
              <div className="cabinet-tomorrow-box">
                <div className="cabinet-tomorrow-header">
                  <div className="title-with-bot">
                    <Bot size={18} className="bot-inline-icon" />
                    <strong>Пари на {tomorrowDayName} ({currentUser.group})</strong>
                  </div>
                  <button 
                    className="btn btn-ghost btn-xs copy-schedule-btn"
                    onClick={handleCopyTomorrowSchedule}
                    title="Скопіювати розклад на завтра для бесіди"
                  >
                    {copiedSchedule ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copiedSchedule ? 'Скопійовано' : 'В чат'}</span>
                  </button>
                </div>

                <div className="cabinet-pairs-list">
                  {tomorrowSchedule.length > 0 ? (
                    tomorrowSchedule.map(p => (
                      <div key={p.pair} className={`cabinet-pair-item ${p.isSubstituted ? 'is-substituted' : ''}`}>
                        <span className="cabinet-pair-num">{p.pair} пара ({p.time.split('–')[0].trim()})</span>
                        <div className="cabinet-pair-details">
                          <strong className="cabinet-pair-title">{p.subject}</strong>
                          <div className="cabinet-pair-meta">
                            <span>{p.teacher}</span>
                            {p.room && <span>• {p.room}</span>}
                          </div>
                        </div>
                        {p.meetUrl && (
                          <a href={p.meetUrl} target="_blank" rel="noreferrer" className="meet-mini-btn" title="Приєднатися до Google Meet">
                            <Video size={13} />
                          </a>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="no-pairs-text">На цей день пар немає або вихідний</p>
                  )}
                </div>
              </div>

              {/* Оплата навчання / гуртожитку */}
              <div className="payment-box">
                <div className="payment-header">
                  <div>
                    <strong>Оплата за навчання та послуги</strong>
                    <p>Офіційний розрахунковий рахунок коледжу (IBAN)</p>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={handleCopyIban}>
                    {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    <span>{copied ? 'Скопійовано' : 'Копіювати IBAN'}</span>
                  </button>
                </div>
                <code className="iban-display">{COLLEGE_INFO.iban}</code>
                <span className="iban-meta">Отримувач: {COLLEGE_INFO.recipient} • Код ЄДРПОУ: {COLLEGE_INFO.codeEDRPOU}</span>
              </div>

              {/* Кнопка виходу */}
              <button className="btn btn-ghost btn-sm logout-btn" onClick={onLogout}>
                <LogOut size={16} />
                <span>Вийти з кабінету</span>
              </button>
            </div>
          ) : (
            /* Якщо ще не увійшов */
            <div className="login-prompt">
              <div className="login-hero-icon">
                <Shield size={36} />
              </div>
              <h4>Авторизація через корпоративний акаунт</h4>
              <p>Вхід для студентів коледжу з доменом <code>@bfcpep.org.ua</code></p>

              {/* Кнопка 1-клік входу */}
              <button 
                className="btn btn-primary btn-block quick-auth-btn"
                onClick={() => handleQuickLogin('gogart@bfcpep.org.ua', 'Микола (ПЗ-41)', 'PZ-41')}
              >
                <Laptop size={18} />
                <span>Швидкий вхід: Микола (ПЗ-41)</span>
              </button>

              <div className="divider-line">
                <span>або тестовий вхід для молодших курсів</span>
              </div>

              <div className="quick-test-buttons">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleQuickLogin('student.pz31@bfcpep.org.ua', 'Студент ІПЗ (ПЗ-31)', 'PZ-31')}
                >
                  Увійти як ПЗ-31
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleQuickLogin('student.m31@bfcpep.org.ua', 'Студент Економіст (М-31)', 'M-31')}
                >
                  Увійти як М-31
                </button>
              </div>

              <div className="auth-note">
                <AlertCircle size={15} />
                <span>Якщо у вас виникли труднощі з корпоративною поштою, зверніться до системного адміністратора у лаб. 34.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: fadeIn 0.15s ease-out;
        }

        .modal-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          max-width: 560px;
          width: 100%;
          box-shadow: var(--shadow-xl);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-title-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-icon {
          color: var(--primary);
        }

        .modal-header h3 {
          font-size: 1.15rem;
          line-height: 1.2;
        }

        .modal-header p {
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 0.25rem;
          border-radius: var(--radius-sm);
        }
        .close-btn:hover {
          color: var(--text-main);
          background: var(--bg-hover);
        }

        .modal-body {
          padding: 1.5rem;
        }

        /* Авторизований профіль */
        .profile-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }

        .profile-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-details h4 {
          font-size: 1.125rem;
          margin-bottom: 0.15rem;
        }

        .profile-email {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.4rem;
        }

        .profile-tags {
          display: flex;
          gap: 0.5rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .info-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: var(--radius-md);
        }

        .info-label {
          font-size: 0.725rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.2rem;
        }

        .info-val {
          font-size: 0.875rem;
          color: var(--text-main);
        }

        .sub-heading {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .service-btn {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-align: left;
          transition: all 0.15s ease;
          position: relative;
        }

        .service-btn:hover {
          border-color: var(--primary);
          background: var(--primary-subtle);
        }

        .service-btn strong {
          font-size: 0.85rem;
          display: block;
        }

        .service-btn span {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .ext-icon {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          color: var(--text-muted);
        }

        /* Віджет розкладу на завтра */
        .cabinet-tomorrow-box {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1.25rem;
        }

        .cabinet-tomorrow-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .title-with-bot {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .bot-inline-icon {
          color: var(--primary);
        }

        .copy-schedule-btn {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }

        .cabinet-pairs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cabinet-pair-item {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.825rem;
        }

        .cabinet-pair-item.is-substituted {
          border-left: 3px solid var(--accent-rose);
          background: rgba(244, 63, 94, 0.04);
        }

        .cabinet-pair-num {
          font-weight: 700;
          color: var(--primary);
          white-space: nowrap;
          font-size: 0.775rem;
        }

        .cabinet-pair-details {
          flex: 1;
          min-width: 0;
        }

        .cabinet-pair-title {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.85rem;
        }

        .cabinet-pair-meta {
          font-size: 0.725rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .meet-mini-btn {
          color: #107c41;
          padding: 0.35rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
        }
        .meet-mini-btn:hover {
          background: rgba(16, 124, 65, 0.1);
        }

        .no-pairs-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          padding: 0.5rem 0;
        }

        .payment-box {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1.25rem;
        }

        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .payment-header strong {
          font-size: 0.875rem;
        }

        .payment-header p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .iban-display {
          display: block;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.03em;
          margin-bottom: 0.35rem;
        }

        .iban-meta {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .logout-btn {
          width: 100%;
          justify-content: center;
          color: var(--accent-rose);
        }

        /* Не авторизований */
        .login-prompt {
          text-align: center;
          padding: 1rem 0;
        }

        .login-hero-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--primary-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }

        .login-prompt h4 {
          font-size: 1.2rem;
          margin-bottom: 0.35rem;
        }

        .login-prompt p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .quick-auth-btn {
          padding: 0.85rem;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
        }

        .divider-line {
          position: relative;
          text-align: center;
          margin: 1.25rem 0;
        }

        .divider-line::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border-color);
        }

        .divider-line span {
          position: relative;
          background: var(--bg-surface-elevated);
          padding: 0 0.75rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .quick-test-buttons {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .auth-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-muted);
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: left;
        }
      `}</style>
    </div>
  );
}
