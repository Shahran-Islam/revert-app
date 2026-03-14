import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import usePrayerTimes from '../hooks/usePrayerTimes';

export default function PrayerScreen() {
  const { prayers, nextPrayer, location, loading, qibla } = usePrayerTimes();
  const [compassHeading, setCompassHeading] = useState(null);
  const [compassError, setCompassError] = useState(false);
  const [compassGranted, setCompassGranted] = useState(false);

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
        setCompassHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        setCompassHeading(360 - e.alpha);
      }
    };
    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        setCompassError(true);
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        setCompassGranted(true);
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
          setCompassGranted(true);
          window.addEventListener('deviceorientation', (e) => {
            setCompassHeading(e.webkitCompassHeading ?? (360 - e.alpha));
          }, true);
        }
      } catch (e) {}
    }
  };

  // Needle points toward Qibla relative to device heading
  const needleAngle = compassHeading !== null
    ? qibla.direction - compassHeading
    : qibla.direction;

  // How aligned is the user? (within ±10° = aligned)
  const offset = compassHeading !== null
    ? ((qibla.direction - compassHeading + 360) % 360)
    : null;
  const normalizedOffset = offset !== null
    ? (offset > 180 ? offset - 360 : offset)
    : null;
  const isAligned = normalizedOffset !== null && Math.abs(normalizedOffset) <= 10;
  const isClose = normalizedOffset !== null && Math.abs(normalizedOffset) <= 25;

  // Direction hint
  const getHint = () => {
    if (normalizedOffset === null) return { text: 'Enable compass for live guidance', color: 'rgba(255,255,255,0.4)' };
    if (isAligned) return { text: '✓ Facing Qibla — you may begin your prayer', color: '#2db496' };
    if (normalizedOffset > 0) return { text: `Turn slightly right · ${Math.round(Math.abs(normalizedOffset))}° off`, color: isClose ? '#c9a84c' : '#6fb3d8' };
    return { text: `Turn slightly left · ${Math.round(Math.abs(normalizedOffset))}° off`, color: isClose ? '#c9a84c' : '#6fb3d8' };
  };

  const hint = getHint();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="screen scrollable" style={{ background: '#0d1f2d', minHeight: '100%' }}>
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 14px', background: 'linear-gradient(180deg, #0d2a3d 0%, transparent 100%)' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: 4 }}>Prayer Times</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.4)' }}>
          📍 {loading ? 'Locating...' : location} · {today}
        </div>
      </div>

      {/* ── QIBLA COMPASS ── */}
      <div style={{
        margin: '0 16px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 'clamp(16px, 4.5vw, 22px)',
        border: `0.5px solid ${isAligned ? 'rgba(45,180,150,0.4)' : 'rgba(255,255,255,0.08)'}`,
        padding: 'clamp(16px, 4vw, 22px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        transition: 'border-color 0.4s',
      }}>
        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start' }}>
          <span style={{ fontSize: 18 }}>🕋</span>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Qibla Finder</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 4.5vw, 20px)', color: '#6fb3d8', lineHeight: 1 }}>
              {qibla.direction}° <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>toward Makkah</span>
            </div>
          </div>
        </div>

        {/* Large Compass */}
        <div
          onClick={compassError ? requestCompass : undefined}
          style={{ cursor: compassError ? 'pointer' : 'default', position: 'relative' }}
        >
          <svg
            width="clamp(180px, 55vw, 240px)"
            height="clamp(180px, 55vw, 240px)"
            viewBox="0 0 200 200"
          >
            {/* Outer glow ring when aligned */}
            {isAligned && (
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(45,180,150,0.25)" strokeWidth="4"/>
            )}

            {/* Outer ring */}
            <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(111,179,216,0.12)" strokeWidth="1.5"/>

            {/* Degree tick marks */}
            {Array.from({ length: 72 }, (_, i) => {
              const angle = (i * 5 - 90) * Math.PI / 180;
              const isMajor = i % 9 === 0; // every 45°
              const r1 = isMajor ? 82 : 87;
              const r2 = 92;
              return (
                <line key={i}
                  x1={100 + r1 * Math.cos(angle)} y1={100 + r1 * Math.sin(angle)}
                  x2={100 + r2 * Math.cos(angle)} y2={100 + r2 * Math.sin(angle)}
                  stroke={isMajor ? 'rgba(111,179,216,0.4)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isMajor ? 1.5 : 0.5}
                />
              );
            })}

            {/* Cardinal direction labels */}
            {[
              { label: 'N', x: 100, y: 16 },
              { label: 'S', x: 100, y: 190 },
              { label: 'E', x: 186, y: 104 },
              { label: 'W', x: 14,  y: 104 },
            ].map(({ label, x, y }) => (
              <text key={label} fontFamily="'DM Sans', sans-serif" fontSize="12" fontWeight="500"
                fill={label === 'N' ? '#6fb3d8' : 'rgba(255,255,255,0.4)'}
                textAnchor="middle" dominantBaseline="middle" x={x} y={y}>
                {label}
              </text>
            ))}

            {/* Inner circle background */}
            <circle cx="100" cy="100" r="72" fill="rgba(13,31,45,0.8)"/>
            <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(111,179,216,0.08)" strokeWidth="0.5"/>

            {/* Kaaba icon at needle tip */}
            <g transform={`rotate(${needleAngle}, 100, 100)`}
               style={{ transition: compassGranted ? 'transform 0.15s ease-out' : 'none' }}>
              {/* Needle shaft — pointing to Qibla */}
              <line x1="100" y1="100" x2="100" y2="36"
                stroke={isAligned ? '#2db496' : '#c9a84c'}
                strokeWidth="2.5" strokeLinecap="round"/>
              {/* Kaaba emoji at tip */}
              <text x="100" y="28" textAnchor="middle" dominantBaseline="middle" fontSize="18">🕋</text>
              {/* Opposite end */}
              <line x1="100" y1="100" x2="100" y2="155"
                stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="100" cy="155" r="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            </g>

            {/* Center dot */}
            <circle cx="100" cy="100" r="5" fill={isAligned ? '#2db496' : '#6fb3d8'}/>
            <circle cx="100" cy="100" r="2.5" fill="#0d1f2d"/>

            {/* Alignment arc — shows how close you are */}
            {normalizedOffset !== null && (
              <circle cx="100" cy="100" r="72"
                fill="none"
                stroke={isAligned ? 'rgba(45,180,150,0.5)' : isClose ? 'rgba(201,168,76,0.3)' : 'rgba(111,179,216,0.15)'}
                strokeWidth="3"
                strokeDasharray={`${Math.max(0, 30 - Math.abs(normalizedOffset)) * 1.5} 1000`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
            )}
          </svg>

          {/* Tap to enable overlay */}
          {compassError && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(13,31,45,0.75)',
              borderRadius: '50%',
            }}>
              <span style={{ fontSize: 28, marginBottom: 6 }}>🧭</span>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#6fb3d8', textAlign: 'center', padding: '0 24px' }}>Tap to enable live compass</div>
            </div>
          )}
        </div>

        {/* Alignment hint */}
        <div style={{
          background: isAligned ? 'rgba(45,180,150,0.1)' : 'rgba(255,255,255,0.04)',
          border: `0.5px solid ${isAligned ? 'rgba(45,180,150,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 12,
          padding: '10px 16px',
          width: '100%',
          textAlign: 'center',
          transition: 'all 0.4s',
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: hint.color, fontWeight: isAligned ? 500 : 400, transition: 'color 0.3s' }}>
            {hint.text}
          </div>
          {!compassGranted && !compassError && (
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
              Showing static direction · compass not available on this device
            </div>
          )}
        </div>

        {/* How to use instructions */}
        <div style={{ alignSelf: 'flex-start', width: '100%' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>How to use</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 12px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Hold your phone flat and parallel to the ground. Slowly turn your body until the 🕋 points straight up. When the indicator turns green you are facing Makkah.
          </div>
        </div>
      </div>

      {/* Prayer Times List */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 1.5vw, 9px)' }}>
        {loading
          ? [1,2,3,4,5].map(i => <SkeletonRow key={i} />)
          : prayers.map((p) => {
              const isNext = nextPrayer?.name === p.name;
              return (
                <div key={p.name} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 'clamp(12px, 3vw, 16px) clamp(14px, 3.5vw, 18px)',
                  borderRadius: 'clamp(10px, 3vw, 14px)',
                  background: isNext ? 'rgba(111,179,216,0.1)' : 'rgba(255,255,255,0.03)',
                  border: isNext ? '0.5px solid rgba(111,179,216,0.35)' : '0.5px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: isNext ? '#6fb3d8' : 'rgba(255,255,255,0.15)', flexShrink: 0 }}/>
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

      {/* Hadith */}
      <div style={{ margin: '16px 16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 'clamp(12px, 3.5vw, 16px)', border: '0.5px solid rgba(255,255,255,0.06)', padding: 'clamp(14px, 3.5vw, 18px)' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Reminder</div>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontStyle: 'italic' }}>
          "The first matter that the slave will be brought to account for on the Day of Judgment is the prayer."
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>— Reported by Al-Nasai</div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{ height: 'clamp(48px, 12vw, 56px)', borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)', animation: 'shimmer 1.5s ease-in-out infinite' }}/>
  );
}
