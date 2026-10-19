import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  FileText, ExternalLink, Download, Clock, 
  Tag, ChevronRight, AlertCircle, ArrowLeft,
  FolderOpen, ArrowRight, Layers
} from 'lucide-react';
import { fetchPageOrNews } from '../api/client';
import menuData from '../../content/menu.json';

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

  // Трансформація медіа (YouTube-вбудови для спеціальностей, очищення битих локальних тегів video)
  const cleanedContent = React.useMemo(() => {
    if (!data?.content) return '';
    let html = data.content;

    // Авто-конвертація локальних .mp4 спеціальностей на офіційні YouTube вбудови (@БФКПЕП)
    html = html.replace(/<video[^>]*>[\s\S]*?prezentaczyya-specz\.-programuvannya[\s\S]*?<\/video>/gi, 
      '<div class="video-embed-box"><iframe src="https://www.youtube-nocookie.com/embed/99EvLj4a8mA" title="Інженерія програмного забезпечення" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    );
    html = html.replace(/<video[^>]*>[\s\S]*?ekonomika-prezentacziya[\s\S]*?<\/video>/gi, 
      '<div class="video-embed-box"><iframe src="https://www.youtube-nocookie.com/embed/tgVYwdazTu0" title="Економіка та менеджмент" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    );
    html = html.replace(/<video[^>]*>[\s\S]*?oblik-i-opodatkuvannya-finansy[\s\S]*?<\/video>/gi, 
      '<div class="video-embed-box"><iframe src="https://www.youtube-nocookie.com/embed/mR5G1TfZU74" title="Фінанси та облік" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    );
    html = html.replace(/<video[^>]*>[\s\S]*?(?:1|2)\.mp4[\s\S]*?<\/video>/gi, 
      '<div class="video-embed-box"><iframe src="https://www.youtube-nocookie.com/embed/4_jGq1puXIQ" title="Машинобудування" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    );
    html = html.replace(/<video[^>]*>[\s\S]*?rik-yakyj-zminyv-nas[\s\S]*?<\/video>/gi, 
      '<div class="video-embed-box"><iframe src="https://www.youtube-nocookie.com/embed/cwmxENRrzmc" title="Рік який змінив нас назавжди" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
    );

    // Якщо залишились биті локальні <video src="/uploads/..."> без джерела на сервері, приховуємо їх, щоб браузер не виводив помилку MIME
    html = html.replace(/<video[^>]*controls[^>]*>\s*(?:<source[^>]*src=["']\/uploads\/[^"']+["'][^>]*>)?\s*<\/video>/gi, '');

    return html;
  }, [data?.content]);

  // Пошук чи є поточна сторінка батьківською категорією в menu.json
  const matchedCategory = React.useMemo(() => {
    const norm = slug.replace(/^\/|\/$/g, '');
    const searchTree = (items) => {
      for (const item of items) {
        const itemNorm = (item.path || '').replace(/^\/|\/$/g, '');
        if (itemNorm === norm) return item;
        if (item.children) {
          const found = searchTree(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    return searchTree(menuData);
  }, [slug]);

  // Перевірка чи в контенті новини вже є власні ілюстрації від автора (щоб не дублювати заставку)
  const hasContentImages = React.useMemo(() => {
    return Boolean(cleanedContent && /<img[^>]+src=/i.test(cleanedContent));
  }, [cleanedContent]);

  // Приховування битих зображень без ламання верстки
  const handleContentError = (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      e.target.style.display = 'none';
    }
  };

  const textLength = (cleanedContent || '').replace(/<[^>]+>/g, '').trim().length;
  const isShortContent = textLength < 120;
  const isParentCategory = !!(matchedCategory?.children && matchedCategory.children.length > 0);

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

      {/* Обкладинка новини (тільки якщо в самому тексті немає ілюстрацій автора — без обрізання та без дублювання) */}
      {type === 'news' && data.image && !hasContentImages && (
        <div className="news-fallback-hero-box">
          <img 
            src={data.image.replace(/-\d+x\d+(\.\w+)$/, '$1')} 
            alt={data.title} 
            onError={e => { 
              if (e.currentTarget.src !== data.image) {
                e.currentTarget.src = data.image;
              } else {
                e.currentTarget.parentElement.style.display = 'none'; 
              }
            }} 
          />
        </div>
      )}

      {/* Авто-каталог підрозділів (якщо це категорія-батько) */}
      {isParentCategory && (
        <section className="directory-hub-section">
          <div className="directory-hub-header">
            <div className="hub-header-title">
              <FolderOpen size={22} className="hub-icon" />
              <h2>Офіційні матеріали та сторінки розділу</h2>
            </div>
            <p>Оберіть потрібний підрозділ або документ для перегляду детальної інформації:</p>
          </div>
          <div className="directory-cards-grid">
            {matchedCategory.children.map((child, cIdx) => (
              <Link key={cIdx} to={child.path} className="directory-card">
                <div className="directory-card-top">
                  <span className="directory-icon"><Layers size={18} /></span>
                  <span className="directory-badge">Перейти →</span>
                </div>
                <h3 className="directory-title">{child.title}</h3>
                {child.children && child.children.length > 0 && (
                  <div className="directory-sub-pills">
                    {child.children.slice(0, 3).map((sub, sIdx) => (
                      <span key={sIdx} className="sub-pill">{sub.title}</span>
                    ))}
                    {child.children.length > 3 && (
                      <span className="sub-pill more">+{child.children.length - 3}</span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Основний вміст з таблицями, текстом та відео (якщо він є і не є пустим) */}
      {(!isParentCategory || !isShortContent || (cleanedContent && cleanedContent.includes('<video'))) && (
        <div 
          className="page-html-content"
          dangerouslySetInnerHTML={{ __html: cleanedContent }}
          onClick={handleContentClick}
          onErrorCapture={handleContentError}
        />
      )}

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
          padding-top: 2rem;
          padding-bottom: 4rem;
          width: 100%;
        }

        .directory-hub-section {
          margin: 1.5rem 0 2.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
        }

        .hub-header-title {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.35rem;
        }

        .hub-icon {
          color: var(--primary);
        }

        .directory-hub-header h2 {
          font-size: 1.35rem;
          color: var(--text-main);
          margin: 0;
        }

        .directory-hub-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin: 0 0 1.25rem 0;
        }

        .directory-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .directory-card {
          background: var(--bg-muted);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.15rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .directory-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
          background: var(--bg-surface);
        }

        .directory-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .directory-icon {
          color: var(--primary);
        }

        .directory-badge {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--primary);
        }

        .directory-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
          line-height: 1.35;
        }

        .directory-sub-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: 0.25rem;
        }

        .sub-pill {
          font-size: 0.725rem;
          padding: 0.15rem 0.45rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xs);
          color: var(--text-muted);
        }

        .sub-pill.more {
          color: var(--primary);
          font-weight: 700;
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

        .news-fallback-hero-box {
          border-radius: var(--radius-lg, 14px);
          overflow: hidden;
          margin: 1.5rem auto 2.5rem;
          max-width: 920px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .news-fallback-hero-box img {
          max-width: 100%;
          height: auto;
          max-height: 85vh;
          object-fit: contain;
          display: block;
        }

        /* Стилі для контенту з WordPress */
        .page-html-content {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-main, #1e293b);
        }

        .page-html-content iframe {
          width: 100%;
          max-width: 860px;
          aspect-ratio: 16 / 9;
          height: auto;
          border: none;
          border-radius: 12px;
          margin: 1.5rem 0;
          display: block;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
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

        .page-html-content figure {
          margin: 1.75rem auto;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-html-content figcaption {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-align: center;
        }

        .page-html-content img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: var(--radius-md, 10px);
          margin: 1.5rem auto;
          display: block;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.12);
          border: 1px solid var(--border-color);
        }

        .page-html-content .wp-block-image {
          margin: 1.75rem auto;
          text-align: center;
        }

        .page-html-content .wp-block-image img {
          display: inline-block;
          margin: 0 auto;
        }

        .page-html-content .aligncenter {
          display: block;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .page-html-content .alignleft {
          float: left;
          margin: 0.5rem 1.5rem 1rem 0;
          max-width: 50%;
        }

        .page-html-content .alignright {
          float: right;
          margin: 0.5rem 0 1rem 1.5rem;
          max-width: 50%;
        }

        @media (max-width: 768px) {
          .page-html-content .alignleft,
          .page-html-content .alignright {
            float: none;
            margin: 1.25rem auto;
            max-width: 100%;
          }
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

        /* Адаптивність внутрішніх сторінок під мобільні */
        @media (max-width: 768px) {
          .generic-page {
            padding: 1.25rem 1rem 3rem;
          }
          .page-title {
            font-size: 1.6rem;
            line-height: 1.25;
          }
          .news-meta-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .page-content table {
            display: block;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 1.25rem 0;
          }
          .docs-card-grid {
            grid-template-columns: 1fr;
          }
          .doc-item-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .doc-actions {
            width: 100%;
          }
          .doc-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </article>
  );
}
