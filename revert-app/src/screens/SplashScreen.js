import React, { useEffect, useState } from 'react';

const GEO_PATTERN = `
  <pattern id="geo" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
    <polygon points="35,2 38,26 55,13 42,30 68,28 48,35 68,42 42,40 55,57 38,44 35,68 32,44 15,57 28,40 2,42 22,35 2,28 28,30 15,13 32,26"
      fill="none" stroke="#c9a84c" stroke-width="0.5"/>
    <rect x="26" y="26" width="18" height="18" transform="rotate(45 35 35)"
      fill="none" stroke="#c9a84c" stroke-width="0.4"/>
  </pattern>
`;

export default function SplashScreen() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const fadeStyle = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a1209',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Geometric SVG background pattern */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs dangerouslySetInnerHTML={{ __html: GEO_PATTERN }} />
        <rect width="100%" height="100%" fill="url(#geo)" />
      </svg>

      {/* Radial gold glow */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(200px, 60vw, 320px)',
          height: 'clamp(200px, 60vw, 320px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(10px, 3vh, 18px)',
          padding: '0 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Bismillah */}
        <div
          style={{
            ...fadeStyle(phase >= 1),
            fontFamily: "'Amiri', serif",
            fontSize: 'clamp(22px, 6vw, 30px)',
            color: 'rgba(201,168,76,0.65)',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Top divider */}
        <div style={{ ...fadeStyle(phase >= 1), width: 'clamp(50px, 15vw, 80px)', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

        {/* App name */}
        <div
          style={{
            ...fadeStyle(phase >= 2),
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(52px, 16vw, 72px)',
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.2em',
            textAlign: 'center',
            lineHeight: 1,
            textShadow: '0 0 60px rgba(201,168,76,0.35)',
          }}
        >
          REVERT
        </div>

        {/* Bottom divider */}
        <div style={{ ...fadeStyle(phase >= 2), width: 'clamp(50px, 15vw, 80px)', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

        {/* Dedication */}
        <div style={{ ...fadeStyle(phase >= 3), textAlign: 'center' }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(9px, 2.5vw, 12px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            A special project for
          </div>
          <div
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(18px, 5vw, 24px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(201,168,76,0.8)',
              letterSpacing: '0.05em',
            }}
          >
            Deanna
          </div>
        </div>

        {/* Loading dots */}
        <div
          style={{
            ...fadeStyle(phase >= 3),
            display: 'flex',
            gap: '7px',
            marginTop: 'clamp(16px, 4vh, 28px)',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#c9a84c',
                animation: `dotPulse 1.5s ease-in-out ${i * 0.22}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom credit */}
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(10px, 2.5vw, 12px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.22)',
          letterSpacing: '0.1em',
          ...fadeStyle(phase >= 3, 0.3),
        }}
      >
        by Shahran Islam
      </div>
    </div>
  );
}
