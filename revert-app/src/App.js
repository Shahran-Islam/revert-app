import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import PrayerScreen from './screens/PrayerScreen';
import QuranScreen from './screens/QuranScreen';
import GuidesScreen from './screens/GuidesScreen';
import BottomNav from './components/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [isReady, setIsReady] = useState(false);

  // After splash, show home
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('home');
        setIsReady(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentScreen(tab);
  };

  if (currentScreen === 'splash') {
    return <SplashScreen />;
  }

  return (
    <div style={{ position: 'relative', height: '100dvh', width: '100vw', overflow: 'hidden', background: getScreenBg(activeTab) }}>
      <div
        key={activeTab}
        style={{
          position: 'absolute',
          inset: 0,
          animation: 'fadeInUp 0.28s ease forwards',
          paddingBottom: 'calc(70px + env(safe-area-inset-bottom, 20px))',
        }}
      >
        {activeTab === 'home'   && <HomeScreen   onNavigate={handleTabChange} />}
        {activeTab === 'prayer' && <PrayerScreen />}
        {activeTab === 'quran'  && <QuranScreen  />}
        {activeTab === 'guides' && <GuidesScreen />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

function getScreenBg(tab) {
  const map = { home: '#0f1a12', prayer: '#0d1f2d', quran: '#1a0f0a', guides: '#120d1f' };
  return map[tab] || '#0f1a12';
}
