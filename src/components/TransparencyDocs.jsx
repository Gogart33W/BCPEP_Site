import React, { useState } from 'react';
import { OFFICIAL_DOCUMENTS } from '../data/collegeData';
import { FileText, Download, Search, ShieldCheck, Filter, ExternalLink } from 'lucide-react';

const CATEGORIES = [
  'Всі документи',
  'Установчі документи',
  'Ліцензії та акредитація',
  'Нормативні документи',
  'Фінансова звітність',
  'Безпека та правопорядок'
];

export default function TransparencyDocs() {
  const [selectedCat, setSelectedCat] = useState('Всі документи');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = OFFICIAL_DOCUMENTS.filter(doc => {
    const matchesCat = selectedCat === 'Всі документи' || doc.category === selectedCat;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="transparency-section" id="transparency-block">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-badge">Публічна інформація</span>
            <h2 className="section-title">Прозорість та нормативна база коледжу</h2>
            <p className="section-subtitle">
              Повний реєстр установчих документів, чинних ліцензій МОН України, фінансових кошторисів та сертифікатів про акредитацію.
            </p>
          </div>
        </div>

        {/* Панель пошуку та фільтрації */}
        <div className="docs-filter-box">
          <div className="search-input-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Пошук за назвою документа чи наказу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="docs-search-input"
            />
          </div>

          <div className="cat-pills">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Список документів */}
        <div className="docs-list">
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => (
              <div key={doc.id} className="doc-row">
                <div className="doc-icon-col">
                  <FileText size={24} className="doc-icon" />
                </div>

                <div className="doc-info-col">
                  <h4 className="doc-title">{doc.title}</h4>
                  <div className="doc-meta">
                    <span className="doc-category">{doc.category}</span>
                    <span className="doc-dot">•</span>
                    <span>Затверджено: {doc.date}</span>
                    <span className="doc-dot">•</span>
                    <span>Розмір: {doc.size}</span>
                  </div>
                </div>

                <div className="doc-action-col">
                  <a 
                    href={doc.pdfUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => {
                      if (doc.pdfUrl === '#') {
                        e.preventDefault();
                        alert('Електронна копія документа зберігається в архіві навчального закладу.');
                      }
                    }}
                  >
                    <Download size={14} />
                    <span>Завантажити PDF</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-docs">
              <p>За вашим запитом документів не знайдено.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .transparency-section {
          padding: 5rem 0;
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-color);
        }

        .docs-filter-box {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .search-input-wrap {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .docs-search-input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.85rem;
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          color: var(--text-main);
          transition: border-color 0.15s ease;
        }

        .docs-search-input:focus {
          border-color: var(--primary);
          outline: none;
        }

        .cat-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .cat-pill {
          padding: 0.4rem 0.85rem;
          font-size: 0.825rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          background: var(--bg-muted);
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          transition: all 0.15s ease;
        }

        .cat-pill:hover {
          color: var(--text-main);
          border-color: var(--border-subtle);
        }

        .cat-pill.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }

        .docs-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .doc-row {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .doc-row:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .doc-icon-col {
          color: var(--primary);
          flex-shrink: 0;
        }

        .doc-info-col {
          flex-grow: 1;
        }

        .doc-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-main);
        }

        .doc-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .doc-category {
          color: var(--primary);
          font-weight: 600;
        }

        .doc-dot {
          color: var(--border-subtle);
        }

        .empty-docs {
          text-align: center;
          padding: 3rem 0;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .doc-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .doc-action-col {
            width: 100%;
          }
          .doc-action-col .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
