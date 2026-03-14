import React, { useState, useEffect } from 'react';

const TABS = [
  { id: 'home',   label: 'Home',   icon: HomeIcon,   color: '#c9a84c' },
  { id: 'prayer', label: 'Prayer', icon: PrayerIcon, color: '#6fb3d8' },
  { id: 'quran',  label: 'Quran',  icon: QuranIcon,  color: '#c9a84c' },
  { id: 'duas',   label: 'Duas',   icon: DuasIcon,   color: '#8a63da' },
  { id: 'guides', label: 'Learn',  icon: GuideIcon,  color: '#8a63da' },
];

// Hook to get the real safe area inset bottom from the device
function useSafeAreaBottom() {
  const [safeBottom, setSafeBottom] = useState(0);

  useEffect(() => {
    const measure = () => {
      // Create a test element to read the computed env() value
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        bottom: 0;
        height: env(safe-area-inset-bottom, 0px);
        width: 0;
        pointer-events: none;
        visibility: hidden;
      `;
      document.body.appendChild(el);
      const h = el.getBoundingClientRect().height;
      document.body.removeChild(el);
      // Minimum 20px on modern iPhones even if env() reports 0
      setSafeBottom(Math.max(h, window.innerHeight > 800 ? 20 : 0));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return safeBottom;
}

export default function BottomNav({ activeTab, onTabChange }) {
  const safeBottom = useSafeAreaBottom();
  // Nav content height (icon + label + indicator)
  const NAV_CONTENT_HEIGHT = 54;
  const totalHeight = NAV_CONTENT_HEIGHT + safeBottom;

  return (
    <>
      {/* Actual nav bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: totalHeight,
          background: 'rgba(6, 6, 6, 0.94)',
          borderTop: '0.5px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tab buttons — live in the top NAV_CONTENT_HEIGHT portion */}
        <div
          style={{
            height: NAV_CONTENT_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 6,
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
                  gap: 3,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 2px',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'opacity 0.18s',
                  opacity: active ? 1 : 0.45,
                  minWidth: 0,
                }}
              >
                <Icon size={22} color={active ? tab.color : 'rgba(255,255,255,0.6)'} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(8px, 2vw, 10px)',
                    fontWeight: active ? 500 : 400,
                    color: active ? tab.color : 'rgba(255,255,255,0.4)',
                    transition: 'color 0.18s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </span>
                <div
                  style={{
                    width: active ? 18 : 0,
                    height: 2,
                    borderRadius: 2,
                    background: tab.color,
                    transition: 'width 0.22s ease',
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Safe area spacer — fills the home indicator zone */}
        <div style={{ height: safeBottom, flexShrink: 0 }} />
      </nav>

      {/* Invisible spacer so scrollable content isn't hidden behind nav */}
      <div style={{ height: totalHeight, flexShrink: 0 }} />
    </>
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
