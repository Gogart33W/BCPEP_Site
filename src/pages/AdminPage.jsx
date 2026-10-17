import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Newspaper, Calendar, Users, Plus, 
  Trash2, LogOut, CheckCircle2, RefreshCw, Send, AlertCircle, Bell 
} from 'lucide-react';
import { fetchGroups, fetchSubstitutions, fetchAdminNotice, saveAdminNotice } from '../api/client';

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('bcpep_admin_token') || '');
  const [email, setEmail] = useState('admin@bcpep.org.ua');
  const [password, setPassword] = useState('admin');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('notice');
  const [toast, setToast] = useState('');

  // Заміни
  const [substitutions, setSubstitutions] = useState([]);
  const [rawText, setRawText] = useState('');
  const [newSub, setNewSub] = useState({
    date: new Date().toISOString().split('T')[0],
    group_name: '',
    pair: 1,
    subject: '',
    teacher: '',
    room: '',
    note: ''
  });

  // Новини
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Освіта та наука');
  const [newsContent, setNewsContent] = useState('');

  // Групи
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupSpec, setNewGroupSpec] = useState('');

  // Оголошення коледжу (Notice Board CMS)
  const [noticeData, setNoticeData] = useState({
    enabled: false,
    type: 'info',
    badge: 'Оголошення коледжу',
    title: '',
    text: '',
    dateInfo: '',
    actionText: '',
    actionUrl: ''
  });
  const [savingNotice, setSavingNotice] = useState(false);

  useEffect(() => {
    fetchGroups().then(setGroups);
    fetchSubstitutions().then(setSubstitutions);
    if (token) {
      fetchAdminNotice(token).then(n => {
        if (n) setNoticeData(prev => ({ ...prev, ...n }));
      });
    }
  }, [token]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Помилка авторизації');
      setToken(data.token);
      localStorage.setItem('bcpep_admin_token', data.token);
      showToast('Успішний вхід в панель керування');
    } catch (err) {
      setAuthError(err.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('bcpep_admin_token');
  };

  const handleAddSub = async (e) => {
    e.preventDefault();
    if (!newSub.group_name || !newSub.subject) return;

    try {
      const res = await fetch('/api/admin/substitutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify([newSub])
      });
      if (res.ok) {
        showToast('Заміну збережено в базі даних та REST API');
        setNewSub({ ...newSub, subject: '', teacher: '', room: '', note: '' });
        fetchSubstitutions().then(setSubstitutions);
      }
    } catch {
      showToast('Помилка збереження');
    }
  };

  const handleDeleteSub = async (id) => {
    try {
      const res = await fetch(`/api/admin/substitutions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSubstitutions(prev => prev.filter(s => s.id !== id));
        showToast('Заміну видалено');
      }
    } catch {
      showToast('Помилка видалення');
    }
  };

  const handleParseSubs = async () => {
    if (!rawText.trim()) return;
    const lines = rawText.split('\n');
    const today = new Date().toISOString().split('T')[0];
    const parsed = [];

    lines.forEach(l => {
      const m = l.match(/^([А-Яа-яA-Za-z0-9\-]+):\s*(\d+)\s*пара\s*-\s*(.+)/);
      if (m) {
        parsed.push({
          date: today,
          group_name: m[1].trim(),
          pair: parseInt(m[2], 10),
          subject: m[3].trim(),
          teacher: '',
          room: '',
          note: 'Автопарсинг диспетчера'
        });
      }
    });

    if (parsed.length === 0) {
      showToast('Не вдалося розпізнати формат. Використовуйте: Група: N пара - Предмет');
      return;
    }

    try {
      const res = await fetch('/api/admin/substitutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parsed)
      });
      if (res.ok) {
        showToast(`Опубліковано ${parsed.length} замін`);
        setRawText('');
        fetchSubstitutions().then(setSubstitutions);
      }
    } catch {
      showToast('Помилка відправки');
    }
  };

  const handlePublishNews = async (e) => {
    e.preventDefault();
    if (!newsTitle.trim()) return;

    try {
      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newsTitle,
          content: `<p>${newsContent.replace(/\n/g, '<br/>')}</p>`,
          categories: [newsCategory],
          date: new Date().toISOString()
        })
      });
      if (res.ok) {
        showToast('Новину опубліковано на сайті та в REST API');
        setNewsTitle('');
        setNewsContent('');
      }
    } catch {
      showToast('Помилка публікації новини');
    }
  };

  const handleAddGroup = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    try {
      const res = await fetch('/api/admin/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newGroupName.trim(),
          specialty: newGroupSpec.trim() || null
        })
      });
      if (res.ok) {
        showToast(`Групу ${newGroupName} створено`);
        setNewGroupName('');
        setNewGroupSpec('');
        fetchGroups().then(setGroups);
      }
    } catch {
      showToast('Помилка створення групи');
    }
  };

  const handleSaveNotice = async (e) => {
    if (e) e.preventDefault();
    setSavingNotice(true);
    try {
      await saveAdminNotice(token, noticeData);
      showToast(noticeData.enabled ? 'Оголошення збережено та опубліковано на головній!' : 'Оголошення збережено (статус: приховано)');
    } catch (err) {
      showToast(err.message || 'Помилка збереження');
    } finally {
      setSavingNotice(false);
    }
  };

  const handleToggleNoticeEnabled = async (enabled) => {
    const updated = { ...noticeData, enabled };
    setNoticeData(updated);
    setSavingNotice(true);
    try {
      await saveAdminNotice(token, updated);
      showToast(enabled ? 'Оголошення активовано на головній' : 'Оголошення вимкнено та приховано з сайту');
    } catch (err) {
      showToast(err.message || 'Помилка оновлення');
    } finally {
      setSavingNotice(false);
    }
  };

  if (!token) {
    return (
      <div className="admin-login-page container">
        <div className="login-card">
          <div className="login-badge">
            <ShieldCheck size={28} />
          </div>
          <h2>Панель адміністратора ВСП «БФКПЕП»</h2>
          <p className="login-sub">
            Вхід для навчальної частини, диспетчерської та адміністрації коледжу.
          </p>

          {authError && (
            <div className="auth-error-msg">
              <AlertCircle size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Корпоративна пошта</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Пароль</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Увійти в панель
            </button>
          </form>

          <div className="demo-hint">
            <span>🎓 Тестовий вхід для диплому: admin@bcpep.org.ua / admin</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page container">
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      <header className="admin-header">
        <div className="admin-title-box">
          <ShieldCheck size={24} className="adm-icon" />
          <div>
            <h1>CMS Панель керування сайтом</h1>
            <span className="adm-user">Авторизовано: admin@bcpep.org.ua</span>
          </div>
        </div>

        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
          <LogOut size={14} />
          <span>Вийти</span>
        </button>
      </header>

      {/* Навігація панелі */}
      <div className="admin-tabs">
        <button 
          className={`adm-tab ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          <Bell size={16} />
          <span>Важливе оголошення {noticeData.enabled ? '🟢' : '⚪'}</span>
        </button>

        <button 
          className={`adm-tab ${activeTab === 'subs' ? 'active' : ''}`}
          onClick={() => setActiveTab('subs')}
        >
          <Calendar size={16} />
          <span>Диспетчерська замін ({substitutions.length})</span>
        </button>

        <button 
          className={`adm-tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <Newspaper size={16} />
          <span>Публікація новин</span>
        </button>

        <button 
          className={`adm-tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          <Users size={16} />
          <span>Академічні групи ({groups.length})</span>
        </button>
      </div>

      <div className="admin-content-box">
        {/* Оголошення (Notice Board CMS) */}
        {activeTab === 'notice' && (
          <div className="tab-section">
            <div className="notice-header-row">
              <div>
                <h3>Оперативне оголошення на головній сторінці</h3>
                <p className="tab-desc">
                  Керування акцентним оголошенням сайту (навчальний формат, оперативні сповіщення, зміни).
                  Якщо вимкнено — плашка повністю прихована і не займає місця.
                </p>
              </div>

              <div className="notice-status-pill">
                {noticeData.enabled ? (
                  <span className="status-live">
                    <span className="live-dot-mini"></span>
                    Активно на головній
                  </span>
                ) : (
                  <span className="status-off">Приховано з сайту</span>
                )}
              </div>
            </div>

            <div className={`notice-state-banner ${noticeData.enabled ? 'is-active' : 'is-disabled'}`}>
              <div className="state-info">
                <strong>{noticeData.enabled ? '🟢 Оголошення ЗАРАЗ УВІМКНЕНО' : '⚪ Оголошення ВИМКНЕНО'}</strong>
                <span>
                  {noticeData.enabled 
                    ? 'Плашка показується відвідувачам сайту під головним банером.'
                    : 'Плашка повністю схована з сайту. Відвідувачі її не бачать.'}
                </span>
              </div>
              <button 
                type="button"
                className={`btn btn-sm ${noticeData.enabled ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => handleToggleNoticeEnabled(!noticeData.enabled)}
                disabled={savingNotice}
              >
                {noticeData.enabled ? 'Приховати з сайту' : 'Опублікувати на сайті'}
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="notice-cms-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Рівень важливості (колір картки)</label>
                  <select 
                    value={noticeData.type || 'info'}
                    onChange={e => setNoticeData({ ...noticeData, type: e.target.value })}
                  >
                    <option value="info">Інформаційне (синій акцент коледжу)</option>
                    <option value="warning">Важливе (янтарний акцент уваги)</option>
                    <option value="urgent">Термінове (червоний тривожний акцент)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Бейдж / Мітка зверху</label>
                  <input 
                    type="text" 
                    placeholder="Наприклад: ОГОЛОШЕННЯ КОЛЕДЖУ, ФОРМАТ НАВЧАННЯ"
                    value={noticeData.badge || ''}
                    onChange={e => setNoticeData({ ...noticeData, badge: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Термін дії або дата (необов'язково)</label>
                  <input 
                    type="text" 
                    placeholder="Наприклад: 19 – 23 жовтня 2026 року"
                    value={noticeData.dateInfo || ''}
                    onChange={e => setNoticeData({ ...noticeData, dateInfo: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Заголовок оголошення</label>
                  <input 
                    type="text" 
                    placeholder="Наприклад: Формат організації освітнього процесу"
                    value={noticeData.title || ''}
                    onChange={e => setNoticeData({ ...noticeData, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Текст оголошення</label>
                <textarea 
                  rows={4}
                  placeholder="Введіть текст повідомлення. Розподіл на абзаци або пункти..."
                  value={noticeData.text || ''}
                  onChange={e => setNoticeData({ ...noticeData, text: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Текст кнопки дії (необов'язково)</label>
                  <input 
                    type="text" 
                    placeholder="Наприклад: Переглянути розклад"
                    value={noticeData.actionText || ''}
                    onChange={e => setNoticeData({ ...noticeData, actionText: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Посилання кнопки (URL або внутрішній шлях)</label>
                  <input 
                    type="text" 
                    placeholder="Наприклад: /rozklad-zanyat/rozklad-zanyat"
                    value={noticeData.actionUrl || ''}
                    onChange={e => setNoticeData({ ...noticeData, actionUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="notice-form-actions">
                <button type="submit" className="btn btn-primary" disabled={savingNotice}>
                  <Send size={15} />
                  <span>{savingNotice ? 'Збереження...' : 'Зберегти зміни'}</span>
                </button>

                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  onClick={() => setNoticeData({
                    enabled: false,
                    type: 'info',
                    badge: 'ОГОЛОШЕННЯ КОЛЕДЖУ',
                    title: '',
                    text: '',
                    dateInfo: '',
                    actionText: '',
                    actionUrl: ''
                  })}
                >
                  <Trash2 size={14} />
                  <span>Очистити поля</span>
                </button>
              </div>
            </form>

            {/* Попередній перегляд наживо */}
            <div className="notice-preview-container">
              <h4 className="preview-heading">Попередній перегляд плашки на головній сторінці:</h4>
              {noticeData.title || noticeData.text ? (
                <div className={`preview-notice-card preview-type-${noticeData.type || 'info'}`}>
                  <div className="preview-top">
                    <div className="preview-badge">
                      <span className="live-dot-mini"></span>
                      <strong>{noticeData.badge || 'ОГОЛОШЕННЯ КОЛЕДЖУ'}</strong>
                    </div>
                    {noticeData.dateInfo && (
                      <span className="preview-date">{noticeData.dateInfo}</span>
                    )}
                  </div>
                  {noticeData.title && <h3 className="preview-title">{noticeData.title}</h3>}
                  {noticeData.text && (
                    <div className="preview-body">
                      {noticeData.text.split('\n').filter(Boolean).map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  )}
                  {noticeData.actionText && (
                    <div className="preview-btn-wrap">
                      <span className="btn btn-primary btn-sm">{noticeData.actionText} →</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="preview-empty">
                  Введіть заголовок або текст повідомлення вище, щоб побачити живий попередній перегляд.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Заміни */}
        {activeTab === 'subs' && (
          <div className="tab-section">
            <h3>Оперативне внесення та парсинг замін</h3>
            <p className="tab-desc">
              Внесені зміни одразу потрапляють на сторінку «Розклад занять» та у відкритий REST API шлюз для майбутнього Android-додатка.
            </p>

            <div className="parser-box">
              <h4>Швидкий парсер диспетчера</h4>
              <textarea 
                rows={3}
                placeholder="Введіть рядки замін, наприклад:&#10;П-422: 1 пара - Конструювання ПЗ (ауд. 308)&#10;Ю-352: 2 пара - Цивільне право"
                value={rawText}
                onChange={e => setRawText(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" onClick={handleParseSubs}>
                <RefreshCw size={14} />
                <span>Розпарсити та зберегти в базу</span>
              </button>
            </div>

            <div className="manual-sub-box">
              <h4>Додати заміну вручну:</h4>
              <form onSubmit={handleAddSub} className="sub-grid-form">
                <div>
                  <label>Дата</label>
                  <input type="date" value={newSub.date} onChange={e => setNewSub({ ...newSub, date: e.target.value })} required />
                </div>
                <div>
                  <label>Група</label>
                  <input type="text" placeholder="П-422" value={newSub.group_name} onChange={e => setNewSub({ ...newSub, group_name: e.target.value })} required />
                </div>
                <div>
                  <label>Пара</label>
                  <select value={newSub.pair} onChange={e => setNewSub({ ...newSub, pair: parseInt(e.target.value, 10) })}>
                    <option value={1}>1 пара (08:30)</option>
                    <option value={2}>2 пара (10:00)</option>
                    <option value={3}>3 пара (11:40)</option>
                    <option value={4}>4 пара (13:10)</option>
                  </select>
                </div>
                <div>
                  <label>Предмет</label>
                  <input type="text" placeholder="Архітектура ПЗ" value={newSub.subject} onChange={e => setNewSub({ ...newSub, subject: e.target.value })} required />
                </div>
                <div>
                  <label>Викладач</label>
                  <input type="text" placeholder="Пелихівський Л.О." value={newSub.teacher} onChange={e => setNewSub({ ...newSub, teacher: e.target.value })} />
                </div>
                <div>
                  <label>Аудиторія</label>
                  <input type="text" placeholder="ауд. 308" value={newSub.room} onChange={e => setNewSub({ ...newSub, room: e.target.value })} />
                </div>
                <div className="full-width">
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Plus size={15} />
                    <span>Зберегти заміну</span>
                  </button>
                </div>
              </form>
            </div>

            <h4>Опубліковані в системі заміни ({substitutions.length}):</h4>
            {substitutions.length === 0 ? (
              <p className="empty-hint">Наразі збережених замін немає.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Група</th>
                    <th>Пара</th>
                    <th>Предмет</th>
                    <th>Викладач</th>
                    <th>Аудиторія</th>
                    <th>Дія</th>
                  </tr>
                </thead>
                <tbody>
                  {substitutions.map(s => (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td><strong>{s.group_name}</strong></td>
                      <td>{s.pair} пара</td>
                      <td>{s.subject}</td>
                      <td>{s.teacher || '—'}</td>
                      <td>{s.room || '—'}</td>
                      <td>
                        <button className="del-btn" onClick={() => handleDeleteSub(s.id)} title="Видалити">
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Новини */}
        {activeTab === 'news' && (
          <div className="tab-section">
            <h3>Створення нової події чи наказу</h3>
            <p className="tab-desc">Опублікований запис негайно додається в стрічку новин сайту та видається через REST API.</p>

            <form onSubmit={handlePublishNews} className="news-form">
              <div className="form-group">
                <label>Заголовок публікації *</label>
                <input 
                  type="text" 
                  placeholder="Введіть заголовок..."
                  value={newsTitle}
                  onChange={e => setNewsTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Категорія</label>
                <select value={newsCategory} onChange={e => setNewsCategory(e.target.value)}>
                  <option value="Освіта та наука">Освіта та наука</option>
                  <option value="Культура">Культура</option>
                  <option value="Спорт">Спорт</option>
                  <option value="Вступнику">Вступнику</option>
                  <option value="Студенту">Студенту</option>
                  <option value="Психолог">Психолог</option>
                </select>
              </div>

              <div className="form-group">
                <label>Текст новини або повідомлення *</label>
                <textarea 
                  rows={6}
                  placeholder="Введіть текст публікації..."
                  value={newsContent}
                  onChange={e => setNewsContent(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={15} />
                <span>Опублікувати на сайті</span>
              </button>
            </form>
          </div>
        )}

        {/* Групи */}
        {activeTab === 'groups' && (
          <div className="tab-section">
            <h3>Реєстр академічних груп коледжу</h3>
            <p className="tab-desc">Групи використовуються для прив’язки щоденних замін та розкладу пар.</p>

            <form onSubmit={handleAddGroup} className="group-add-form">
              <input 
                type="text" 
                placeholder="Шифр групи, наприклад: П-422"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                required
              />
              <input 
                type="text" 
                placeholder="Спеціальність (необов’язково)"
                value={newGroupSpec}
                onChange={e => setNewGroupSpec(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Plus size={15} />
                <span>Додати групу</span>
              </button>
            </form>

            <div className="groups-list-grid">
              {groups.map(g => (
                <div key={g.name} className="group-chip">
                  <strong>{g.name}</strong>
                  {g.specialty && <span>{g.specialty}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-page {
          padding: 2.5rem 1rem 4rem;
          max-width: 1040px;
          margin: 0 auto;
          position: relative;
        }

        .admin-toast {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          background: #10b981;
          color: #ffffff;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 2000;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          padding-bottom: 1.25rem;
        }

        .admin-title-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .adm-icon {
          color: #2563eb;
        }

        .admin-title-box h1 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 800;
        }

        .adm-user {
          font-size: 0.8rem;
          color: var(--text-muted, #64748b);
        }

        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          padding-bottom: 0.5rem;
        }

        .adm-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          border: 1px solid transparent;
          background: transparent;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted, #64748b);
          cursor: pointer;
        }

        .adm-tab.active {
          background: var(--bg-surface, #ffffff);
          border-color: var(--border-color, #e2e8f0);
          color: #2563eb;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }

        .admin-content-box {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 1.75rem;
        }

        .tab-section h3 {
          margin: 0 0 0.35rem 0;
          font-size: 1.3rem;
        }

        .tab-desc {
          margin: 0 0 1.5rem 0;
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
        }

        .parser-box, .manual-sub-box {
          background: var(--bg-muted, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .parser-box h4, .manual-sub-box h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.95rem;
        }

        .parser-box textarea {
          width: 100%;
          border: 1px solid var(--border-color, #cbd5e1);
          border-radius: 6px;
          padding: 0.65rem;
          font-size: 0.85rem;
          font-family: monospace;
          margin-bottom: 0.75rem;
        }

        .sub-grid-form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 0.75rem;
        }

        .sub-grid-form label, .form-group label {
          display: block;
          font-size: 0.775rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .sub-grid-form input, .sub-grid-form select, .form-group input, .form-group select, .form-group textarea {
          width: 100%;
          padding: 0.55rem 0.65rem;
          border: 1px solid var(--border-color, #cbd5e1);
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .full-width {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }

        .admin-table th, .admin-table td {
          padding: 0.65rem 0.75rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
          text-align: left;
        }

        .del-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.25rem;
        }

        .news-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 680px;
        }

        .group-add-form {
          display: flex;
          gap: 0.75rem;
          max-width: 540px;
          margin-bottom: 1.5rem;
        }

        .group-add-form input {
          flex: 1;
          padding: 0.55rem 0.75rem;
          border: 1px solid var(--border-color, #cbd5e1);
          border-radius: 6px;
          font-size: 0.85rem;
        }

        .groups-list-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .group-chip {
          background: var(--bg-muted, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 6px;
          padding: 0.5rem 0.85rem;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
        }

        .group-chip strong {
          color: #2563eb;
        }

        .group-chip span {
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
        }

        .admin-login-page {
          padding: 5rem 1rem;
          display: flex;
          justify-content: center;
        }

        .login-card {
          max-width: 420px;
          width: 100%;
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 12px;
          padding: 2.5rem 2rem;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }

        .login-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }

        .login-card h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.35rem;
        }

        .login-sub {
          font-size: 0.85rem;
          color: var(--text-muted, #64748b);
          margin-bottom: 1.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .btn-block {
          width: 100%;
          justify-content: center;
        }

        .auth-error-msg {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.6rem 0.85rem;
          border-radius: 6px;
          font-size: 0.825rem;
          margin-bottom: 1rem;
          text-align: left;
        }

        .demo-hint {
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-muted, #64748b);
        }

        /* Notice CMS */
        .notice-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 0.5rem;
        }

        .notice-status-pill .status-live {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.15);
          color: #059669;
          font-weight: 700;
          font-size: 0.775rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .notice-status-pill .status-off {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-muted, #f1f5f9);
          color: var(--text-muted, #64748b);
          font-weight: 600;
          font-size: 0.775rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid var(--border-color, #e2e8f0);
        }

        .live-dot-mini {
          width: 7px;
          height: 7px;
          background: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulseDotMini 1.8s infinite;
        }

        @keyframes pulseDotMini {
          0% { transform: scale(0.95); opacity: 0.8; }
          70% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .notice-state-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          border: 1px solid;
          flex-wrap: wrap;
        }

        .notice-state-banner.is-active {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .notice-state-banner.is-disabled {
          background: var(--bg-muted, #f8fafc);
          border-color: var(--border-color, #e2e8f0);
        }

        .notice-state-banner .state-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.85rem;
        }

        .notice-state-banner .state-info strong {
          color: var(--text-main);
          font-size: 0.925rem;
        }

        .notice-state-banner .state-info span {
          color: var(--text-muted);
        }

        .notice-cms-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          background: var(--bg-muted, #f8fafc);
          border: 1px solid var(--border-color, #e2e8f0);
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 2rem;
        }

        .notice-form-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .notice-preview-container {
          border-top: 1px solid var(--border-color, #e2e8f0);
          padding-top: 1.5rem;
        }

        .preview-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .preview-notice-card {
          background: var(--bg-surface, #ffffff);
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          border: 2px solid;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .preview-type-info {
          border-color: rgba(37, 99, 235, 0.4);
        }

        .preview-type-warning {
          border-color: rgba(217, 119, 6, 0.45);
        }

        .preview-type-urgent {
          border-color: rgba(220, 38, 38, 0.45);
        }

        .preview-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-color, #e2e8f0);
        }

        .preview-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-weight: 800;
          color: var(--primary, #2563eb);
        }

        .preview-type-warning .preview-badge {
          color: #d97706;
        }

        .preview-type-urgent .preview-badge {
          color: #dc2626;
        }

        .preview-date {
          color: var(--text-muted);
          font-weight: 600;
        }

        .preview-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          margin: 0;
        }

        .preview-body {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .preview-body p {
          margin: 0;
        }

        .preview-empty {
          background: var(--bg-muted, #f8fafc);
          border: 1px dashed var(--border-color, #cbd5e1);
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
