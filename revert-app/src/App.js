import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import PrayerScreen from './screens/PrayerScreen';
import QuranScreen from './screens/QuranScreen';
import DuasScreen from './screens/DuasScreen';
import GuidesScreen from './screens/GuidesScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import BottomNav from './components/BottomNav';

const SCREEN_BG = {
  home: '#0f1a12',
  prayer: '#0d1f2d',
  quran: '#1a0f0a',
  duas: '#0e0a1a',
  guides: '#120d1f',
  bookmarks: '#0a0f1a',
};

export default function App() {
  const [phase, setPhase] = useState('splash'); // splash → welcome → app
  const [activeTab, setActiveTab] = useState('home');
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('revert_bookmarks') || '[]'); }
    catch { return []; }
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem('revert_bookmarks', JSON.stringify(bookmarks)); }
    catch {}
  }, [bookmarks]);

  // Check if welcome has been seen before
  const [welcomeSeen] = useState(() => {
    try { return localStorage.getItem('revert_welcome_seen') === 'true'; }
    catch { return false; }
  });

  useEffect(() => {
    if (phase === 'splash') {
      const t = setTimeout(() => {
        setPhase(welcomeSeen ? 'app' : 'welcome');
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase, welcomeSeen]);

  const handleWelcomeDone = () => {
    try { localStorage.setItem('revert_welcome_seen', 'true'); } catch {}
    setPhase('app');
  };

  const addBookmark = (item) => {
    setBookmarks(prev => {
      if (prev.find(b => b.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id) => bookmarks.some(b => b.id === id);

  const handleTabChange = (tab) => setActiveTab(tab);

  if (phase === 'splash') return <SplashScreen />;
  if (phase === 'welcome') return <WelcomeScreen onDone={handleWelcomeDone} />;

  return (
    <div style={{ position: 'relative', height: '100dvh', width: '100vw', overflow: 'hidden', background: SCREEN_BG[activeTab] || '#0f1a12' }}>
      <div
        key={activeTab}
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'fadeInUp 0.28s ease forwards',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {activeTab === 'home'      && <HomeScreen      onNavigate={handleTabChange} bookmarks={bookmarks} />}
        {activeTab === 'prayer'    && <PrayerScreen />}
        {activeTab === 'quran'     && <QuranScreen     bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} isBookmarked={isBookmarked} />}
        {activeTab === 'duas'      && <DuasScreen      bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} isBookmarked={isBookmarked} />}
        {activeTab === 'guides'    && <GuidesScreen />}
        {activeTab === 'bookmarks' && <BookmarksScreen bookmarks={bookmarks} onRemove={removeBookmark} onNavigate={handleTabChange} />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
