import React, { useState, useEffect } from 'react';
import { 
  Clock, Video, AlertTriangle, Upload, 
  CheckCircle, Download, ExternalLink, MessageCircle
} from 'lucide-react';
import { 
  GROUPS, 
  BASE_SCHEDULE, 
  BELL_SCHEDULE_WEEKDAY, 
  BELL_SCHEDULE_SATURDAY,
  COLLEGE_INFO,
  CURRENT_NOTICE 
} from '../data/collegeData';
import { getMergedSchedule, getCurrentPairInfo, parseRawSubstitutions } from '../utils/scheduleParser';

const DAYS = [
  { id: 1, name: 'Понеділок', short: 'Пн' },
  { id: 2, name: 'Вівторок', short: 'Вт' },
  { id: 3, name: 'Середа', short: 'Ср' },
  { id: 4, name: 'Четвер', short: 'Чт' },
  { id: 5, name: 'П’ятниця', short: 'Пт' },
  { id: 6, name: 'Субота', short: 'Сб' }
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
  const [rawText, setRawText] = useState(
`П-422 | 1 пара | Дипломне проєктування -> Хмарні технології та сервіси | Пелихівський Л.О. | ауд. 34
П-422 | 4 пара | вікно -> Консультація до дипломного проєкту | Пелихівський Л.О. | ауд. 34
П-323 | 2 пара | Операційні системи -> Практикум з Linux | Пелихівський Л.О. | ауд. 34`
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

  const handleResetSubstitutions = () => {
    localStorage.removeItem('bcpep_custom_subs');
    window.location.reload();
  };

  return (
    <section className="schedule-section" id="schedule-block">
      <div className="container">
        {/* Офіційне оголошення про формат навчання з bfcpep.org.ua */}
        <div className="format-notice-card">
          <div className="notice-badge">
            <AlertTriangle size={16} />
            <span>{CURRENT_NOTICE.title} ({CURRENT_NOTICE.dates})</span>
          </div>
          <div className="notice-grid">
            <div className="notice-col">
              <strong>🏫 Очне навчання:</strong>
              <p>{CURRENT_NOTICE.offlineText}</p>
            </div>
            <div className="notice-col">
              <strong>💻 Дистанційне навчання:</strong>
              <p>{CURRENT_NOTICE.onlineText}</p>
            </div>
          </div>
        </div>

        {/* Заголовок блоку розкладу */}
        <div className="schedule-header">
          <div>
            <span className="section-badge">Навчальний процес</span>
            <h2 className="section-title">Розклад занять та заміни</h2>
            <p className="section-subtitle">
              Оперативний розклад занять для академічних груп коледжу з урахуванням офіційних замін навчальної частини.
            </p>
          </div>

          <div className="schedule-header-actions">
            <a 
              href={COLLEGE_INFO.schedulePdfUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary btn-sm"
              title="Відкрити офіційний розклад Google Drive"
            >
              <ExternalLink size={16} />
              <span>Офіційний розклад (PDF)</span>
            </a>

            <a 
              href={COLLEGE_INFO.substitutionsChatUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary btn-sm"
              title="Приєднатися до групи замін WhatsApp"
            >
              <MessageCircle size={16} />
              <span>Група замін (WhatsApp)</span>
            </a>

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
              <span>Друк</span>
            </button>
          </div>
        </div>

        {successToast && (
          <div className="toast-success">
            <CheckCircle size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* Панель імпорту замін диспетчера */}
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
              placeholder="П-422 | 1 пара | Математика -> Веб-розробка | Пелихівський Л.О. | ауд. 34"
            />
            <div className="dispatcher-footer">
              <span className="format-hint">Підтримує копіювання з Viber/Word або Google Таблиць</span>
              <button className="btn btn-primary btn-sm" onClick={handleApplySubstitutions}>
                Застосувати заміни
              </button>
            </div>
          </div>
        )}

        {/* Контроли вибору групи та тижня */}
        <div className="schedule-controls">
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

        {/* Вкладки днів тижня */}
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

        {/* Статус поточної групи */}
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

        {/* Розклад пар */}
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
                        <span className="meta-text">{item.teacher}</span>
                      )}
                      {item.room && (
                        <span className="meta-room">• {item.room}</span>
                      )}
                      {item.meetUrl && (
                        <a 
                          href={item.meetUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary btn-sm meet-btn"
                        >
                          <Video size={14} />
                          <span>Google Meet</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Реальний розклад дзвінків (Пн–Пт та Субота) з bfcpep.org.ua */}
        <div className="bell-schedules-grid">
          <div className="bell-box">
            <div className="bell-header">
              <Clock size={18} />
              <h4>Розклад дзвінків (Пн – Пт)</h4>
              <span className="bell-tag">1 год 15 хв пара</span>
            </div>
            <div className="bell-list">
              {BELL_SCHEDULE_WEEKDAY.map(b => (
                <div key={b.pair} className="bell-item">
                  <span className="bell-pair-num">{b.pair}</span>
                  <div className="bell-details">
                    <strong>{b.name}: {b.start} → {b.end}</strong>
                    <span className="bell-break">Перерва: {b.breakAfter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bell-box">
            <div className="bell-header">
              <Clock size={18} />
              <h4>Розклад дзвінків (Субота)</h4>
              <span className="bell-tag">1 год пара</span>
            </div>
            <div className="bell-list">
              {BELL_SCHEDULE_SATURDAY.map(b => (
                <div key={b.pair} className="bell-item">
                  <span className="bell-pair-num">{b.pair}</span>
                  <div className="bell-details">
                    <strong>{b.name}: {b.start} → {b.end}</strong>
                    <span className="bell-break">Перерва: {b.breakAfter}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .schedule-section {
          padding: 4rem 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .format-notice-card {
          background: rgba(234, 88, 12, 0.08);
          border: 1px solid rgba(234, 88, 12, 0.3);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          margin-bottom: 2.5rem;
        }

        .notice-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          color: #ea580c;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
        }

        .notice-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .notice-col strong {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }

        .notice-col p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .schedule-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .section-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-subtle);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-size: 2rem;
          letter-spacing: -0.02em;
          margin-bottom: 0.35rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1rem;
          max-width: 650px;
        }

        .schedule-header-actions {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .toast-success {
          background: var(--accent-emerald-subtle);
          color: var(--accent-emerald);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

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
          font-size: 1rem;
        }

        .dispatcher-header p {
          font-size: 0.8rem;
          color: var(--text-muted);
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
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          display: block;
        }

        .group-pills {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .group-pill {
          padding: 0.4rem 0.75rem;
          font-size: 0.825rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          color: var(--text-main);
          border: 1px solid var(--border-color);
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
          padding: 0.2rem;
        }

        .segment-btn {
          padding: 0.35rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
        }

        .segment-btn.active {
          background: var(--primary-subtle);
          color: var(--primary);
        }

        .day-tabs {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .day-tab {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          padding: 0.75rem 0.5rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          position: relative;
        }

        .day-tab:hover {
          border-color: var(--border-subtle);
        }

        .day-tab.active {
          border-color: var(--primary);
          background: var(--primary-subtle);
          color: var(--primary);
          font-weight: 700;
        }

        .day-title {
          font-size: 0.875rem;
        }
        .day-short {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .day-tab.active .day-short {
          color: var(--primary);
        }

        .sub-count-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--accent-rose);
          color: #fff;
          font-size: 0.65rem;
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .group-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .current-group-tag {
          font-weight: 700;
          font-size: 1rem;
          margin-right: 0.75rem;
        }

        .status-day-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .pairs-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .pair-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        .pair-card.is-substituted {
          border-left: 4px solid var(--accent-rose);
          background: rgba(244, 63, 94, 0.03);
        }

        .pair-card.is-current {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-subtle);
        }

        .pair-time-col {
          border-right: 1px solid var(--border-color);
          padding-right: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .pair-index {
          font-weight: 700;
          font-size: 1rem;
        }

        .pair-time {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: monospace;
        }

        .current-badge {
          font-size: 0.7rem;
          margin-top: 0.25rem;
          align-self: flex-start;
        }

        .substitution-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.35rem;
        }

        .sub-reason {
          font-size: 0.75rem;
          color: var(--accent-rose);
          font-weight: 600;
        }

        .old-subject-line {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: line-through;
          margin-bottom: 0.2rem;
        }

        .pair-subject {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .pair-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.3rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .meet-btn {
          margin-left: auto;
          background: #107c41;
          border: none;
          padding: 0.3rem 0.65rem;
          font-size: 0.75rem;
        }

        /* Розклад дзвінків */
        .bell-schedules-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .bell-box {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
        }

        .bell-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .bell-header h4 {
          font-size: 1rem;
          flex: 1;
        }

        .bell-tag {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-subtle);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .bell-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bell-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
        }

        .bell-pair-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .bell-details strong {
          display: block;
          font-size: 0.825rem;
        }

        .bell-break {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .notice-grid, .bell-schedules-grid {
            grid-template-columns: 1fr;
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
          }
          .day-title {
            display: none;
          }
          .day-short {
            display: inline;
          }
        }
      `}</style>
    </section>
  );
}
