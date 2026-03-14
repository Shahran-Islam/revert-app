import React from 'react';
import StatusBar from '../components/StatusBar';

export default function BookmarksScreen({ bookmarks, onRemove, onNavigate }) {
  const duas = bookmarks.filter(b => b.type === 'dua');
  const surahs = bookmarks.filter(b => b.type === 'surah');

  return (
    <div className="screen scrollable" style={{ background: '#0a0f1a', minHeight: '100%' }}>
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 16px', background: 'linear-gradient(180deg, #0d1530 0%, transparent 100%)' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: 2 }}>Bookmarks</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)' }}>
          Your saved duas & surahs
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', gap: 16 }}>
          <div style={{ fontSize: 48 }}>🔖</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 18, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
            No bookmarks yet
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.6 }}>
            Tap the 🤍 on any dua or surah to save it here for quick access
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button onClick={() => onNavigate('duas')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: '8px 16px', borderRadius: 20, background: 'rgba(138,99,218,0.15)', border: '0.5px solid rgba(138,99,218,0.3)', color: '#b088f5', cursor: 'pointer' }}>
              Browse Duas
            </button>
            <button onClick={() => onNavigate('quran')} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: '8px 16px', borderRadius: 20, background: 'rgba(201,168,76,0.1)', border: '0.5px solid rgba(201,168,76,0.25)', color: '#c9a84c', cursor: 'pointer' }}>
              Browse Quran
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Saved Duas */}
          {duas.length > 0 && (
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Saved Duas · {duas.length}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {duas.map(b => (
                  <div key={b.id} style={{ background: 'rgba(138,99,218,0.07)', border: '0.5px solid rgba(138,99,218,0.18)', borderRadius: 'clamp(12px,3.5vw,16px)', padding: 'clamp(12px,3vw,16px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(12px,3.2vw,14px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 2 }}>{b.title}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px,2.2vw,11px)', color: 'rgba(255,255,255,0.3)' }}>{b.reference}</div>
                      </div>
                      <button onClick={() => onRemove(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: '0 0 0 12px', flexShrink: 0 }}>❤️</button>
                    </div>
                    <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(16px,5vw,20px)', color: '#c9a84c', textAlign: 'right', direction: 'rtl', lineHeight: 1.8, marginBottom: 8 }}>
                      {b.arabic}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px,3vw,13px)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 4 }}>
                      {b.transliteration}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px,3vw,13px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                      {b.translation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Surahs */}
          {surahs.length > 0 && (
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Saved Surahs · {surahs.length}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {surahs.map(b => (
                  <div key={b.id} style={{ background: 'rgba(201,168,76,0.06)', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: 'clamp(12px,3.5vw,16px)', padding: 'clamp(12px,3vw,16px)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(201,168,76,0.1)', border: '0.5px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#c9a84c' }}>{b.num}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px,3.5vw,15px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{b.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px,2.5vw,11px)', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{b.verses} verses · {b.meaning}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: 'rgba(201,168,76,0.6)' }}>{b.arabic}</div>
                      <button onClick={() => onRemove(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}>❤️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
