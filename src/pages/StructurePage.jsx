import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, ChevronDown, Search, GitBranch, 
  Layers, Users, Shield, Award, 
  Maximize2, Minimize2, Building2, 
  GraduationCap, HeartHandshake, Wrench, FileText
} from 'lucide-react';

// Повна офіційна структура коледжу
const COLLEGE_STRUCTURE = {
  id: 'director',
  title: 'ДИРЕКТОР КОЛЕДЖУ',
  subtitle: 'Керівник закладу вищої / фахової передвищої освіти',
  type: 'director',
  color: '#2563eb',
  icon: Award,
  children: [
    {
      id: 'deputy-edu',
      title: 'Заступник директора з навчальної роботи',
      subtitle: 'Організація навчального процесу та академічна якість',
      type: 'deputy',
      color: '#0284c7',
      icon: GraduationCap,
      children: [
        {
          id: 'day-dept',
          title: 'Денне відділення',
          subtitle: 'Академічні групи денної форми здобуття освіти',
          type: 'department',
          children: [
            { id: 'heads-day', title: 'Завідувачі відділень за спеціальностями' },
            { 
              id: 'nmk', 
              title: 'Навчально-методичний кабінет', 
              children: [
                { id: 'methodist', title: 'Методист коледжу' },
                { id: 'secretary-nmk', title: 'Секретар НМК' }
              ]
            },
            { 
              id: 'edu-part', 
              title: 'Навчальна частина', 
              children: [
                { id: 'head-chancery', title: 'Завідувач канцелярією' },
                { id: 'secretaries-edu', title: 'Секретарі навчальної частини' },
                { id: 'laborants-edu', title: 'Лаборанти комп’ютерних комплексів' }
              ]
            }
          ]
        },
        {
          id: 'extramural-dept',
          title: 'Заочне відділення',
          subtitle: 'Навчання студентів без відриву від виробництва',
          type: 'department',
          children: [
            { id: 'head-extramural', title: 'Завідувач заочного відділення' },
            { id: 'secretary-extramural', title: 'Секретар заочного відділення' }
          ]
        },
        {
          id: 'library-dept',
          title: 'Бібліотечно-інформаційний центр',
          subtitle: 'Фонд підручників, наукових видань та електронна бібліотека',
          type: 'department',
          children: [
            { id: 'head-library', title: 'Завідувач бібліотеки' },
            { id: 'librarian', title: 'Бібліотекар' }
          ]
        },
        {
          id: 'commissions-dept',
          title: 'Циклові комісії коледжу',
          subtitle: '7 предметних та фахових викладацьких об’єднань',
          type: 'department',
          children: [
            { id: 'comm-heads', title: 'Голови циклових комісій' },
            { id: 'teachers', title: 'Викладачі вищої та базової категорії' },
            { id: 'comm-laborants', title: 'Лаборанти кафедр та кабінетів' }
          ]
        }
      ]
    },
    {
      id: 'deputy-upbring',
      title: 'Заступник директора з виховної роботи',
      subtitle: 'Студентське самоврядування, дозвілля, спорт та соціальний захист',
      type: 'deputy',
      color: '#059669',
      icon: HeartHandshake,
      children: [
        {
          id: 'dorm-dept',
          title: 'Студентський гуртожиток',
          subtitle: 'Комфортне проживання 100% іногородніх студентів',
          type: 'department',
          children: [
            { id: 'head-dorm', title: 'Завідувач гуртожитку' },
            { id: 'dorm-educator', title: 'Вихователь вищої категорії' },
            { id: 'dorm-staff', title: 'Обслуговуючий персонал, чергові та коменданти' }
          ]
        },
        {
          id: 'psych-dept',
          title: 'Соціально-психологічна служба',
          subtitle: 'Психологічна підтримка та ментальне здоров’я',
          type: 'department',
          children: [
            { id: 'psychologist', title: 'Практичний психолог' },
            { id: 'social-pedagogue', title: 'Культорганізатор та керівники гуртків' }
          ]
        },
        {
          id: 'med-dept',
          title: 'Медичний пункт коледжу',
          subtitle: 'Первинна медична допомога та профілактичні огляди',
          type: 'department',
          children: [
            { id: 'med-sister', title: 'Сестра медична вищої категорії' }
          ]
        },
        {
          id: 'canteen-dept',
          title: 'Їдальня та студентський буфет',
          subtitle: 'Гаряче харчування студентів та працівників',
          type: 'department',
          children: [
            { id: 'head-canteen', title: 'Завідувач виробництва / їдальні' },
            { id: 'cooks', title: 'Кухарі, буфетники та технічний персонал' }
          ]
        }
      ]
    },
    {
      id: 'deputy-practice',
      title: 'Заступник директора з виробничого навчання',
      subtitle: 'Практична підготовка, бази практик та дуальна освіта',
      type: 'deputy',
      color: '#d97706',
      icon: Wrench,
      children: [
        {
          id: 'workshop-dept',
          title: 'Навчально-виробничі майстерні',
          subtitle: 'Механічна, слюсарна, зварювальна та електромонтажна дільниці',
          type: 'department',
          children: [
            { id: 'head-workshop', title: 'Завідувач навчально-виробничих майстерень' },
            { id: 'masters', title: 'Майстри виробничого навчання' },
            { id: 'mechanics', title: 'Механіки та техніки обладнання' }
          ]
        },
        {
          id: 'bases-dept',
          title: 'Бази практик та зв’язки з роботодавцями',
          subtitle: 'Співпраця з провідними підприємствами та IT-компаніями регіону',
          type: 'department',
          children: [
            { id: 'practice-supervisors', title: 'Керівники навчальних та технологічних практик' }
          ]
        }
      ]
    },
    {
      id: 'deputy-admin',
      title: 'Заступник директора з АГР',
      subtitle: 'Адміністративно-господарська частина та матеріальна база',
      type: 'deputy',
      color: '#475569',
      icon: Building2,
      children: [
        {
          id: 'facilities-dept',
          title: 'Господарська служба та корпуси',
          subtitle: 'Експлуатація навчальних корпусів та прилеглої території',
          type: 'department',
          children: [
            { id: 'head-facilities', title: 'Комендант навчальних корпусів' },
            { id: 'electrician', title: 'Електромеханіки та сантехніки' },
            { id: 'cleaning-staff', title: 'Служба технічного прибирання' },
            { id: 'security', title: 'Охорона та сторожова служба' }
          ]
        },
        {
          id: 'heating-dept',
          title: 'Автономна котельня коледжу',
          subtitle: 'Забезпечення автономного теплопостачання в осінньо-зимовий період',
          type: 'department',
          children: [
            { id: 'boiler-operators', title: 'Оператори котельного обладнання' }
          ]
        }
      ]
    },
    {
      id: 'direct-services',
      title: 'Служби прямого підпорядкування',
      subtitle: 'Фінансові, правові, кадрові та безпекові підрозділи коледжу',
      type: 'deputy',
      color: '#7c3aed',
      icon: Shield,
      children: [
        {
          id: 'accounting-dept',
          title: 'Бухгалтерська служба',
          subtitle: 'Фінансовий облік, нарахування стипендій та заробітної плати',
          type: 'department',
          children: [
            { id: 'chief-accountant', title: 'Головний бухгалтер' },
            { id: 'accountants', title: 'Бухгалтери з обліку стипендіального та бюджетного фонду' }
          ]
        },
        {
          id: 'hr-dept',
          title: 'Відділ кадрів',
          subtitle: 'Кадровий облік співробітників та особові справи студентів',
          type: 'department',
          children: [
            { id: 'head-hr', title: 'Начальник відділу кадрів' },
            { id: 'inspector-hr', title: 'Інспектор з обліку кадрів' }
          ]
        },
        {
          id: 'legal-safety',
          title: 'Правова та безпекова служба',
          subtitle: 'Дотримання законодавства, захист прав та безпека життєдіяльності',
          type: 'department',
          children: [
            { id: 'lawyer', title: 'Юрисконсульт коледжу' },
            { id: 'procurement', title: 'Уповноважена особа з публічних закупівель' },
            { id: 'safety-engineer', title: 'Інженер з охорони праці та цивільного захисту' }
          ]
        }
      ]
    }
  ]
};

