import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, Search, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { fetchNews, fetchNewsCategories } from '../api/client';
import NewsCardCover from '../components/NewsCardCover';
import NewsMasonryGrid from '../components/NewsMasonryGrid';

export default function NewsArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || '';
  const q = searchParams.get('q') || '';

  const [newsRes, setNewsRes] = useState({ items: [], total: 0, pages: 1 });
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(q);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchNews({ page, per: 12, category, q }).then(res => {
      setNewsRes(res);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [page, category, q]);

  const handleCategoryClick = (catName) => {
    const params = new URLSearchParams(searchParams);
    if (catName) params.set('category', catName);
    else params.delete('category');
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    else params.delete('q');
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > newsRes.pages) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params);
  };

  return (
    <div className="news-archive-page container">
      <header className="archive-header">
        <h1 className="archive-title">Стрічка новин та подій коледжу</h1>
        <p className="archive-desc">
          Офіційні повідомлення, наукові та виховні заходи, спортивні досягнення та життя спільноти БФКПЕП (усього матеріалів: {newsRes.total}).
        </p>

        {/* Форма пошуку */}
        <form onSubmit={handleSearchSubmit} className="news-search-bar">
          <Search size={18} className="s-icon" />
          <input 
            type="text" 
            placeholder="Пошук за назвою або змістом новини..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">Шукати</button>
        </form>

        {/* Фільтр категорій */}
        <div className="categories-pill-row">
          <button 
            className={`cat-btn ${!category ? 'active' : ''}`}
            onClick={() => handleCategoryClick('')}
          >
            Всі новини
          </button>
          {categories.slice(0, 8).map(c => (
            <button 
              key={c.name}
              className={`cat-btn ${category === c.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(c.name)}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      </header>

      {/* Список новин */}
      {loading ? (
        <div className="loading-feed">Завантаження новин коледжу...</div>
      ) : newsRes.items.length === 0 ? (
        <div className="empty-feed">
          <p>За вашим запитом новин не знайдено.</p>
          <button className="btn btn-outline btn-sm" onClick={() => { setSearchQuery(''); handleCategoryClick(''); }}>
            Скинути фільтри
          </button>
        </div>
      ) : (
        <>
          <NewsMasonryGrid
            items={newsRes.items}
            renderItem={(post) => (
              <article key={post.slug} className="news-card">
                <Link to={`/${post.slug}`} className="news-img-box-link">
                  <NewsCardCover
                    src={post.image}
                    alt={post.title}
                    category={post.categories && post.categories[0]}
                  />
                </Link>

                <div className="news-content-box">
                  <div className="news-date">
                    <Clock size={13} />
                    <span>{post.date ? new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Нещодавно'}</span>
                  </div>
                  <h3 className="news-title">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </article>
            )}
          />

          {/* Пагінація 1..N */}
          {newsRes.pages > 1 && (
            <div className="pagination-bar">
              <button 
                className="page-btn" 
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft size={16} />
                <span>Назад</span>
              </button>

              <span className="page-indicator">
                Сторінка <strong>{page}</strong> з <strong>{newsRes.pages}</strong>
              </span>

              <button 
                className="page-btn" 
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= newsRes.pages}
              >
                <span>Далі</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      <style>{`
        .news-archive-page {
          padding: 2.5rem 1rem 4rem;
        }

        .archive-header {
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          padding-bottom: 1.5rem;
        }

        .archive-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-main, #0f172a);
          margin: 0 0 0.5rem 0;
        }

        .archive-desc {
          font-size: 0.95rem;
          color: var(--text-muted, #64748b);
          margin: 0 0 1.5rem 0;
        }

        .news-search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 0.4rem 0.75rem;
          max-width: 540px;
          margin-bottom: 1.25rem;
        }

        .s-icon {
          color: var(--text-muted, #64748b);
        }

        .news-search-bar input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.9rem;
          color: var(--text-main, #0f172a);
          outline: none;
        }

        .categories-pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .cat-btn {
          border: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-surface, #ffffff);
          color: var(--text-muted, #64748b);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }

        .cat-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .cat-btn.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .news-card {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .news-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .news-img-box-link {
          display: block;
          text-decoration: none;
        }

        .news-content-box {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .news-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted, #64748b);
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .news-title {
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 0;
        }

        .news-title a {
          color: var(--text-main, #0f172a);
          text-decoration: none;
        }

        .news-title a:hover {
          color: #2563eb;
        }

        .pagination-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .page-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color, #e2e8f0);
          background: var(--bg-surface, #ffffff);
          color: var(--text-main, #0f172a);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-indicator {
          font-size: 0.9rem;
          color: var(--text-muted, #64748b);
        }

        .loading-feed, .empty-feed {
          padding: 4rem 1rem;
          text-align: center;
          color: var(--text-muted, #64748b);
        }
      `}</style>
    </div>
  );
}
