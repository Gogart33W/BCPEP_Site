import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, BookOpen, Clock, ArrowRight, Video, 
  ExternalLink, Bell, Shield, Award, Users 
} from 'lucide-react';
import { fetchHome, fetchNews, fetchNotice } from '../api/client';
import NewsCardCover from '../components/NewsCardCover';

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [notice, setNotice] = useState(null);
  const [bellTab, setBellTab] = useState('weekday');

  useEffect(() => {
    fetchHome().then(setHomeData);
    fetchNews({ per: 6 }).then(res => setLatestNews(res.items || []));
    fetchNotice().then(setNotice);
  }, []);

  return (
    <div className="home-page">
      {/* Головний банер коледжу */}
      <section className="hero-banner">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge">
              <Award size={14} /> 120+ років освітніх традицій
            </span>
            <h1 className="hero-title">
              Бердичівський фаховий коледж промисловості, економіки та права
            </h1>
            <p className="hero-desc">
              Відокремлений структурний підрозділ. Провідний заклад фахової передвищої освіти Житомирщини: 8 акредитованих спеціальностей, інноваційні лабораторії, військова кафедра та гарантоване працевлаштування.
            </p>
            <div className="hero-buttons">
              <Link to="/abituriyentu/vstup" className="btn btn-primary">
                <BookOpen size={16} />
                <span>Вступнику 2026</span>
              </Link>
              <Link to="/rozklad-zanyat/rozklad-zanyat" className="btn btn-hero-glass">
                <Calendar size={16} />
                <span>Розклад та заміни</span>
              </Link>
              <Link to="/abituriyentu/speczialnosti" className="btn btn-hero-glass">
                <Users size={16} />
                <span>Спеціальності</span>
              </Link>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">1903</span>
              <span className="stat-label">Рік заснування</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">8</span>
              <span className="stat-label">Спеціальностей</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Гуртожиток</span>
            </div>
          </div>
        </div>
      </section>

      {/* Дошка оперативних оголошень коледжу (динамічна, прихована коли немає активного оголошення) */}
      {notice && notice.enabled && (notice.title || notice.text) && (
        <section className={`notice-board-section notice-type-${notice.type || 'info'}`}>
          <div className="container">
            <div className="notice-board-card">
              <div className="notice-board-top">
                <div className="notice-live-tag">
                  <span className="live-dot"></span>
                  <strong>{notice.badge || 'ОГОЛОШЕННЯ КОЛЕДЖУ'}</strong>
                </div>
                {notice.dateInfo && (
                  <span className="notice-dates-badge">
                    <Clock size={13} />
                    <span>{notice.dateInfo}</span>
                  </span>
                )}
              </div>

              <div className="notice-board-content">
                {notice.title && (
                  <h2 className="notice-board-title">{notice.title}</h2>
                )}
                {notice.text && (
                  <div className="notice-board-text">
                    {notice.text.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                {notice.actionText && notice.actionUrl && (
                  <div className="notice-actions-row">
                    {notice.actionUrl.startsWith('/') ? (
                      <Link to={notice.actionUrl} className="btn btn-primary">
                        <span>{notice.actionText}</span>
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <a 
                        href={notice.actionUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-primary"
                      >
                        <span>{notice.actionText}</span>
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Останні новини коледжу */}
      <section className="home-section news-preview-sec">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="section-title">Новини та події коледжу</h2>
              <p className="section-subtitle">Офіційні повідомлення, студентське життя та досягнення</p>
            </div>
            <Link to="/novyny" className="view-all-link">
              <span>Всі новини</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="news-cards-grid">
            {latestNews.map((post) => (
              <article key={post.slug} className="news-card">
                <Link to={`/${post.slug}`} className="news-card-image-link">
                  <NewsCardCover
                    src={post.image}
                    alt={post.title}
                    category={post.categories && post.categories[0]}
                  />
                </Link>

                <div className="news-card-body">
                  <div className="news-card-date">
                    <Clock size={13} />
                    <span>{post.date ? new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Нещодавно'}</span>
                  </div>
                  <h3 className="news-card-title">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Віртуальна екскурсія та швидкі посилання як на оригіналі */}
      <section className="home-section media-tiles-sec">
        <div className="container">
          <div className="media-tiles-grid">
            {/* Відео віртуальної екскурсії */}
            <div className="media-video-card">
              <div className="card-top-title">
                <Video size={18} />
                <h3>Віртуальна екскурсія коледжем</h3>
              </div>
              <div className="video-player-box">
                <iframe 
                  src="https://www.youtube-nocookie.com/embed/qOUu4D8Od7Q" 
                  title="Віртуальна екскурсія по Бердичівському фаховому коледжу"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              </div>
              <p className="video-desc">
                Огляд навчального корпусу, аудиторій програмування, навчально-виробничих майстерень та студентського простору.
              </p>
            </div>

            {/* Плитки-посилання */}
            <div className="quick-tiles-col">
              <Link to="/pro-koledzh/istoriya-koledzhu" className="promo-tile">
                <img 
                  src="/images/home/history.png" 
                  alt="" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="promo-tile-overlay">
                  <h4>Історія коледжу</h4>
                  <span>Дізнатися більше про традиції з 1903 року →</span>
                </div>
              </Link>

              <Link to="/pamyatayemo-zagyblyh-u-vijni" className="promo-tile memorial">
                <img 
                  src="/images/home/memorial.png" 
                  alt="" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="promo-tile-overlay">
                  <h4>Пам'ятаємо загиблих у війні</h4>
                  <span>Герої нашого коледжу, які віддали життя за Україну →</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Розклад дзвінків коледжу */}
      <section className="home-section bells-sec">
        <div className="container">
          <div className="bells-box">
            <div className="bells-header">
              <div>
                <h2 className="bells-title">Розклад дзвінків навчальних занять</h2>
                <p className="bells-sub">Тривалість пар: будні — 1 год 15 хв, субота — 1 год</p>
              </div>
              <div className="bells-tabs">
                <button 
                  className={`tab-btn ${bellTab === 'weekday' ? 'active' : ''}`}
                  onClick={() => setBellTab('weekday')}
                >
                  Пн – Пт (Будні)
                </button>
                <button 
                  className={`tab-btn ${bellTab === 'saturday' ? 'active' : ''}`}
                  onClick={() => setBellTab('saturday')}
                >
                  Субота
                </button>
              </div>
            </div>

            <div className="bells-grid">
              {bellTab === 'weekday' ? (
                <>
                  <div className="bell-card">
                    <span className="bell-num">1 пара</span>
                    <span className="bell-time">08:30 – 09:45</span>
                    <span className="bell-break">перерва 15 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">2 пара</span>
                    <span className="bell-time">10:00 – 11:15</span>
                    <span className="bell-break highlight">велика перерва 25 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">3 пара</span>
                    <span className="bell-time">11:40 – 12:55</span>
                    <span className="bell-break">перерва 15 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">4 пара</span>
                    <span className="bell-time">13:10 – 14:25</span>
                    <span className="bell-break">кінець занять</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bell-card">
                    <span className="bell-num">1 пара</span>
                    <span className="bell-time">08:30 – 09:30</span>
                    <span className="bell-break">перерва 10 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">2 пара</span>
                    <span className="bell-time">09:40 – 10:40</span>
                    <span className="bell-break highlight">перерва 20 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">3 пара</span>
                    <span className="bell-time">11:00 – 12:00</span>
                    <span className="bell-break">перерва 10 хв</span>
                  </div>
                  <div className="bell-card">
                    <span className="bell-num">4 пара</span>
                    <span className="bell-time">12:10 – 13:10</span>
                    <span className="bell-break">кінець занять</span>
                  </div>
                </>
              )}
            </div>

            <div className="bells-footer">
              <Link to="/rozklad-zanyat/rozklad-zanyat" className="btn btn-primary btn-sm">
                <span>Переглянути розклад пар та щоденні заміни</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Наші партнери (університети) */}
      <section className="home-section partners-sec">
        <div className="container">
          <h2 className="partners-title">Наші партнери</h2>
          <p className="partners-subtitle">Провідні університети України, з якими діють договори про продовження навчання випускників</p>
          
          <div className="partners-grid">
            <a href="https://www.knuba.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/knuba.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>КНУБА</span>
            </a>
            <a href="https://kymu.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/kymu.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>КиМУ</span>
            </a>
            <a href="https://op.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/op.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>Одеська політехніка</span>
            </a>
            <a href="https://nuft.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/nuft.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>НУХТ</span>
            </a>
            <a href="https://ztu.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/ztu.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>Житомирська політехніка</span>
            </a>
            <a href="https://zu.edu.ua/" target="_blank" rel="noreferrer" className="partner-item">
              <img 
                src="/images/partners/zu.png" 
                alt="" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span>ЖДУ ім. Івана Франка</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .home-page {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .hero-banner {
          position: relative;
          background: 
            linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 138, 0.82) 55%, rgba(15, 23, 42, 0.90) 100%),
            url('/images/college-hero.jpg');
          background-size: cover;
          background-position: center 35%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4.5rem 0 3.5rem;
          color: #ffffff;
        }

        [data-theme='dark'] .hero-banner {
          background: 
            linear-gradient(135deg, rgba(6, 10, 20, 0.94) 0%, rgba(15, 23, 42, 0.90) 55%, rgba(6, 10, 20, 0.95) 100%),
            url('/images/college-hero.jpg');
          background-size: cover;
          background-position: center 35%;
          border-bottom: 1px solid var(--border-color);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.14);
          color: #93c5fd;
          border: 1px solid rgba(147, 197, 253, 0.35);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }

        .hero-title {
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.25rem;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #e2e8f0;
          margin-bottom: 2rem;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-buttons {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-sm);
          font-size: 0.925rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: var(--primary);
          color: #ffffff !important;
          border: 1px solid var(--primary);
          box-shadow: 0 4px 14px rgba(29, 78, 216, 0.35);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(29, 78, 216, 0.45);
        }

        .btn-hero-glass {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff !important;
          border: 1px solid rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-hero-glass:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.45);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
        }

        .btn-outline {
          background: var(--bg-surface);
          color: var(--text-main);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-xs);
        }

        .btn-outline:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--bg-muted);
          transform: translateY(-1px);
        }

        .btn-whatsapp-channel {
          background: #25d366;
          color: #ffffff !important;
          border: 1px solid #25d366;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
        }

        .btn-whatsapp-channel:hover {
          background: #20ba59;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
        }

        .hero-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-card {
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(96, 165, 250, 0.45);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #60a5fa;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #e2e8f0;
          margin-top: 0.35rem;
          font-weight: 500;
        }

        /* Дошка оперативних оголошень */
        .notice-board-section {
          margin-top: -1.75rem;
          position: relative;
          z-index: 10;
        }

        .notice-board-card {
          background: var(--bg-surface);
          border-radius: var(--radius-lg);
          padding: 1.5rem 1.85rem;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 2px solid rgba(37, 99, 235, 0.3);
          transition: all var(--transition-base, 0.2s);
        }

        .notice-type-info .notice-board-card {
          border-color: rgba(37, 99, 235, 0.35);
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.1), var(--shadow-md);
        }

        .notice-type-warning .notice-board-card {
          border-color: rgba(217, 119, 6, 0.4);
          box-shadow: 0 10px 25px -5px rgba(217, 119, 6, 0.12), var(--shadow-md);
        }

        .notice-type-urgent .notice-board-card {
          border-color: rgba(220, 38, 38, 0.45);
          box-shadow: 0 10px 25px -5px rgba(220, 38, 38, 0.15), var(--shadow-md);
        }

        [data-theme='dark'] .notice-board-card {
          background: var(--bg-surface);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
        }

        .notice-board-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .notice-live-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-amber);
          font-size: 0.825rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .notice-type-urgent .notice-live-tag {
          color: #ef4444;
        }

        .notice-type-info .notice-live-tag {
          color: var(--primary);
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: currentColor;
          border-radius: 50%;
          display: inline-block;
          animation: pulseDot 1.8s infinite;
        }

        @keyframes pulseDot {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.8;
          }
        }

        .notice-dates-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--bg-muted);
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.8rem;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
        }

        .notice-board-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .notice-board-text {
          font-size: 0.975rem;
          color: var(--text-muted);
          line-height: 1.6;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .notice-board-text p {
          margin: 0;
        }

        .notice-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 0.85rem;
        }

        .home-section {
          padding: 1rem 0;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-main, #0f172a);
          margin-bottom: 0.35rem;
        }

        .section-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted, #64748b);
          margin: 0;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #2563eb;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .news-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
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

        .news-card-image-link {
          display: block;
          text-decoration: none;
        }

        .news-card-body {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .news-card-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted, #64748b);
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .news-card-title {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 0;
        }

        .news-card-title a {
          color: var(--text-main, #0f172a);
          text-decoration: none;
        }

        .news-card-title a:hover {
          color: #2563eb;
        }

        .media-tiles-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.5rem;
        }

        .media-video-card {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .card-top-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #2563eb;
          margin-bottom: 0.75rem;
        }

        .card-top-title h3 {
          margin: 0;
          font-size: 1.1rem;
          color: var(--text-main, #0f172a);
        }

        .video-player-box {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          margin-bottom: 0.75rem;
          aspect-ratio: 16 / 9;
        }

        .video-player-box iframe,
        .video-player-box video {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }

        .video-desc {
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          margin: 0;
          line-height: 1.4;
        }

        .quick-tiles-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .promo-tile {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          flex: 1;
          display: block;
          min-height: 180px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .promo-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }

        .promo-tile:hover img {
          transform: scale(1.05);
        }

        .promo-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 70%, transparent 100%);
          color: #ffffff;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        .promo-tile-overlay h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .promo-tile-overlay span {
          font-size: 0.8rem;
          color: #e2e8f0;
        }

        .promo-tile.memorial .promo-tile-overlay {
          background: linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.3) 100%);
        }

        .bells-box {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 2rem;
        }

        .bells-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .bells-title {
          margin: 0 0 0.25rem 0;
          font-size: 1.35rem;
          font-weight: 800;
        }

        .bells-sub {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
        }

        .bells-tabs {
          display: flex;
          background: var(--bg-muted, #f1f5f9);
          border-radius: 8px;
          padding: 0.25rem;
        }

        .tab-btn {
          border: none;
          background: transparent;
          padding: 0.45rem 1rem;
          font-size: 0.825rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted, #64748b);
          transition: all 0.15s;
        }

        .tab-btn.active {
          background: var(--bg-surface, #ffffff);
          color: #2563eb;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .bells-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .bell-card {
          background: var(--bg-muted, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .bell-num {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-muted, #64748b);
          text-transform: uppercase;
        }

        .bell-time {
          font-size: 1.25rem;
          font-weight: 800;
          color: #2563eb;
        }

        .bell-break {
          font-size: 0.775rem;
          color: var(--text-muted, #64748b);
        }

        .bell-break.highlight {
          color: #ea580c;
          font-weight: 600;
        }

        .bells-footer {
          display: flex;
          justify-content: flex-end;
        }

        .partners-sec {
          text-align: center;
        }

        .partners-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .partners-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          margin-bottom: 2rem;
        }

        .partners-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          align-items: center;
        }

        .partner-item {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 10px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: var(--text-main, #1e293b);
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .partner-item:hover {
          transform: translateY(-3px);
          border-color: #2563eb;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .partner-item img {
          max-height: 60px;
          max-width: 100px;
          object-fit: contain;
        }

        @media (max-width: 900px) {
          .hero-container, .media-tiles-grid {
            grid-template-columns: 1fr;
          }
          .hero-title {
            font-size: 1.85rem;
          }
          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }
          .stat-card {
            padding: 0.9rem 0.65rem;
            text-align: center;
          }
          .stat-number {
            font-size: 1.6rem;
          }
          .stat-label {
            font-size: 0.85rem;
            line-height: 1.25;
          }
        }

        @media (max-width: 640px) {
          .hero-banner {
            padding: 2.25rem 0 1.75rem;
          }
          .hero-badge {
            font-size: 0.75rem;
            padding: 0.25rem 0.65rem;
          }
          .hero-title {
            font-size: 1.55rem;
            line-height: 1.25;
            margin-bottom: 0.75rem;
          }
          .hero-desc {
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 1.25rem;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            gap: 0.65rem;
          }
          .hero-buttons .btn {
            width: 100%;
            justify-content: center;
          }
          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          .stat-card {
            padding: 0.75rem 0.4rem;
            text-align: center;
          }
          .stat-number {
            font-size: 1.35rem;
          }
          .stat-label {
            font-size: 0.8125rem;
            line-height: 1.2;
          }
          .notice-board-card {
            padding: 1.15rem 1rem;
          }
          .notice-board-title {
            font-size: 1.2rem;
          }
          .notice-actions-row {
            flex-direction: column;
            align-items: stretch;
          }
          .notice-actions-row .btn {
            width: 100%;
            justify-content: center;
          }
          .section-head {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .section-title {
            font-size: 1.4rem;
          }
          .news-cards-grid {
            grid-template-columns: 1fr;
          }
          .bells-tabs {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.4rem;
            -webkit-overflow-scrolling: touch;
          }
          .bells-tab-btn {
            white-space: nowrap;
          }
          .bells-table-card {
            padding: 1rem;
          }
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
