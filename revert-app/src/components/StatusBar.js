import React, { useState, useEffect } from 'react';

export default function StatusBar({ color = 'rgba(255,255,255,0.5)' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 'max(env(safe-area-inset-top, 44px), 44px)',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '8px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(11px, 3vw, 13px)',
        fontWeight: 500,
        color,
        flexShrink: 0,
      }}
    >
      <span>{time}</span>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <SignalIcon color={color} />
        <WifiIcon color={color} />
        <BatteryIcon color={color} />
      </div>
    </div>
  );
}

function SignalIcon({ color }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect x="0" y="8" width="3" height="4" rx="0.5" fill={color}/>
      <rect x="4.5" y="5" width="3" height="7" rx="0.5" fill={color}/>
      <rect x="9" y="2" width="3" height="10" rx="0.5" fill={color}/>
      <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill={color} opacity="0.35"/>
    </svg>
  );
}

function WifiIcon({ color }) {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M7.5 9.5A1 1 0 1 0 7.5 11.5A1 1 0 0 0 7.5 9.5Z" fill={color}/>
      <path d="M4.5 7C5.5 6 6.4 5.5 7.5 5.5C8.6 5.5 9.5 6 10.5 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M2 4.5C3.6 2.8 5.4 2 7.5 2C9.6 2 11.4 2.8 13 4.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

function BatteryIcon({ color }) {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <rect x="0.5" y="0.5" width="18" height="11" rx="2.5" stroke={color} strokeOpacity="0.6"/>
      <rect x="2" y="2" width="13" height="8" rx="1.5" fill={color}/>
      <path d="M19.5 4V8C20.3 7.5 21 6.8 21 6C21 5.2 20.3 4.5 19.5 4Z" fill={color} opacity="0.5"/>
    </svg>
  );
}
