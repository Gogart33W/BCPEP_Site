import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, ExternalLink, Award, CheckCircle2, 
  ChevronDown, BookOpen, Clock, Phone, Mail, 
  ArrowRight, ShieldCheck, GraduationCap, MapPin, 
  Sparkles, DollarSign, ListChecks
} from 'lucide-react';
import { fetchNews } from '../api/client';

export default function AdmissionsHubPage() {
  const [news, setNews] = useState([]);
  const [activeExam, setActiveExam] = useState(null);

  useEffect(() => {
    fetchNews({ per: 3, q: 'вступ' }).then(res => {
      setNews(res.items || []);
    });
  }, []);

  const importantLinks = [
    {
      title: 'Правила прийому 2026',
      desc: 'Офіційні умови вступу на основі 9 та 11 класів',
      icon: '📜',
      url: 'https://drive.google.com/file/d/1YV93nABG9_QESeYh4bS3n-g9OlZ04sW_/view?usp=sharing',
      isExternal: true,
      badge: 'Офіційно'
    },
    {
      title: 'Ліцензований обсяг',
      desc: 'Державне замовлення та ліцензії в реєстрі ЄДЕБО',
      icon: '🏛️',
      url: 'https://registry.edbo.gov.ua/university/461/specialities-before',
      isExternal: true,
      badge: 'МОН України'
    },
    {
      title: 'Вартість навчання',
      desc: 'Тарифи та помісячна оплата на 2026/2027 н.р.',
      icon: '💰',
      url: '/abituriyentu/vartist-navchannya',
      isExternal: false,
      badge: 'Калькулятор'
    },
    {
      title: 'Зразки завдань співбесіди',
      desc: 'Питання та критерії індивідуальної усної співбесіди',
      icon: '✍️',
      url: '/abituriyentu/vstup/zrazky-zavdan-dlya-indyvidualnoyi-usnoyi-spivbesidy',
      isExternal: false,
      badge: 'Підготовка'
    },
    {
      title: 'Перелік документів',
      desc: 'Необхідний пакет паперів для подання заяви',
      icon: '📁',
      url: '/abituriyentu/vstup/perelik-dokumentiv',
      isExternal: false,
      badge: 'Інструкція'
    },
    {
      title: 'Рейтингові списки',
      desc: 'Офіційні рейтинги вступників та рекомендації',
      icon: '📊',
      url: 'https://drive.google.com/drive/folders/1fnOnMleDhcGnA2H14oiYpuwANnuSysnS?usp=sharing',
      isExternal: true,
      badge: 'Google Drive'
    },
    {
      title: 'Результати випробувань',
      desc: 'Відомості оцінок вступних випробувань',
      icon: '🏆',
      url: 'https://drive.google.com/drive/folders/1JRGe0n3FNM5llzDIecZh6eYl5hjZoPq-?usp=sharing',
      isExternal: true,
      badge: 'Google Drive'
    },
    {
      title: 'Накази про зарахування',
      desc: 'Офіційні накази директора про зарахування',
      icon: '✅',
      url: 'https://drive.google.com/drive/folders/1qKvXd3LX0t_X8QH8_TXJModdwTEGZVhp?usp=drive_link',
      isExternal: true,
      badge: 'Накази'
    },
    {
      title: 'Протоколи комісії',
      desc: 'Засідання Приймальної комісії коледжу',
      icon: '📋',
      url: 'https://drive.google.com/drive/folders/1UfRurMekL7yMBIS1hV0pb8_un9P2yHCz?usp=sharing',
      isExternal: true,
      badge: 'Протоколи'
    }
  ];

  const examPrograms = [
    {
      title: 'Співбесіда з Української мови — БЗСО (9 класів)',
      url: 'https://drive.google.com/file/d/1NzCb3I_cJtzXChNGt97XmlY4cvZaApv9/view?usp=sharing',
      base: 'Базова середня освіта'
    },
    {
      title: 'Співбесіда з Української мови — ПЗСО (11 класів)',
      url: 'https://drive.google.com/file/d/1AUOQuxURn120IkWgTjnT30g7bUAIVaeh/view?usp=sharing',
      base: 'Повна загальна середня освіта'
    },
    {
      title: 'Співбесіда з Математики — БЗСО (9 класів)',
      url: 'https://drive.google.com/file/d/10E1OzlVe3c7wvK__FCUYgVcqJwD4Vo7Z/view?usp=sharing',
      base: 'Базова середня освіта'
    },
    {
      title: 'Співбесіда з Математики — ПЗСО (11 класів)',
      url: 'https://drive.google.com/file/d/1hQZOR_bBT64OY3w7OMhU1sB8S9oo-ny5/view?usp=sharing',
      base: 'Повна загальна середня освіта'
    },
    {
      title: 'Співбесіда з Історії України — БЗСО (9 класів)',
      url: 'https://drive.google.com/file/d/1aEROnroHhje6X3LNTSnRmggZ3RNywckF/view?usp=sharing',
      base: 'Базова середня освіта'
    },
    {
      title: 'Співбесіда з Історії України — ПЗСО (11 класів)',
      url: 'https://drive.google.com/file/d/13XvYRg-QpWRwZvdCdfSTW0fkxthWVvZq/view?usp=sharing',
      base: 'Повна загальна середня освіта'
    },
    {
      title: 'Творчий конкурс — А7 Фізична культура і спорт',
      url: 'https://drive.google.com/file/d/1ZAFKuGtQsXUp879Pxjiubnd6O-ksF8uO/view?usp=sharing',
      base: 'Нормативи та критерії оцінювання'
    }
  ];

  return (
    <div className="admissions-hub container">
      {/* Головний банер Вступника */}
      <section className="admissions-hero">
        <div className="admissions-hero-badge">
          <Sparkles size={14} />
          <span>Вступна кампанія 2026</span>
        </div>
        <h1 className="admissions-hero-title">
          ВСТУП <span className="year-highlight">2026</span>
        </h1>
        <p className="admissions-hero-subtitle">
          Бердичівський фаховий коледж промисловості, економіки та права — твій впевнений крок до затребуваної професії та успішної кар'єри.
        </p>

        <div className="admissions-cta-row">
          <a 
            href="https://vstup.edbo.gov.ua/" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-primary btn-lg"
          >
            <GraduationCap size={18} />
            <span>Електронний кабінет вступника (ЄДЕБО)</span>
            <ExternalLink size={15} />
          </a>
          <a href="#important-links" className="btn btn-outline btn-lg">
            <ListChecks size={18} />
            <span>Документи та правила</span>
          </a>
        </div>
      </section>

      {/* Панель ключових показників коледжу */}
      <section className="admissions-stats-strip">
        <div className="stat-pill">
          <span className="stat-pill-num">8+</span>
          <span className="stat-pill-lbl">Акредитованих спеціальностей</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">120+</span>
          <span className="stat-pill-lbl">Років освітнього досвіду</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">750+</span>
          <span className="stat-pill-lbl">Студентів коледжу</span>
        </div>
        <div className="stat-pill">
          <span className="stat-pill-num">100%</span>
          <span className="stat-pill-lbl">Забезпечення гуртожитком</span>
        </div>
      </section>

      {/* Блок важливих посилань (Замість старого потворного списку) */}
      <section id="important-links" className="important-links-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Важливі посилання для вступу</h2>
            <p className="section-subtitle">Усе необхідне для вступника 2026 року в одному місці</p>
          </div>
          <Link to="/abituriyentu/vartist-navchannya" className="cost-calc-link">
            <DollarSign size={16} />
            <span>Калькулятор вартості навчання →</span>
          </Link>
        </div>

        <div className="links-cards-grid">
          {importantLinks.map((item, idx) => {
            const CardTag = item.isExternal ? 'a' : Link;
            const linkProps = item.isExternal 
              ? { href: item.url, target: '_blank', rel: 'noreferrer' }
              : { to: item.url };

            return (
              <CardTag key={idx} {...linkProps} className="link-card-box">
                <div className="card-top-row">
                  <span className="card-emoji-icon">{item.icon}</span>
                  <span className="card-badge">{item.badge}</span>
                </div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-action">
                  <span>Перейти</span>
                  {item.isExternal ? <ExternalLink size={13} /> : <ArrowRight size={14} />}
                </div>
              </CardTag>
            );
          })}
        </div>
      </section>

      {/* Програми вступних випробувань */}
      <section className="exam-programs-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Програми вступних випробувань</h2>
            <p className="section-subtitle">Офіційні програми співбесід та творчого конкурсу, затверджені Приймальною комісією</p>
          </div>
        </div>

        <div className="programs-list">
          {examPrograms.map((prog, idx) => (
            <div key={idx} className="program-item-card">
              <div className="prog-info">
                <BookOpen size={20} className="prog-icon" />
                <div>
                  <h4 className="prog-title">{prog.title}</h4>
                  <span className="prog-base">{prog.base}</span>
                </div>
              </div>
              <a 
                href={prog.url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-outline btn-sm"
              >
                <FileText size={14} />
                <span>Завантажити програму (PDF)</span>
                <ExternalLink size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Новини для абітурієнтів */}
      {news.length > 0 && (
        <section className="admissions-news-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Новини для абітурієнтів</h2>
              <p className="section-subtitle">Актуальні роз'яснення, дні відкритих дверей та перебіг вступної кампанії</p>
            </div>
            <Link to="/novyny" className="view-more-link">
              <span>Усі новини коледжу →</span>
            </Link>
          </div>

          <div className="admissions-news-grid">
            {news.map(post => (
              <article key={post.slug} className="news-item-card">
                <Link to={`/${post.slug}`} className="news-img-wrap">
                  {post.image ? (
                    <img src={post.image} alt={post.title} loading="lazy" />
                  ) : (
                    <div className="news-img-fallback"><BookOpen size={28} /></div>
                  )}
                </Link>
                <div className="news-item-body">
                  <div className="news-item-date">
                    <Clock size={12} />
                    <span>{post.date ? new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Нещодавно'}</span>
                  </div>
                  <h4 className="news-item-title">
                    <Link to={`/${post.slug}`}>{post.title}</Link>
                  </h4>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Гаряча лінія Приймальної комісії */}
      <section className="admissions-contacts-banner">
        <div className="hotline-card">
          <div className="hotline-icon-wrap">
            <Phone size={28} />
          </div>
          <div className="hotline-text">
            <h3>Залишилися запитання щодо вступу?</h3>
            <p>Консультанти Приймальної комісії ВСП «БФКПЕП» допоможуть вам із формуванням заяв та роз'яснять усі деталі.</p>
          </div>
          <div className="hotline-actions">
            <a href="tel:+380966668645" className="hotline-phone-btn">
              <Phone size={16} />
              <span>+380 (96) 666-86-45</span>
            </a>
            <a href="mailto:vstup@bcpep.org.ua" className="hotline-email-btn">
              <Mail size={16} />
              <span>vstup@bcpep.org.ua</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .admissions-hub {
          padding: 2.5rem 1rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        /* Hero */
        .admissions-hero {
          text-align: center;
          padding: 3.5rem 1.5rem;
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-muted) 100%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .admissions-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--primary-subtle);
          color: var(--primary);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.825rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          border: 1px solid rgba(37, 99, 235, 0.2);
        }

        .admissions-hero-title {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: var(--text-main);
          line-height: 1.15;
        }

        .year-highlight {
          color: var(--primary);
          position: relative;
        }

        .admissions-hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 680px;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .admissions-cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Stats strip */
        .admissions-stats-strip {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .stat-pill {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xs);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-pill:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-pill-num {
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1.1;
        }

        .stat-pill-lbl {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
          font-weight: 600;
        }

        /* Headers */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .section-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin: 0;
        }

        .cost-calc-link, .view-more-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.9rem;
        }

        /* Links Grid */
        .links-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.25rem;
        }

        .link-card-box {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-xs);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none !important;
          color: inherit;
        }

        .link-card-box:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: var(--shadow-lg);
        }

        .card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .card-emoji-icon {
          font-size: 1.8rem;
          line-height: 1;
        }

        .card-badge {
          background: var(--bg-muted);
          color: var(--text-muted);
          font-size: 0.725rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-main);
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin-bottom: 1.25rem;
          flex: 1;
        }

        .card-action {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--primary);
        }

        /* Exam programs */
        .programs-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .program-item-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          transition: border-color 0.15s;
        }

        .program-item-card:hover {
          border-color: var(--primary);
        }

        .prog-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .prog-icon {
          color: var(--primary);
          flex-shrink: 0;
        }

        .prog-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0 0 0.2rem 0;
          color: var(--text-main);
        }

        .prog-base {
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        /* Admissions News */
        .admissions-news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .news-item-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .news-item-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .news-img-wrap {
          height: 180px;
          display: block;
          overflow: hidden;
          background: var(--bg-muted);
        }

        .news-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .news-item-card:hover .news-img-wrap img {
          transform: scale(1.04);
        }

        .news-img-fallback {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-subtle);
        }

        .news-item-body {
          padding: 1.25rem;
          flex: 1;
        }

        .news-item-date {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }

        .news-item-title {
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.4;
          margin: 0;
        }

        .news-item-title a {
          color: var(--text-main);
          text-decoration: none;
        }

        .news-item-title a:hover {
          color: var(--primary);
        }

        /* Hotline Banner */
        .admissions-contacts-banner {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }

        .hotline-card {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex-wrap: wrap;
        }

        .hotline-icon-wrap {
          width: 58px;
          height: 58px;
          background: var(--primary-subtle);
          color: var(--primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hotline-text {
          flex: 1;
          min-width: 260px;
        }

        .hotline-text h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin-bottom: 0.35rem;
        }

        .hotline-text p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        .hotline-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .hotline-phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--primary);
          color: #ffffff !important;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 0.7rem 1.25rem;
          border-radius: var(--radius-sm);
          text-decoration: none !important;
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.25);
        }

        .hotline-phone-btn:hover {
          background: var(--primary-hover);
        }

        .hotline-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-muted);
          color: var(--text-main) !important;
          border: 1px solid var(--border-color);
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.7rem 1.25rem;
          border-radius: var(--radius-sm);
          text-decoration: none !important;
        }

        .hotline-email-btn:hover {
          border-color: var(--primary);
          color: var(--primary) !important;
        }

        @media (max-width: 768px) {
          .admissions-hub {
            padding-top: 1rem;
            padding-bottom: 3rem;
          }

          .admissions-hero {
            padding: 2rem 1rem 1.75rem;
            margin-bottom: 1.5rem;
          }

          .admissions-hero-badge {
            font-size: 0.775rem;
            padding: 0.25rem 0.65rem;
            margin-bottom: 0.75rem;
          }

          .admissions-hero-title {
            font-size: 1.85rem;
            line-height: 1.2;
            margin-bottom: 0.75rem;
          }

          .admissions-hero-subtitle {
            font-size: 0.875rem;
            line-height: 1.5;
            margin-bottom: 1.35rem;
          }

          .admissions-cta-row {
            flex-direction: column;
            width: 100%;
            gap: 0.65rem;
          }

          .admissions-cta-row .btn {
            width: 100%;
            justify-content: center;
            font-size: 0.9rem;
            padding: 0.75rem 1rem;
            white-space: normal;
            text-align: center;
          }

          .admissions-stats-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.65rem;
            margin-bottom: 2rem;
          }

          .stat-pill {
            padding: 0.85rem 0.75rem;
          }

          .stat-pill-num {
            font-size: 1.5rem;
          }

          .stat-pill-lbl {
            font-size: 0.725rem;
            margin-top: 0.2rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .links-cards-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }

          .link-card-box {
            padding: 1.15rem;
          }

          .hotline-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .hotline-actions {
            width: 100%;
            flex-direction: column;
          }

          .hotline-phone-btn, .hotline-email-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
