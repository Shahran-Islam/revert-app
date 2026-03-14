import React, { useState, useEffect, useRef } from 'react';
import StatusBar from '../components/StatusBar';
import usePrayerTimes from '../hooks/usePrayerTimes';

export default function PrayerScreen() {
  const { prayers, nextPrayer, location, loading, qibla } = usePrayerTimes();
  const [compassHeading, setCompassHeading] = useState(null);
  const [compassError, setCompassError] = useState(false);

  // Try device compass
  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.webkitCompassHeading !== undefined) {
        setCompassHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        setCompassHeading(360 - e.alpha);
      }
    };
    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requires permission
        setCompassError(true); // Show tap-to-enable
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    }
    return () => window.removeEventListener('deviceorientation', handleOrientation, true);
  }, []);

  const requestCompass = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const perm = await DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          setCompassError(false);
          window.addEventListener('deviceorientation', (e) => {
            setCompassHeading(e.webkitCompassHeading ?? (360 - e.alpha));
          }, true);
        }
      } catch (e) {}
    }
  };

  // Needle angle: rotate needle so it points toward Qibla
  const needleAngle = compassHeading !== null
    ? qibla.direction - compassHeading
    : qibla.direction;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="screen scrollable" style={{ background: '#0d1f2d', minHeight: '100%' }}>
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 16px', background: 'linear-gradient(180deg, #0d2a3d 0%, transparent 100%)' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: '4px' }}>Prayer Times</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.4)' }}>
          📍 {loading ? 'Locating...' : location} · {today}
        </div>
      </div>

      {/* Qibla Widget */}
      <div style={{
        margin: '0 16px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 'clamp(14px, 4vw, 18px)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        padding: 'clamp(14px, 3.5vw, 18px)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        {/* Compass SVG */}
        <div
          onClick={compassError ? requestCompass : undefined}
          style={{ cursor: compassError ? 'pointer' : 'default', flexShrink: 0 }}
        >
          <svg width="clamp(64px,18vw,80px)" height="clamp(64px,18vw,80px)" viewBox="0 0 80 80">
            {/* Outer ring */}
            <circle cx="40" cy="40" r="37" fill="none" stroke="rgba(111,179,216,0.15)" strokeWidth="1.5"/>
            <circle cx="40" cy="40" r="31" fill="none" stroke="rgba(111,179,216,0.08)" strokeWidth="0.5"/>
            {/* Cardinal labels */}
            <text fontFamily="'DM Sans', sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" x="40" y="10">N</text>
            <text fontFamily="'DM Sans', sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" x="40" y="75">S</text>
            <text fontFamily="'DM Sans', sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" x="9" y="43">W</text>
            <text fontFamily="'DM Sans', sans-serif" fontSize="9" fill="rgba(255,255,255,0.5)" textAnchor="middle" x="71" y="43">E</text>
            {/* Tick marks */}
            {[0,45,90,135,180,225,270,315].map(a => {
              const rad = (a - 90) * Math.PI / 180;
              return <line key={a}
                x1={40 + 34 * Math.cos(rad)} y1={40 + 34 * Math.sin(rad)}
                x2={40 + 37 * Math.cos(rad)} y2={40 + 37 * Math.sin(rad)}
                stroke="rgba(111,179,216,0.3)" strokeWidth="1"/>;
            })}
            {/* Qibla needle */}
            <g transform={`rotate(${needleAngle}, 40, 40)`}>
              <line x1="40" y1="40" x2="40" y2="12" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
              <polygon points="40,8 37,16 43,16" fill="#c9a84c"/>
              <line x1="40" y1="40" x2="40" y2="66" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <circle cx="40" cy="40" r="3" fill="#6fb3d8"/>
          </svg>
        </div>

        <div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
            Qibla Direction
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(22px, 6vw, 28px)', color: '#6fb3d8', lineHeight: 1 }}>
            {qibla.direction}°
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
            toward Makkah al-Mukarramah
          </div>
          {compassError && (
            <div onClick={requestCompass} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: '#6fb3d8', marginTop: '6px', cursor: 'pointer', textDecoration: 'underline' }}>
              Tap compass to enable live tracking
            </div>
          )}
        </div>
      </div>

      {/* Prayer Times List */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 9px)' }}>
        {loading
          ? [1,2,3,4,5].map(i => <SkeletonRow key={i} />)
          : prayers.map((p) => {
              const isNext = nextPrayer?.name === p.name;
              return (
                <div
                  key={p.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'clamp(12px, 3vw, 16px) clamp(14px, 3.5vw, 18px)',
                    borderRadius: 'clamp(10px, 3vw, 14px)',
                    background: isNext ? 'rgba(111,179,216,0.1)' : 'rgba(255,255,255,0.03)',
                    border: isNext ? '0.5px solid rgba(111,179,216,0.35)' : '0.5px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: isNext ? '#6fb3d8' : 'rgba(255,255,255,0.15)',
                      flexShrink: 0,
                    }}/>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: isNext ? '#6fb3d8' : 'rgba(255,255,255,0.75)', fontWeight: isNext ? 500 : 400 }}>
                      {p.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: isNext ? '#6fb3d8' : 'rgba(255,255,255,0.4)', fontWeight: isNext ? 500 : 400 }}>
                    {p.timeStr}
                  </span>
                </div>
              );
            })
        }
      </div>

      {/* Hadith card */}
      <div style={{
        margin: '16px 16px 24px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 'clamp(12px, 3.5vw, 16px)',
        border: '0.5px solid rgba(255,255,255,0.06)',
        padding: 'clamp(14px, 3.5vw, 18px)',
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Reminder
        </div>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontStyle: 'italic' }}>
          "The first matter that the slave will be brought to account for on the Day of Judgment is the prayer."
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
          — Reported by Al-Nasai
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{
      height: 'clamp(48px, 12vw, 56px)',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.04)',
      border: '0.5px solid rgba(255,255,255,0.06)',
      animation: 'shimmer 1.5s ease-in-out infinite',
    }}/>
  );
}
