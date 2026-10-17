import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Newspaper, ArrowRight, Clock } from 'lucide-react';
import pagesData from '../../content/pages.json';
import newsData from '../../content/news.json';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const pageResults = q ? pagesData.filter(p => 
    p.title.toLowerCase().includes(q) || (p.content && p.content.toLowerCase().includes(q))
  ).slice(0, 8) : [];

  const newsResults = q ? newsData.filter(n => 
    n.title.toLowerCase().includes(q) || (n.content && n.content.toLowerCase().includes(q))
  ).slice(0, 8) : [];

  const totalResults = pageResults.length + newsResults.length;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-bar">
          <Search size={20} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Введіть запит (розклад, реквізити, статут, гуртожиток, спеціальність)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-modal-input"
          />
          <button className="search-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="search-results-area">
          {q === '' ? (
            <div className="search-hints">
              <span className="hint-title">Популярні розділи коледжу:</span>
              <div className="hint-tags">
                <button className="hint-tag" onClick={() => handleSelect('/rozklad-zanyat/rozklad-zanyat')}>Розклад занять</button>
                <button className="hint-tag" onClick={() => handleSelect('/studentu/rekvizyty-dlya-oplaty')}>Реквізити для оплати</button>
                <button className="hint-tag" onClick={() => handleSelect('/ustanovchi-dokumenty')}>Статут та ліцензії</button>
                <button className="hint-tag" onClick={() => handleSelect('/abituriyentu/speczialnosti')}>Спеціальності</button>
                <button className="hint-tag" onClick={() => handleSelect('/gurtozhytok')}>Гуртожиток</button>
                <button className="hint-tag" onClick={() => handleSelect('/pro-koledzh/istoriya-koledzhu')}>Історія коледжу</button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="no-search-results">
              <p>За запитом <strong>"{query}"</strong> матеріалів не знайдено.</p>
            </div>
          ) : (
            <div className="results-list">
              {/* Сторінки сайту */}
              {pageResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Розділи та сторінки ({pageResults.length})</span>
                  {pageResults.map(p => (
                    <div 
                      key={p.slug} 
                      className="search-item"
                      onClick={() => handleSelect(`/${p.slug}`)}
                    >
                      <FileText size={18} className="item-icon" />
                      <div className="item-text">
                        <strong>{p.title}</strong>
                        <span>/{p.slug}</span>
                      </div>
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              )}

              {/* Новини */}
              {newsResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Новини та накази ({newsResults.length})</span>
                  {newsResults.map(n => (
                    <div 
                      key={n.slug} 
                      className="search-item"
                      onClick={() => handleSelect(`/${n.slug}`)}
                    >
                      <Newspaper size={18} className="item-icon" />
                      <div className="item-text">
                        <strong>{n.title}</strong>
                        <span className="news-date-sub">
                          <Clock size={11} />
                          {n.date ? new Date(n.date).toLocaleDateString('uk-UA') : ''}
                        </span>
                      </div>
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 4rem 1rem 1rem;
        }

        .search-modal {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          max-width: 680px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-muted, #f8fafc);
        }

        .search-input-icon {
          color: #2563eb;
          flex-shrink: 0;
        }

        .search-modal-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1rem;
          color: var(--text-main, #0f172a);
          outline: none;
        }

        .search-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted, #64748b);
          cursor: pointer;
          padding: 0.25rem;
        }

        .search-results-area {
          overflow-y: auto;
          padding: 1rem 1.25rem;
        }

        .search-hints {
          padding: 1rem 0;
        }

        .hint-title {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted, #64748b);
          margin-bottom: 0.75rem;
        }

        .hint-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .hint-tag {
          background: var(--bg-muted, #f1f5f9);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 6px;
          padding: 0.4rem 0.75rem;
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-main, #1e293b);
          cursor: pointer;
          transition: all 0.15s;
        }

        .hint-tag:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .res-cat-title {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-muted, #64748b);
          margin-bottom: 0.5rem;
          display: block;
        }

        .search-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
        }

        .search-item:hover {
          background: var(--bg-muted, #f8fafc);
        }

        .item-icon {
          color: #2563eb;
          flex-shrink: 0;
        }

        .item-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .item-text strong {
          font-size: 0.9rem;
          color: var(--text-main, #0f172a);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-text span {
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
        }

        .news-date-sub {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .arrow-icon {
          color: #cbd5e1;
        }

        .no-search-results {
          padding: 3rem 1rem;
          text-align: center;
          color: var(--text-muted, #64748b);
        }
      `}</style>
    </div>
  );
}
