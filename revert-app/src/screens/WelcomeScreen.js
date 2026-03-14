import React, { useState, useEffect } from 'react';

const GEO_PATTERN = `
  <pattern id="geo2" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
    <polygon points="35,2 38,26 55,13 42,30 68,28 48,35 68,42 42,40 55,57 38,44 35,68 32,44 15,57 28,40 2,42 22,35 2,28 28,30 15,13 32,26"
      fill="none" stroke="#c9a84c" stroke-width="0.4"/>
  </pattern>
`;

export default function WelcomeScreen({ onDone }) {
  const [phase, setPhase] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1300);
    const t4 = setTimeout(() => setPhase(4), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const handleContinue = () => {
    setClosing(true);
    setTimeout(onDone, 600);
  };

  const fade = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0a0a14',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      opacity: closing ? 0 : 1,
      transition: 'opacity 0.6s ease',
      zIndex: 200,
    }}>
      {/* Geometric background */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }} xmlns="http://www.w3.org/2000/svg">
        <defs dangerouslySetInnerHTML={{ __html: GEO_PATTERN }} />
        <rect width="100%" height="100%" fill="url(#geo2)" />
      </svg>

      {/* Top glow */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(200px, 70vw, 340px)',
        height: 'clamp(200px, 70vw, 340px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(138,99,218,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Safe area top */}
      <div style={{ paddingTop: 'max(env(safe-area-inset-top, 44px), 44px)' }} />

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(24px, 6vw, 40px) clamp(24px, 6vw, 32px)',
        gap: 'clamp(14px, 4vw, 22px)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Moon emoji */}
        <div style={{ ...fade(phase >= 1), fontSize: 'clamp(40px, 12vw, 56px)', textAlign: 'center' }}>
          🌙
        </div>

        {/* Bismillah */}
        <div style={{
          ...fade(phase >= 1, 0.1),
          fontFamily: "'Amiri', serif",
          fontSize: 'clamp(18px, 5.5vw, 26px)',
          color: 'rgba(201,168,76,0.7)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Divider */}
        <div style={{ ...fade(phase >= 1, 0.15), width: 'clamp(40px, 15vw, 70px)', height: '0.5px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />

        {/* To Deanna */}
        <div style={{
          ...fade(phase >= 2),
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(22px, 7vw, 30px)',
          color: '#fff',
          textAlign: 'center',
          letterSpacing: '0.05em',
        }}>
          Dear Deanna,
        </div>

        {/* Message */}
        <div style={{
          ...fade(phase >= 3),
          background: 'rgba(138,99,218,0.08)',
          border: '0.5px solid rgba(138,99,218,0.2)',
          borderRadius: 'clamp(16px, 4.5vw, 22px)',
          padding: 'clamp(18px, 5vw, 26px)',
          width: '100%',
        }}>
          <div style={{
            fontFamily: "'Amiri', serif",
            fontSize: 'clamp(15px, 4.5vw, 19px)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.9,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            "I am so proud of you on your journey with Islam. I know how hard it is for reverts to feel accepted, and I made this app to show how much we all have to learn and to keep us on our deen.
          </div>
          <div style={{ height: 'clamp(10px, 3vw, 16px)' }} />
          <div style={{
            fontFamily: "'Amiri', serif",
            fontSize: 'clamp(15px, 4.5vw, 19px)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.9,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            You have truly inspired me to become a better Muslim after hearing all the obstacles you have faced. I can't wait to keep growing together and InshAllah become better Muslims."
          </div>
        </div>

        {/* Signature */}
        <div style={{ ...fade(phase >= 3, 0.2), textAlign: 'center' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
            with love
          </div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 4.5vw, 20px)', color: '#c9a84c', letterSpacing: '0.08em' }}>
            Shahran 🤍
          </div>
        </div>

        {/* Quran verse */}
        <div style={{
          ...fade(phase >= 4),
          background: 'rgba(201,168,76,0.06)',
          border: '0.5px solid rgba(201,168,76,0.15)',
          borderRadius: 'clamp(12px, 3.5vw, 16px)',
          padding: 'clamp(14px, 4vw, 20px)',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(16px, 5vw, 22px)', color: '#c9a84c', lineHeight: 1.8, marginBottom: 8 }}>
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 4 }}>
            "And whoever fears Allah — He will make for them a way out."
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.25)' }}>
            At-Talaq 65:2
          </div>
        </div>

        {/* Continue button */}
        <div style={{ ...fade(phase >= 4, 0.2), width: '100%', paddingBottom: 'max(env(safe-area-inset-bottom, 24px), 24px)' }}>
          <button
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: 'clamp(14px, 4vw, 18px)',
              background: 'linear-gradient(135deg, #8a63da, #6a43ba)',
              border: 'none',
              borderRadius: 'clamp(14px, 4vw, 18px)',
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(14px, 4vw, 17px)',
              color: '#fff',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              transition: 'opacity 0.18s, transform 0.18s',
            }}
            onTouchStart={e => e.currentTarget.style.opacity = '0.85'}
            onTouchEnd={e => e.currentTarget.style.opacity = '1'}
          >
            Begin Your Journey 🌙
          </button>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 10 }}>
            by Shahran Islam
          </div>
        </div>

      </div>
    </div>
  );
}
