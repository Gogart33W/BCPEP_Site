import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, BookOpen, FileText, User, ArrowRight } from 'lucide-react';
import { SPECIALTIES, GROUPS, OFFICIAL_DOCUMENTS, ADMINISTRATION } from '../data/collegeData';

export default function SearchModal({ isOpen, onClose, onSelectGroup, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Фільтрація результатів
  const groupResults = q ? GROUPS.filter(g => g.name.toLowerCase().includes(q) || g.department.toLowerCase().includes(q)) : [];
  const specResults = q ? SPECIALTIES.filter(s => s.code.includes(q) || s.name.toLowerCase().includes(q)) : [];
  const docResults = q ? OFFICIAL_DOCUMENTS.filter(d => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)) : [];
  const teacherResults = q ? [
    ...ADMINISTRATION.filter(a => a.name.toLowerCase().includes(q)),
    { name: 'Пелихівський Л.О.', role: 'Викладач комп’ютерних дисциплін', qualification: 'Спеціаліст вищої категорії' },
    { name: 'Куроп С.І.', role: 'Викладач спецдисциплін ІПЗ', qualification: 'Методист' },
    { name: 'Гіневська І.В.', role: 'Викладач баз даних та ІТ', qualification: 'Спеціаліст вищої категорії' },
    { name: 'Сидорко В.П.', role: 'Викладач фізичного виховання', qualification: 'Старший викладач' }
  ].filter(t => t.name.toLowerCase().includes(q)) : [];

  const totalResults = groupResults.length + specResults.length + docResults.length + teacherResults.length;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-bar">
          <Search size={20} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Введіть групу (ПЗ-41), викладача, спеціальність чи документ..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-modal-input"
          />
          <button className="search-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="search-results-area">
          {q === '' ? (
            <div className="search-hints">
              <span className="hint-title">Популярні пошукові запити:</span>
              <div className="hint-tags">
                <button className="hint-tag" onClick={() => setQuery('ПЗ-41')}>Група ПЗ-41</button>
                <button className="hint-tag" onClick={() => setQuery('Пелихівський')}>Пелихівський</button>
                <button className="hint-tag" onClick={() => setQuery('121')}>121 Інженерія ПЗ</button>
                <button className="hint-tag" onClick={() => setQuery('Статут')}>Статут коледжу</button>
                <button className="hint-tag" onClick={() => setQuery('Заміни')}>Заміни</button>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="no-search-results">
              <p>За запитом <strong>"{query}"</strong> нічого не знайдено.</p>
            </div>
          ) : (
            <div className="results-list">
              {/* Групи розкладу */}
              {groupResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Академічні групи</span>
                  {groupResults.map(g => (
                    <div 
                      key={g.id} 
                      className="search-item"
                      onClick={() => { onSelectGroup(g.id); onNavigate('schedule'); onClose(); }}
                    >
                      <Calendar size={18} className="item-icon" />
                      <div>
                        <strong>Розклад групи {g.name}</strong>
                        <span>{g.department} • {g.course} курс</span>
                      </div>
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              )}

              {/* Спеціальності */}
              {specResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Спеціальності</span>
                  {specResults.map(s => (
                    <div 
                      key={s.id} 
                      className="search-item"
                      onClick={() => { onNavigate('specialties'); onClose(); }}
                    >
                      <BookOpen size={18} className="item-icon" />
                      <div>
                        <strong>{s.code} {s.name}</strong>
                        <span>{s.degree}</span>
                      </div>
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              )}

              {/* Викладачі */}
              {teacherResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Викладачі та дирекція</span>
                  {teacherResults.map((t, idx) => (
                    <div 
                      key={idx} 
                      className="search-item"
                      onClick={() => { onNavigate('administration'); onClose(); }}
                    >
                      <User size={18} className="item-icon" />
                      <div>
                        <strong>{t.name}</strong>
                        <span>{t.role}</span>
                      </div>
                      <ArrowRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              )}

              {/* Документи */}
              {docResults.length > 0 && (
                <div className="result-category">
                  <span className="res-cat-title">Офіційні документи</span>
                  {docResults.map(d => (
                    <div 
                      key={d.id} 
                      className="search-item"
                      onClick={() => { onNavigate('transparency'); onClose(); }}
                    >
                      <FileText size={18} className="item-icon" />
                      <div>
                        <strong>{d.title}</strong>
                        <span>{d.category}</span>
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
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          z-index: 2100;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 5rem 1.25rem 2rem;
          animation: fadeIn 0.15s ease-out;
        }

        .search-modal {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          max-width: 640px;
          width: 100%;
          box-shadow: var(--shadow-xl);
          overflow: hidden;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
        }

        .search-input-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .search-modal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .search-close-btn {
          color: var(--text-muted);
          padding: 0.25rem;
        }
        .search-close-btn:hover {
          color: var(--text-main);
        }

        .search-results-area {
          max-height: 440px;
          overflow-y: auto;
          padding: 1.25rem;
        }

        .search-hints {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hint-title {
          font-size: 0.775rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .hint-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .hint-tag {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          padding: 0.35rem 0.85rem;
          font-size: 0.825rem;
          color: var(--text-main);
          font-weight: 500;
          transition: all 0.15s ease;
        }
        .hint-tag:hover {
          background: var(--primary-subtle);
          border-color: var(--primary);
          color: var(--primary);
        }

        .no-search-results {
          text-align: center;
          padding: 2.5rem 0;
          color: var(--text-muted);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .result-category {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .res-cat-title {
          font-size: 0.725rem;
          font-weight: 800;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .search-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          background: var(--bg-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .search-item:hover {
          background: var(--primary-subtle);
          transform: translateX(3px);
        }

        .item-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .search-item strong {
          display: block;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .search-item span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .arrow-icon {
          margin-left: auto;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