export default function StructurePage() {
  const [viewMode, setViewMode] = useState('tree'); // 'tree' | 'accordion'
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({
    'director': true,
    'deputy-edu': true,
    'deputy-upbring': true,
    'deputy-practice': true,
    'deputy-admin': true,
    'direct-services': true
  });

  const toggleNode = (id) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = {};
    const traverse = (node) => {
      all[node.id] = true;
      if (node.children) node.children.forEach(traverse);
    };
    traverse(COLLEGE_STRUCTURE);
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes({ 'director': true });
  };

  return (
    <div className="structure-page container">
      {/* Хлібні крихти */}
      <nav className="breadcrumbs-nav">
        <Link to="/">Головна</Link>
        <ChevronRight size={13} className="bc-sep" />
        <Link to="/pro-koledzh">Про коледж</Link>
        <ChevronRight size={13} className="bc-sep" />
        <span className="bc-current">Структура та органи управління</span>
      </nav>

      {/* Заголовок сторінки */}
      <header className="structure-header">
        <div className="header-badge">
          <Building2 size={15} />
          <span>Організаційна структура ВСП «БФКПЕП»</span>
        </div>
        <h1 className="structure-title">Структура та органи управління коледжу</h1>
        <p className="structure-subtitle">
          Офіційна ієрархія, підпорядкування відділень, циклових комісій, навчальних та господарських підрозділів закладу освіти.
        </p>

        {/* Панель інструментів управління видом та пошуком */}
        <div className="structure-toolbar">
          <div className="search-box-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Пошук посади чи підрозділу (напр. бухгалтер, майстер, заступник)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          <div className="toolbar-actions">
            <div className="view-mode-toggle">
              <button 
                className={`mode-btn ${viewMode === 'tree' ? 'active' : ''}`}
                onClick={() => setViewMode('tree')}
              >
                <GitBranch size={15} />
                <span>Ієрархічна схема</span>
              </button>
              <button 
                className={`mode-btn ${viewMode === 'accordion' ? 'active' : ''}`}
                onClick={() => setViewMode('accordion')}
              >
                <Layers size={15} />
                <span>Картки підрозділів</span>
              </button>
            </div>

            <div className="expand-buttons">
              <button className="btn btn-outline btn-xs" onClick={expandAll} title="Розгорнути всі гілки">
                <Maximize2 size={13} />
                <span>Розгорнути</span>
              </button>
              <button className="btn btn-outline btn-xs" onClick={collapseAll} title="Згорнути до директора">
                <Minimize2 size={13} />
                <span>Згорнути</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ВІДОБРАЖЕННЯ 1: ІЄРАРХІЧНЕ ДЕРЕВО (SCHEMA VIEW) */}
      {viewMode === 'tree' ? (
        <div className="structure-tree-view">
          {/* Вершина: Директор */}
          <div className="tree-root-box">
            <div className="node-card node-director">
              <div className="node-icon-wrap">
                <Award size={24} />
              </div>
              <div className="node-text">
                <span className="node-level-tag">Вищий орган управління</span>
                <h2 className="node-title">{COLLEGE_STRUCTURE.title}</h2>
                <p className="node-desc">{COLLEGE_STRUCTURE.subtitle}</p>
              </div>
            </div>
            <div className="tree-trunk-line"></div>
          </div>

          {/* Другий рівень: Заступники та служби */}
          <div className="tree-branches-grid">
            {COLLEGE_STRUCTURE.children.map((branch) => {
              const isExpanded = expandedNodes[branch.id];
              const BranchIcon = branch.icon || Users;

              return (
                <div key={branch.id} className="tree-branch-col">
                  {/* Головний вузол заступника */}
                  <div 
                    className={`node-card node-deputy ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleNode(branch.id)}
                    style={{ '--branch-color': branch.color }}
                  >
                    <div className="node-head">
                      <div className="branch-icon" style={{ background: `${branch.color}15`, color: branch.color }}>
                        <BranchIcon size={18} />
                      </div>
                      <ChevronDown size={16} className={`toggle-arrow ${isExpanded ? 'rotated' : ''}`} />
                    </div>

                    <h3 className="node-title branch-title">{branch.title}</h3>
                    <p className="node-desc branch-desc">{branch.subtitle}</p>

                    <div className="node-footer">
                      <span className="units-count">
                        {branch.children.length} основних підрозділи
                      </span>
                    </div>
                  </div>

                  {/* Дочірні підрозділи */}
                  {isExpanded && (
                    <div className="branch-children-list">
                      <div className="branch-connector-line" style={{ background: branch.color }}></div>

                      {branch.children.map((dept) => {
                        const isDeptExpanded = expandedNodes[dept.id] ?? true;
                        const hasSub = dept.children && dept.children.length > 0;

                        return (
                          <div key={dept.id} className="dept-node-box">
                            <div 
                              className={`dept-card ${hasSub ? 'clickable' : ''}`}
                              onClick={() => hasSub && toggleNode(dept.id)}
                            >
                              <div className="dept-card-header">
                                <h4 className="dept-title">{dept.title}</h4>
                                {hasSub && (
                                  <ChevronDown size={14} className={`dept-arrow ${isDeptExpanded ? 'rotated' : ''}`} />
                                )}
                              </div>
                              {dept.subtitle && <p className="dept-desc">{dept.subtitle}</p>}
                            </div>

                            {/* Фахівці та ланки нижчого рівня */}
                            {hasSub && isDeptExpanded && (
                              <div className="positions-list">
                                {dept.children.map((pos) => {
                                  const hasNested = pos.children && pos.children.length > 0;
                                  return (
                                    <div key={pos.id} className="pos-item-box">
                                      <div className="pos-item">
                                        <span className="pos-dot"></span>
                                        <span className="pos-text">{pos.title}</span>
                                      </div>
                                      {hasNested && (
                                        <div className="nested-pos-list">
                                          {pos.children.map((nested) => (
                                            <div key={nested.id} className="nested-pos-item">
                                              <span className="nested-arrow">↳</span>
                                              <span>{nested.title}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ВІДОБРАЖЕННЯ 2: КАРТКИ ПІДРОЗДІЛІВ (ACCORDION VIEW) */
        <div className="structure-accordion-view">
          {COLLEGE_STRUCTURE.children.map((deputy) => {
            const DeputyIcon = deputy.icon || Users;

            return (
              <section key={deputy.id} className="deputy-accordion-section">
                <div className="accordion-head" style={{ borderLeftColor: deputy.color }}>
                  <div className="head-info">
                    <div className="head-icon" style={{ background: `${deputy.color}15`, color: deputy.color }}>
                      <DeputyIcon size={22} />
                    </div>
                    <div>
                      <h2 className="deputy-head-title">{deputy.title}</h2>
                      <p className="deputy-head-desc">{deputy.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="dept-cards-grid">
                  {deputy.children.map((dept) => (
                    <article key={dept.id} className="dept-full-card">
                      <div className="card-top">
                        <span className="card-tag">Підрозділ коледжу</span>
                        <h3 className="card-title">{dept.title}</h3>
                        {dept.subtitle && <p className="card-desc">{dept.subtitle}</p>}
                      </div>

                      {dept.children && dept.children.length > 0 && (
                        <div className="card-positions">
                          <span className="positions-label">Штатні одиниці та посади:</span>
                          <ul className="positions-ul">
                            {dept.children.map((pos) => (
                              <li key={pos.id}>
                                <strong>{pos.title}</strong>
                                {pos.children && (
                                  <ul className="sub-positions-ul">
                                    {pos.children.map((sub) => (
                                      <li key={sub.id}>{sub.title}</li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Швидкі посилання на споріднені сторінки */}
      <footer className="structure-footer-links">
        <h3>Пов'язані розділи сайту</h3>
        <div className="footer-links-row">
          <Link to="/pro-koledzh/struktura/administracziya" className="footer-link-card">
            <Users size={16} />
            <div>
              <strong>Керівний склад коледжу</strong>
              <span>Біографії, контакти та години прийому</span>
            </div>
          </Link>

          <Link to="/pro-koledzh/struktura/czyklovi-komisiyi" className="footer-link-card">
            <GraduationCap size={16} />
            <div>
              <strong>Циклові комісії</strong>
              <span>Викладацький склад за напрямами підготовки</span>
            </div>
          </Link>

          <Link to="/pro-koledzh/istoriya-koledzhu" className="footer-link-card">
            <FileText size={16} />
            <div>
              <strong>Історія закладу</strong>
              <span>Етапи розвитку коледжу з 1903 року</span>
            </div>
          </Link>
        </div>
      </footer>

      <style>{`
        .structure-page {
          padding-top: 2rem;
          padding-bottom: 4.5rem;
          width: 100%;
          animation: fadeInPage 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInPage {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .breadcrumbs-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .breadcrumbs-nav a {
          color: var(--text-muted);
          text-decoration: none;
        }

        .breadcrumbs-nav a:hover {
          color: var(--primary);
        }

        .bc-sep {
          color: var(--border-color);
        }

        .bc-current {
          color: var(--text-main);
          font-weight: 600;
        }

        .structure-header {
          margin-bottom: 2.5rem;
        }

        .header-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--primary-subtle);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
        }

        .structure-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--text-main);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .structure-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          max-width: 820px;
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        /* Toolbar */
        .structure-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 0.85rem 1.25rem;
          box-shadow: var(--shadow-sm);
        }

        .search-box-wrap {
          position: relative;
          flex: 1;
          min-width: 280px;
          max-width: 480px;
        }

        .search-box-wrap .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-box-wrap input {
          width: 100%;
          padding: 0.55rem 2rem 0.55rem 2.4rem;
          background: var(--bg-base);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--text-main);
          transition: border-color var(--transition-fast);
        }

        .search-box-wrap input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-subtle);
        }

        .clear-btn {
          position: absolute;
          right: 0.65rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.1rem;
          cursor: pointer;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .view-mode-toggle {
          display: flex;
          background: var(--bg-base);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 3px;
        }

        .mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.825rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mode-btn.active {
          background: var(--bg-surface);
          color: var(--primary);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .expand-buttons {
          display: flex;
          gap: 0.4rem;
        }

        .btn-xs {
          padding: 0.35rem 0.65rem;
          font-size: 0.775rem;
        }

        /* ══════════════ SCHEMA TREE ══════════════ */
        .structure-tree-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1rem;
        }

        .tree-root-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 520px;
        }

        .node-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.5rem;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .node-director {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border: 2px solid var(--primary);
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--primary-subtle) 100%);
        }

        .node-director .node-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .node-level-tag {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--primary);
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 0.2rem;
        }

        .node-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
          line-height: 1.25;
        }

        .node-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0.3rem 0 0;
          line-height: 1.4;
        }

        .tree-trunk-line {
          width: 2px;
          height: 36px;
          background: var(--border-color);
          margin: 0 auto;
        }

        .tree-branches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.25rem;
          width: 100%;
        }

        .tree-branch-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .node-deputy {
          cursor: pointer;
          border-top: 4px solid var(--branch-color);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .node-deputy:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .node-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .branch-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toggle-arrow {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .toggle-arrow.rotated {
          transform: rotate(180deg);
        }

        .branch-title {
          font-size: 1.05rem;
        }

        .branch-desc {
          font-size: 0.8rem;
        }

        .node-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
          border-top: 1px dashed var(--border-color);
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .units-count {
          font-weight: 600;
        }

        /* Дочірні блоки гілки */
        .branch-children-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-left: 0.75rem;
          position: relative;
        }

        .branch-connector-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 12px;
          width: 2px;
          opacity: 0.35;
          border-radius: 2px;
        }

        .dept-node-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .dept-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          box-shadow: var(--shadow-xs);
          transition: all var(--transition-fast);
        }

        .dept-card.clickable {
          cursor: pointer;
        }

        .dept-card.clickable:hover {
          border-color: var(--primary);
          background: var(--primary-subtle);
        }

        .dept-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dept-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 0;
        }

        .dept-desc {
          font-size: 0.775rem;
          color: var(--text-muted);
          margin: 0.3rem 0 0;
          line-height: 1.35;
        }

        .dept-arrow {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .dept-arrow.rotated {
          transform: rotate(180deg);
        }

        .positions-list {
          padding-left: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.2rem;
        }

        .pos-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .pos-dot {
          width: 5px;
          height: 5px;
          background: var(--text-muted);
          border-radius: 50%;
          flex-shrink: 0;
        }

        .nested-pos-list {
          padding-left: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-top: 0.2rem;
        }

        .nested-pos-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        .nested-arrow {
          color: var(--primary);
          font-weight: 700;
        }

        /* ══════════════ ACCORDION VIEW ══════════════ */
        .structure-accordion-view {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .deputy-accordion-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .accordion-head {
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
          margin-bottom: 1.5rem;
        }

        .head-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .head-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .deputy-head-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
        }

        .deputy-head-desc {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin: 0.25rem 0 0;
        }

        .dept-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }

        .dept-full-card {
          background: var(--bg-base);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
        }

        .card-tag {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0.25rem 0 0.4rem;
        }

        .card-desc {
          font-size: 0.825rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        .card-positions {
          border-top: 1px dashed var(--border-color);
          padding-top: 0.85rem;
        }

        .positions-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .positions-ul {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.825rem;
          color: var(--text-main);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .sub-positions-ul {
          margin: 0.25rem 0 0;
          padding-left: 1rem;
          color: var(--text-muted);
          font-size: 0.775rem;
        }

        /* Footer */
        .structure-footer-links {
          margin-top: 3.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .structure-footer-links h3 {
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }

        .footer-links-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
        }

        .footer-link-card {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          text-decoration: none;
          color: var(--text-main);
          transition: all var(--transition-fast);
        }

        .footer-link-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .footer-link-card svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        .footer-link-card strong {
          display: block;
          font-size: 0.925rem;
          margin-bottom: 0.2rem;
        }

        .footer-link-card span {
          display: block;
          font-size: 0.775rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .structure-title {
            font-size: 1.7rem;
          }
          .structure-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box-wrap {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
