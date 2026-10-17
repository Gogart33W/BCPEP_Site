import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Code, ExternalLink } from 'lucide-react';

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/news?per=5');
  const [responseJson, setResponseJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');

  const endpoints = [
    {
      method: 'GET',
      path: '/api/news?per=5',
      title: 'Стрічка новин',
      desc: 'Повертає останні новини коледжу з пагінацією та категоріями для мобільного клієнта.'
    },
    {
      method: 'GET',
      path: '/api/substitutions',
      title: 'Щоденні заміни диспетчера',
      desc: 'Оперативні заміни пар, відфільтровані за поточною датою або групою.'
    },
    {
      method: 'GET',
      path: '/api/groups',
      title: 'Реєстр академічних груп',
      desc: 'Список усіх офіційних груп коледжу для вибору в мобільному додатку.'
    },
    {
      method: 'GET',
      path: '/api/menu',
      title: 'Структура навігаційного меню',
      desc: 'Деревоподібна структура розділів та підрозділів порталу БФКПЕП.'
    },
    {
      method: 'GET',
      path: '/api/pages/studentu/rekvizyty-dlya-oplaty',
      title: 'Контент сторінки (наприклад: Реквізити)',
      desc: 'Повертає повний структурований HTML-вміст та прикріплені файли сторінки.'
    },
    {
      method: 'GET',
      path: '/api/documents',
      title: 'Реєстр офіційних документів',
      desc: 'Перелік усіх нормативних актів, статуту, ліцензій та кошторисів коледжу.'
    }
  ];

  const handleRun = async (path) => {
    setSelectedEndpoint(path);
    setLoading(true);
    setStatus('Запит...');
    try {
      const res = await fetch(path);
      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));
      setStatus(`${res.status} ${res.statusText}`);
    } catch {
      setStatus('Помилка з’єднання');
      setResponseJson('{"error": "Не вдалося отримати дані від сервера"}');
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(responseJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="api-docs-page container">
      <header className="page-header">
        <div className="title-row">
          <Terminal size={24} className="t-icon" />
          <h1 className="page-title">Публічний REST API сервісів БФКПЕП</h1>
        </div>
        <p className="page-sub">
          Шлюз для інтеграції офіційного веб-сайту з мобільним Android-клієнтом. Видає структурований JSON для розкладу, замін та наказів.
        </p>
      </header>

      <div className="api-grid">
        {/* Список ендпоінтів */}
        <div className="endpoints-list">
          <h3>Доступні маршрути (Endpoints)</h3>
          {endpoints.map((ep, idx) => (
            <div 
              key={idx}
              className={`ep-card ${selectedEndpoint === ep.path ? 'active' : ''}`}
              onClick={() => handleRun(ep.path)}
            >
              <div className="ep-badge-row">
                <span className="method-get">{ep.method}</span>
                <span className="ep-path">{ep.path}</span>
              </div>
              <h4 className="ep-title">{ep.title}</h4>
              <p className="ep-desc">{ep.desc}</p>
              <button className="btn btn-outline btn-sm">
                <Play size={12} fill="currentColor" />
                <span>Виконати тест</span>
              </button>
            </div>
          ))}
        </div>

        {/* Консоль відповіді */}
        <div className="response-console">
          <div className="console-top">
            <div className="url-tag">
              <span className="method-pill">GET</span>
              <span className="url-text">{selectedEndpoint}</span>
            </div>
            <div className="console-actions">
              {status && <span className="status-badge">{status}</span>}
              {responseJson && (
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Скопійовано' : 'Копіювати JSON'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="console-body">
            {loading ? (
              <div className="console-msg">Отримання JSON-відповіді...</div>
            ) : responseJson ? (
              <pre className="json-code">
                <code>{responseJson}</code>
              </pre>
            ) : (
              <div className="console-msg">Оберіть маршрут зліва та натисніть «Виконати тест»</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .api-docs-page {
          padding: 2.5rem 1rem 4rem;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .t-icon {
          color: #2563eb;
        }

        .page-title {
          margin: 0;
          font-size: 2.1rem;
          font-weight: 800;
        }

        .page-sub {
          margin: 0 0 2rem 0;
          color: var(--text-muted, #64748b);
          font-size: 0.95rem;
        }

        .api-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .endpoints-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .endpoints-list h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.15rem;
        }

        .ep-card {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 10px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ep-card:hover {
          border-color: #2563eb;
        }

        .ep-card.active {
          border-color: #2563eb;
          box-shadow: 0 0 0 1px #2563eb;
          background: rgba(37, 99, 235, 0.03);
        }

        .ep-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }

        .method-get {
          background: #10b981;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .ep-path {
          font-family: monospace;
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
        }

        .ep-title {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .ep-desc {
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
          margin: 0 0 0.75rem 0;
          line-height: 1.35;
        }

        .response-console {
          background: #0f172a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          min-height: 520px;
        }

        .console-top {
          background: #1e293b;
          padding: 0.75rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #334155;
        }

        .url-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: monospace;
          font-size: 0.825rem;
        }

        .method-pill {
          background: #10b981;
          color: #ffffff;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.7rem;
        }

        .url-text {
          color: #94a3b8;
        }

        .console-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          font-family: monospace;
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #334155;
          color: #f1f5f9;
          border: none;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .console-body {
          flex: 1;
          overflow-y: auto;
          max-height: 600px;
          padding: 1.25rem;
        }

        .json-code {
          margin: 0;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.825rem;
          line-height: 1.45;
          color: #38bdf8;
        }

        .console-msg {
          color: #64748b;
          font-size: 0.9rem;
          text-align: center;
          padding: 4rem 1rem;
        }

        @media (max-width: 900px) {
          .api-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
