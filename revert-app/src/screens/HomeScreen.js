import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import usePrayerTimes from '../hooks/usePrayerTimes';

const DUAS = [
  { arabic: 'سُبْحَانَ اللهِ', transliteration: 'Subhanallah', meaning: 'Glory be to Allah' },
  { arabic: 'اَلْحَمْدُ لِلّٰهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is for Allah' },
  { arabic: 'اَللّٰهُ اَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
  { arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah' },
];

export default function HomeScreen({ onNavigate }) {
  const { nextPrayer, location, loading, countdown } = usePrayerTimes();
  const [dua] = useState(() => DUAS[Math.floor(Math.random() * DUAS.length)]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good Morning');
    else if (h < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div
      className="screen scrollable"
      style={{
        background: 'linear-gradient(160deg, #0f1a12 0%, #162a1a 60%, #0d2020 100%)',
        minHeight: '100%',
      }}
    >
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 16px' }}>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', color: '#c9a84c', textAlign: 'center', marginBottom: '4px' }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center', letterSpacing: '0.05em' }}>
          {greeting} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Next Prayer Card */}
      <div
        onClick={() => onNavigate('prayer')}
        style={{
          margin: '0 16px 16px',
          background: 'linear-gradient(135deg, #1e4d30 0%, #14382a 100%)',
          borderRadius: 'clamp(14px, 4vw, 20px)',
          padding: 'clamp(16px, 4vw, 22px)',
          border: '0.5px solid rgba(201,168,76,0.3)',
          cursor: 'pointer',
          active: { opacity: 0.8 },
        }}
      >
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Next Prayer
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 8vw, 36px)', color: '#fff', lineHeight: 1 }}>
              {loading ? '...' : (nextPrayer?.name || 'Asr')}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
              {loading ? '' : (nextPrayer?.timeStr || '4:28 PM')} · {location}
            </div>
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(10px, 2.5vw, 12px)',
            color: '#c9a84c',
            background: 'rgba(201,168,76,0.12)',
            padding: '6px 12px',
            borderRadius: 20,
            border: '0.5px solid rgba(201,168,76,0.25)',
          }}>
            {countdown || 'Loading...'}
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(8px, 2vw, 12px)',
        padding: '0 16px 16px',
      }}>
        <QuickTile icon="📖" label="Daily Quran" sub="Surah Al-Fatiha" onClick={() => onNavigate('quran')} />
        <QuickTile icon="🧭" label="Qibla" sub="Tap to find direction" onClick={() => onNavigate('prayer')} />
        <QuickTile icon="📚" label="My Journey" sub="3 of 10 complete" onClick={() => onNavigate('guides')} />
        <QuickTile icon="🤲" label="Du'a of the Day" sub="Morning Adhkar" onClick={() => onNavigate('guides')} />
      </div>

      {/* Daily Dhikr Card */}
      <div style={{
        margin: '0 16px 24px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 'clamp(12px, 3.5vw, 16px)',
        border: '0.5px solid rgba(255,255,255,0.07)',
        padding: 'clamp(14px, 3.5vw, 20px)',
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Remember Allah
        </div>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(24px, 7vw, 32px)', color: '#c9a84c', textAlign: 'center', marginBottom: '8px', lineHeight: 1.4 }}>
          {dua.arabic}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.6)', textAlign: 'center', fontStyle: 'italic', marginBottom: '4px' }}>
          {dua.transliteration}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
          {dua.meaning}
        </div>
      </div>
    </div>
  );
}

function QuickTile({ icon, label, sub, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 'clamp(12px, 3.5vw, 16px)',
        padding: 'clamp(12px, 3vw, 18px)',
        cursor: 'pointer',
        transition: 'background 0.18s',
      }}
      onTouchStart={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      onTouchEnd={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
    >
      <div style={{ fontSize: 'clamp(22px, 6vw, 28px)', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '3px' }}>
        {label}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.35)' }}>
        {sub}
      </div>
    </div>
  );
}
