import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ScheduleModule from './components/ScheduleModule';
import SpecialtiesSection from './components/SpecialtiesSection';
import AdmissionsCalculator from './components/AdmissionsCalculator';
import TransparencyDocs from './components/TransparencyDocs';
import AdministrationSection from './components/AdministrationSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';
import StudentCabinetModal from './components/StudentCabinetModal';
import SearchModal from './components/SearchModal';
import { INITIAL_SUBSTITUTIONS } from './data/collegeData';

export default function App() {
  // Тема оформлення (світла / темна)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('bcpep_theme') || 'light';
  });

  // Авторизований студент
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('bcpep_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Активна група для розкладу
  const [selectedGroup, setSelectedGroup] = useState(() => {
    return currentUser?.group || 'PZ-41';
  });

  // Заміни (з можливістю збереження нових з диспетчерської)
  const [substitutions, setSubstitutions] = useState(() => {
    const custom = localStorage.getItem('bcpep_custom_subs');
    return custom ? JSON.parse(custom) : INITIAL_SUBSTITUTIONS;
  });

  // Стан модалок
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Синхронізація теми з HTML атрибутом
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bcpep_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setSelectedGroup(userData.group);
    localStorage.setItem('bcpep_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bcpep_user');
  };

  const handleUpdateSubstitutions = (newSubs) => {
    setSubstitutions(newSubs);
    localStorage.setItem('bcpep_custom_subs', JSON.stringify(newSubs));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mapping = {
      schedule: 'schedule-block',
      specialties: 'specialties-block',
      transparency: 'transparency-block',
      admissions: 'admissions-block',
      administration: 'admin-block',
      history: 'admin-block',
      contacts: 'contacts-block'
    };

    const targetId = mapping[sectionId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="app-layout">
      {/* Шапка порталу */}
      <Header 
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCabinet={() => setCabinetOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        currentUser={currentUser}
      />

      {/* Головний контент */}
      <main>
        <Hero 
          onNavigate={scrollToSection}
          onOpenCabinet={() => setCabinetOpen(true)}
        />

        {/* Кілер-фіча: Розклад та оперативні заміни */}
        <ScheduleModule 
          substitutions={substitutions}
          onUpdateSubstitutions={handleUpdateSubstitutions}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroup}
        />

        {/* Спеціальності */}
        <SpecialtiesSection onNavigate={scrollToSection} />

        {/* Вступнику */}
        <AdmissionsCalculator />

        {/* Прозорість (Офіційні нормативні документи) */}
        <TransparencyDocs />

        {/* Керівництво коледжу та циклові комісії */}
        <AdministrationSection />

        {/* Новини та оголошення */}
        <NewsSection />
      </main>

      {/* Підвал сайту */}
      <Footer onNavigate={scrollToSection} />

      {/* Модальні вікна */}
      <StudentCabinetModal 
        isOpen={cabinetOpen}
        onClose={() => setCabinetOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onNavigate={scrollToSection}
      />

      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectGroup={setSelectedGroup}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
