import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, ExternalLink, Download, Clock, 
  Tag, ChevronRight, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { fetchPageOrNews } from '../api/client';

export default function GenericPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Очищення шляху для пошуку
  const slug = location.pathname.replace(/^\/|\/$/g, '');

  useEffect(() => {
    setLoading(true);
    fetchPageOrNews(slug).then((res) => {
      if (res) {
        setData(res.data);
        setType(res.type);
      } else {
        setData(null);
        setType(null);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  // Перехоплення кліків на внутрішні посилання всередині згенерованого HTML
  const handleContentClick = (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;

    if (href.startsWith('/') && !href.startsWith('/uploads/') && !href.startsWith('/api/')) {
      e.preventDefault();
      navigate(href);
    }
  };

  // Очищення дублікату обкладинки новини на початку тексту (ВИКЛИКАЄТЬСЯ ДО УМОВНИХ RETURN)
  const cleanedContent = React.useMemo(() => {
    if (!data?.content) return '';
    let html = data.content;
    if (type === 'news' && data.image) {
      const imgFilename = data.image.split('/').pop().replace(/-\d+x\d+(\.\w+)$/, '$1');
      html = html.replace(/^\s*<(figure|p|div)[^>]*>\s*<img[^>]+src=["'][^"']*?([^"'/]+\.\w+)["'][^>]*>\s*<\/\1>/i, (match, tag, srcFile) => {
        if (data.image.includes(srcFile) || srcFile.includes(imgFilename.slice(0, 15))) {
          return '';
        }
        return match;
      });
    }
    return html;
  }, [data?.content, data?.image, type]);

  if (loading) {
    return (
      <div className="container page-loading-box">
        <div className="spinner"></div>
        <span>Завантаження матеріалів коледжу...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container not-found-page">
        <div className="not-found-card">
          <AlertCircle size={48} color="#ef4444" />
          <h1>Сторінку не знайдено</h1>
          <p>Запитуваний матеріал «{location.pathname}» не знайдено в базі даних сайту.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Повернутися на головну</span>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = slug.split('/').map((part, idx, arr) => {
    const path = '/' + arr.slice(0, idx + 1).join('/');
    return { name: part, path };
  });

  return (
    <article className="generic-page container">
      {/* Хлібні крихти */}
      <nav className="breadcrumbs-nav">
        <Link to="/">Головна</Link>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            <ChevronRight size={13} className="bc-sep" />
            {i === breadcrumbs.length - 1 ? (
              <span className="bc-current">{data.title}</span>
            ) : (
              <Link to={b.path}>{b.name}</Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Заголовок сторінки / новини */}
      <header className="page-header">
        <h1 className="page-title">{data.title}</h1>
        
        {type === 'news' && (
          <div className="news-meta-bar">
            {data.date && (
              <div className="meta-item">
                <Clock size={14} />
                <span>{new Date(data.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}
            {data.categories && data.categories.length > 0 && (
              <div className="meta-categories">
                <Tag size={14} />
                {data.categories.map((cat, i) => (
                  <span key={i} className="cat-pill">{cat}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Обкладинка новини (єдина, без дублювання в тілі новини) */}
      {type === 'news' && data.image && (
        <div className="news-featured-image-box">
          <img src={data.image} alt={data.title} />
        </div>
      )}

      {/* Основний вміст з таблицями, текстом та картинками */}
      <div 
        className="page-html-content"
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
        onClick={handleContentClick}
      />

      {/* Офіційні прикріплені документи (з можливістю перегляду або завантаження) */}
      {data.documents && data.documents.length > 0 && (
        <section className="attached-documents-sec">
          <h3 className="docs-sec-title">
            <FileText size={18} />
            <span>Офіційні документи та додатки ({data.documents.length})</span>
          </h3>

          <div className="docs-list-grid">
            {data.documents.map((doc, idx) => {
              const isDrive = doc.url.includes('drive.google.com') || doc.url.includes('docs.google.com');
              const previewUrl = isDrive && doc.url.includes('/view') ? doc.url.replace(/\/view.*/, '/preview') : null;

              return (
                <div key={idx} className="doc-item-card">
                  <div className="doc-card-info">
                    <FileText size={20} className="doc-icon" />
                    <div>
                      <h4 className="doc-title">{doc.title || 'Офіційний документ'}</h4>
                      <span className="doc-meta-url">
                        {isDrive ? 'Google Drive Репозиторій' : 'Файл коледжу'}
                      </span>
                    </div>
                  </div>

                  {previewUrl && (
                    <div className="doc-embedded-preview">
                      <iframe 
                        src={previewUrl} 
                        title={doc.title}
                        loading="lazy" 
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="doc-card-actions">
                    <a 
                      href={doc.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-outline btn-sm"
                    >
                      <ExternalLink size={14} />
                      <span>Відкрити документ</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <style>{`
        .generic-page {
          padding: 2rem 1rem 4rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .breadcrumbs-nav {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .breadcrumbs-nav a {
          color: var(--text-muted, #64748b);
          text-decoration: none;
        }

        .breadcrumbs-nav a:hover {
          color: #2563eb;
        }

        .bc-sep {
          color: #cbd5e1;
        }

        .bc-current {
          color: var(--text-main, #0f172a);
          font-weight: 600;
        }

        .page-header {
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          padding-bottom: 1.25rem;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-main, #0f172a);
          line-height: 1.25;
          margin: 0 0 0.75rem 0;
        }

        .news-meta-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          flex-wrap: wrap;
        }

        .meta-item, .meta-categories {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .cat-pill {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .news-featured-image-box {
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
          background: #f1f5f9;
        }

        .news-featured-image-box img {
          width: 100%;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }

        /* Стилі для контенту з WordPress */
        .page-html-content {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-main, #1e293b);
        }

        .page-html-content p {
          margin-bottom: 1.25rem;
        }

        .page-html-content h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 2rem 0 1rem;
          color: var(--text-main, #0f172a);
          border-bottom: 2px solid rgba(37, 99, 235, 0.15);
          padding-bottom: 0.35rem;
        }

        .page-html-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
          color: #2563eb;
        }

        .page-html-content ul, .page-html-content ol {
          margin: 1rem 0 1.5rem 1.75rem;
        }

        .page-html-content li {
          margin-bottom: 0.5rem;
        }

        .page-html-content a {
          color: #2563eb;
          text-decoration: underline;
        }

        .page-html-content a:hover {
          color: #1d4ed8;
        }

        .page-html-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.25rem 0;
          display: block;
        }

        .page-html-content video {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
          background: #000;
        }

        /* Таблиці розкладу, кадрового складу, реквізитів */
        .page-html-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          font-size: 0.925rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .page-html-content th, .page-html-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-color);
          text-align: left;
          white-space: normal;
          min-width: 120px;
        }

        .page-html-content th {
          background: var(--bg-muted);
          font-weight: 700;
          color: var(--text-main);
        }

        .page-html-content tr:hover td {
          background: var(--primary-subtle);
        }

        .page-html-content .content-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #2563eb;
          color: #ffffff !important;
          text-decoration: none !important;
          padding: 0.65rem 1.25rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          margin: 0.75rem 0;
          transition: background 0.15s;
        }

        .page-html-content .content-btn:hover {
          background: #1d4ed8;
        }

        /* Блок офіційних документів */
        .attached-documents-sec {
          margin-top: 3.5rem;
          padding-top: 2rem;
          border-top: 2px solid var(--border-color, #e2e8f0);
        }

        .docs-sec-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--text-main, #0f172a);
        }

        .docs-list-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .doc-item-card {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 10px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .doc-card-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .doc-icon {
          color: #2563eb;
          flex-shrink: 0;
        }

        .doc-title {
          margin: 0 0 0.2rem 0;
          font-size: 1rem;
          font-weight: 700;
        }

        .doc-meta-url {
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
        }

        .doc-embedded-preview {
          width: 100%;
          height: 520px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border-color, #e2e8f0);
          background: #f8fafc;
        }

        .doc-embedded-preview iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .doc-card-actions {
          display: flex;
          justify-content: flex-end;
        }

        .page-loading-box, .not-found-page {
          padding: 5rem 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .not-found-card {
          max-width: 480px;
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .not-found-card h1 {
          margin: 0;
          font-size: 1.5rem;
        }

        .not-found-card p {
          margin: 0;
          color: var(--text-muted, #64748b);
          font-size: 0.9rem;
        }
      `}</style>
    </article>
  );
}
