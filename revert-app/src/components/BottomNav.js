import React from 'react';

const TABS = [
  { id: 'home',   label: 'Home',   icon: HomeIcon,   color: '#c9a84c' },
  { id: 'prayer', label: 'Prayer', icon: PrayerIcon, color: '#6fb3d8' },
  { id: 'quran',  label: 'Quran',  icon: QuranIcon,  color: '#c9a84c' },
  { id: 'duas',   label: 'Duas',   icon: DuasIcon,   color: '#8a63da' },
  { id: 'guides', label: 'Learn',  icon: GuideIcon,  color: '#8a63da' },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(70px + env(safe-area-inset-bottom, 20px))',
        paddingBottom: 'env(safe-area-inset-bottom, 20px)',
        background: 'rgba(8, 8, 8, 0.92)',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        paddingTop: '10px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 100,
      }}
    >
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0 4px',
              transition: 'opacity 0.18s',
              opacity: active ? 1 : 0.5,
            }}
          >
            <Icon
              size={22}
              color={active ? tab.color : 'rgba(255,255,255,0.5)'}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(9px, 2.5vw, 11px)',
                fontWeight: active ? 500 : 400,
                color: active ? tab.color : 'rgba(255,255,255,0.4)',
                transition: 'color 0.18s',
              }}
            >
              {tab.label}
            </span>
            <div
              style={{
                width: active ? 20 : 0,
                height: 2,
                borderRadius: 2,
                background: tab.color,
                transition: 'width 0.22s ease',
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

function HomeIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function PrayerIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
      <path d="M12 7V12L15 14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function QuranIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="13" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M7 8H14M7 11H14M7 14H11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 6H20V21H8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function DuasIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5 5 9C5 13 8 16 12 16C16 16 19 13 19 9C19 5 16 2 12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M8 9C8 9 9.5 11 12 11C14.5 11 16 9 16 9" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 7H9.01M15 7H15.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 19L12 17L17 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 17V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GuideIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}
