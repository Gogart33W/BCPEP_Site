import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, ExternalLink, ArrowRight, 
  MessageCircle, Users, AlertCircle, FileText 
} from 'lucide-react';
import { fetchGroups, fetchSchedule, fetchSubstitutions } from '../api/client';

export default function SchedulePage() {
  const [bellTab, setBellTab] = useState('weekday');
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groupSchedule, setGroupSchedule] = useState(null);
  const [substitutions, setSubstitutions] = useState([]);

  useEffect(() => {
    fetchGroups().then(g => {
      setGroups(g || []);
      if (g && g.length > 0) setSelectedGroup(g[0].name);
    });
    fetchSubstitutions().then(s => setSubstitutions(s || []));
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchSchedule(selectedGroup).then(setGroupSchedule);
    }
  }, [selectedGroup]);

  return (
    <div className="schedule-page container">
      <header className="page-header">
        <h1 className="page-title">Розклад занять та щоденні заміни</h1>
        <p className="page-sub">
          Офіційні графіки освітнього процесу, щоденні заміни диспетчера та дзвінки занять ВСП «БФКПЕП».
        </p>
      </header>

      {/* Швидкі дії */}
      <div className="schedule-actions-bar">
        <a 
          href="https://drive.google.com/file/d/1w_gsLwLKw6TczNWFuhcY4GULk1_qzSQN/view" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-primary"
        >
          <FileText size={16} />
          <span>Відкрити актуальний розклад на Google Drive</span>
          <ExternalLink size={14} />
        </a>

        <a 
          href="https://drive.google.com/file/d/1TVcTiQTXSIRDZXGKvASHMQmrva7liXOf/view" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-outline"
        >
          <span>Попередня заміна</span>
          <ExternalLink size={14} />
        </a>

        <a 
          href="https://chat.whatsapp.com/FI1XamYDoGoJPk54nahKFx" 
          target="_blank" 
          rel="noreferrer" 
          className="btn btn-whatsapp"
        >
          <MessageCircle size={16} />
          <span>Офіційний WhatsApp-чат замін коледжу</span>
        </a>
      </div>

      {/* Вбудований перегляд офіційної таблиці замін Google Drive */}
      <section className="drive-embed-sec">
        <div className="embed-header">
          <h3>
            <Calendar size={18} />
            <span>Офіційний документ замін (Google Drive Preview)</span>
          </h3>
          <span className="embed-badge">Оновлюється диспетчером коледжу</span>
        </div>
        <div className="embed-frame-wrap">
          <iframe 
            src="https://drive.google.com/file/d/1w_gsLwLKw6TczNWFuhcY4GULk1_qzSQN/preview" 
            title="Офіційний розклад занять БФКПЕП"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      {/* Якщо в базі коледжу адміністрація опублікувала заміни */}
      {substitutions.length > 0 && (
        <section className="live-subs-sec">
          <h3 className="sub-title">Опубліковані оперативні заміни диспетчера</h3>
          <div className="subs-table-wrap">
            <table className="subs-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Група</th>
                  <th>Пара</th>
                  <th>Предмет / Дисципліна</th>
                  <th>Викладач</th>
                  <th>Аудиторія</th>
                  <th>Примітки</th>
                </tr>
              </thead>
              <tbody>
                {substitutions.map(s => (
                  <tr key={s.id}>
                    <td>{s.date}</td>
                    <td><span className="group-badge">{s.group_name}</span></td>
                    <td>{s.pair} пара</td>
                    <td><strong>{s.subject}</strong></td>
                    <td>{s.teacher || '—'}</td>
                    <td>{s.room || '—'}</td>
                    <td>{s.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Розклад дзвінків 1-в-1 */}
      <section className="bells-section">
        <div className="bells-header">
          <div>
            <h3>Розклад дзвінків</h3>
            <p>Час початку та завершення навчальних пар і тривалість перерв</p>
          </div>
          <div className="bells-tabs">
            <button 
              className={`bell-tab-btn ${bellTab === 'weekday' ? 'active' : ''}`}
              onClick={() => setBellTab('weekday')}
            >
              Пн – Пт (1 год 15 хв)
            </button>
            <button 
              className={`bell-tab-btn ${bellTab === 'saturday' ? 'active' : ''}`}
              onClick={() => setBellTab('saturday')}
            >
              Субота (1 год)
            </button>
          </div>
        </div>

        <div className="bells-cards">
          {bellTab === 'weekday' ? (
            <>
              <div className="b-card">
                <span className="b-pair">1 пара</span>
                <span className="b-time">08:30 → 09:45</span>
                <span className="b-break">перерва 15 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">2 пара</span>
                <span className="b-time">10:00 → 11:15</span>
                <span className="b-break alert">велика перерва 25 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">3 пара</span>
                <span className="b-time">11:40 → 12:55</span>
                <span className="b-break">перерва 15 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">4 пара</span>
                <span className="b-time">13:10 → 14:25</span>
                <span className="b-break">завершення занять</span>
              </div>
            </>
          ) : (
            <>
              <div className="b-card">
                <span className="b-pair">1 пара</span>
                <span className="b-time">08:30 → 09:30</span>
                <span className="b-break">перерва 10 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">2 пара</span>
                <span className="b-time">09:40 → 10:40</span>
                <span className="b-break alert">перерва 20 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">3 пара</span>
                <span className="b-time">11:00 → 12:00</span>
                <span className="b-break">перерва 10 хв</span>
              </div>
              <div className="b-card">
                <span className="b-pair">4 пара</span>
                <span className="b-time">12:10 → 13:10</span>
                <span className="b-break">завершення занять</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Якщо в системі адміни внесли розклад по групах */}
      {groups.length > 0 && (
        <section className="groups-schedule-sec">
          <div className="sec-head">
            <h3>Розклад навчальних занять за академічною групою</h3>
            <select 
              value={selectedGroup} 
              onChange={e => setSelectedGroup(e.target.value)}
              className="group-select"
            >
              {groups.map(g => (
                <option key={g.name} value={g.name}>{g.name} {g.specialty ? `(${g.specialty})` : ''}</option>
              ))}
            </select>
          </div>

          {groupSchedule && groupSchedule.lessons && groupSchedule.lessons.length > 0 ? (
            <div className="lessons-grid">
              {groupSchedule.lessons.map(l => (
                <div key={l.id} className="lesson-card">
                  <div className="l-top">
                    <span>День {l.weekday}</span>
                    <span className="l-pair">{l.pair} пара</span>
                  </div>
                  <strong className="l-subject">{l.subject}</strong>
                  <div className="l-bottom">
                    <span>{l.teacher || 'Викладач кафедри'}</span>
                    <span>{l.room || 'Аудиторія'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-group-box">
              <AlertCircle size={20} />
              <span>Для групи {selectedGroup} розклад наповнюється навчальною частиною в панелі адміністратора.</span>
            </div>
          )}
        </section>
      )}

      <style>{`
        .schedule-page {
          padding-top: 2rem;
          padding-bottom: 4rem;
          width: 100%;
        }

        .page-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          padding-bottom: 1.25rem;
        }

        .page-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-main, #0f172a);
          margin: 0 0 0.5rem 0;
        }

        .page-sub {
          font-size: 0.95rem;
          color: var(--text-muted, #64748b);
          margin: 0;
        }

        .schedule-actions-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .btn-whatsapp {
          background: #25d366;
          color: #ffffff;
          border: 1px solid #25d366;
        }

        .btn-whatsapp:hover {
          background: #20ba59;
        }

        .drive-embed-sec {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
        }

        .embed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: var(--bg-muted, #f8fafc);
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .embed-header h3 {
          margin: 0;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-main, #0f172a);
        }

        .embed-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .embed-frame-wrap {
          height: 640px;
          background: #f1f5f9;
          width: 100%;
          overflow: hidden;
        }

        .embed-frame-wrap iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        @media (max-width: 640px) {
          .schedule-header .page-title {
            font-size: 1.65rem;
            line-height: 1.25;
            word-break: break-word;
          }

          .schedule-actions-bar {
            flex-direction: column;
            gap: 0.65rem;
            width: 100%;
          }

          .schedule-actions-bar .btn {
            width: 100%;
            justify-content: center;
            text-align: center;
            white-space: normal;
            font-size: 0.875rem;
            padding: 0.75rem 1rem;
          }

          .embed-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            padding: 0.85rem 1rem;
          }

          .embed-header h3 {
            font-size: 0.95rem;
            line-height: 1.35;
          }

          .embed-badge {
            align-self: flex-start;
          }

          .embed-frame-wrap {
            height: 480px;
          }
        }

        .bells-section {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .bells-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bells-header h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.35rem;
          font-weight: 800;
        }

        .bells-header p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
        }

        .bells-tabs {
          display: flex;
          background: var(--bg-muted, #f1f5f9);
          padding: 0.25rem;
          border-radius: 8px;
        }

        .bell-tab-btn {
          border: none;
          background: transparent;
          padding: 0.45rem 1rem;
          font-size: 0.825rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted, #64748b);
        }

        .bell-tab-btn.active {
          background: var(--bg-surface, #ffffff);
          color: #2563eb;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .bells-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }

        .b-card {
          background: var(--bg-muted, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .b-pair {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-muted, #64748b);
          text-transform: uppercase;
        }

        .b-time {
          font-size: 1.25rem;
          font-weight: 800;
          color: #2563eb;
        }

        .b-break {
          font-size: 0.775rem;
          color: var(--text-muted, #64748b);
        }

        .b-break.alert {
          color: #ea580c;
          font-weight: 600;
        }

        .subs-table-wrap {
          overflow-x: auto;
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .subs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .subs-table th, .subs-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          text-align: left;
        }

        .group-badge {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .groups-schedule-sec {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 1.75rem;
        }

        .sec-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sec-head h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 800;
        }

        .group-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 6px;
          font-size: 0.9rem;
          background: var(--bg-base, #ffffff);
          color: var(--text-main, #0f172a);
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }

        .lesson-card {
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 1rem;
          background: var(--bg-muted, #f8fafc);
        }

        .l-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
          margin-bottom: 0.4rem;
        }

        .l-pair {
          font-weight: 700;
          color: #2563eb;
        }

        .l-subject {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .l-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 0.775rem;
          color: var(--text-muted, #64748b);
        }

        .empty-group-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1.25rem;
          background: var(--bg-muted, #f8fafc);
          border-radius: 8px;
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
        }
      `}</style>
    </div>
  );
}
