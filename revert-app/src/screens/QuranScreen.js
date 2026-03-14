import React, { useState, useRef, useEffect } from 'react';
import StatusBar from '../components/StatusBar';

// Full surah MP3s — Mishari Rashid Alafasy — complete recitation per surah
const audioUrl = (surahNum) =>
  `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${String(surahNum).padStart(3, '0')}.mp3`;

const SURAHS = [
  { num: 1,   name: 'Al-Fatiha',    arabic: 'الفاتحة',    meaning: 'The Opening',     verses: 7,   type: 'Meccan' },
  { num: 2,   name: 'Al-Baqarah',   arabic: 'البقرة',     meaning: 'The Cow',         verses: 286, type: 'Medinan' },
  { num: 3,   name: "Ali 'Imran",   arabic: 'آل عمران',   meaning: 'Family of Imran', verses: 200, type: 'Medinan' },
  { num: 36,  name: 'Ya-Sin',       arabic: 'يس',         meaning: 'Ya Sin',          verses: 83,  type: 'Meccan' },
  { num: 67,  name: 'Al-Mulk',      arabic: 'الملك',      meaning: 'The Sovereignty', verses: 30,  type: 'Meccan' },
  { num: 112, name: 'Al-Ikhlas',    arabic: 'الإخلاص',    meaning: 'Sincerity',       verses: 4,   type: 'Meccan' },
  { num: 113, name: 'Al-Falaq',     arabic: 'الفلق',      meaning: 'The Daybreak',    verses: 5,   type: 'Meccan' },
  { num: 114, name: 'An-Nas',       arabic: 'الناس',      meaning: 'Mankind',         verses: 6,   type: 'Meccan' },
];

// Beginner-friendly surah spotlight
const FEATURED = {
  num: 112,
  name: 'Al-Ikhlas',
  arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ ۝ ٱللَّهُ ٱلصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
  translation: '"Say, He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent."',
  verses: 4,
};

export default function QuranScreen() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSurah, setActiveSurah] = useState(FEATURED.num);
  const [search, setSearch] = useState('');
  const [audioError, setAudioError] = useState(false);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // When activeSurah changes, reload and play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setAudioError(false);
    setLoading(true);
    audio.src = audioUrl(activeSurah);
    audio.load();
  }, [activeSurah]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onCanPlay = () => setLoading(false);
    const onEnd = () => { setPlaying(false); setProgress(0); setCurrentTime(0); };
    const onError = () => { setAudioError(true); setLoading(false); setPlaying(false); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      setAudioError(false);
      audio.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
    }
  };

  const selectSurah = (num) => {
    if (activeSurah === num) {
      togglePlay();
    } else {
      setActiveSurah(num);
      // Small delay to let audio load then autoplay
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) audio.play().then(() => setPlaying(true)).catch(() => {});
      }, 400);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  };

  const currentSurahData = SURAHS.find(s => s.num === activeSurah) || SURAHS[5];

  const filtered = SURAHS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.arabic.includes(search) ||
    s.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="screen scrollable" style={{ background: '#1a0f0a', minHeight: '100%' }}>
      <audio ref={audioRef} preload="auto" />
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 16px', background: 'linear-gradient(180deg, #2a1408 0%, transparent 100%)' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: '2px' }}>Quran</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)' }}>
          114 Surahs · Mishari Alafasy Recitation
        </div>
      </div>

      {/* Now Playing Card */}
      <div style={{
        margin: '0 16px 16px',
        background: 'linear-gradient(135deg, #3d1a08 0%, #2a1005 100%)',
        borderRadius: 'clamp(14px, 4vw, 20px)',
        border: '0.5px solid rgba(201,168,76,0.25)',
        padding: 'clamp(16px, 4vw, 22px)',
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(201,168,76,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          {playing ? '▶ Now Playing' : 'Selected'} · Surah {currentSurahData.name}
        </div>
        <div style={{
          fontFamily: "'Amiri', serif",
          fontSize: 'clamp(18px, 5.5vw, 26px)',
          color: '#c9a84c',
          textAlign: 'right',
          lineHeight: 1.7,
          marginBottom: '10px',
          direction: 'rtl',
        }}>
          {FEATURED.arabic}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '14px' }}>
          {FEATURED.translation}
        </div>

        {/* Audio Player */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={togglePlay}
            disabled={loading}
            style={{
              width: 'clamp(32px, 8vw, 40px)',
              height: 'clamp(32px, 8vw, 40px)',
              borderRadius: '50%',
              background: loading ? 'rgba(201,168,76,0.4)' : '#c9a84c',
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
          >
            {loading
              ? <div style={{ width: 10, height: 10, border: '2px solid #1a0f0a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
              : playing
                ? <svg width="12" height="12" viewBox="0 0 12 12"><rect x="1" y="1" width="3.5" height="10" fill="#1a0f0a" rx="1"/><rect x="7.5" y="1" width="3.5" height="10" fill="#1a0f0a" rx="1"/></svg>
                : <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11" fill="#1a0f0a"/></svg>
            }
          </button>

          {/* Progress bar */}
          <div
            style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.12)', borderRadius: 3, cursor: 'pointer', position: 'relative' }}
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || !audio.duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
            }}
          >
            <div style={{ width: `${progress * 100}%`, height: '100%', background: '#c9a84c', borderRadius: 3, transition: 'width 0.3s linear' }}/>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.35)', flexShrink: 0, minWidth: 28 }}>
            {formatTime(currentTime)}
          </span>
        </div>

        {audioError && (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(255,100,100,0.7)', marginTop: '8px', textAlign: 'center' }}>
            Audio unavailable — check your internet connection
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 12px' }}>
        <input
          type="text"
          placeholder="Search surahs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 'clamp(10px, 3vw, 14px)',
            padding: 'clamp(10px, 2.5vw, 13px) 16px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(13px, 3.5vw, 15px)',
            color: '#fff',
            outline: 'none',
          }}
        />
      </div>

      {/* Surah List */}
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {filtered.map((s, i) => {
          const isActive = activeSurah === s.num;
          return (
            <div
              key={s.num}
              onClick={() => selectSurah(s.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: 'clamp(12px, 3vw, 15px) 8px',
                borderBottom: i < filtered.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
                cursor: 'pointer',
                borderRadius: isActive ? '10px' : '0',
                background: isActive ? 'rgba(201,168,76,0.08)' : 'transparent',
                transition: 'background 0.18s',
              }}
            >
              <div style={{
                width: 'clamp(30px, 8vw, 36px)',
                height: 'clamp(30px, 8vw, 36px)',
                borderRadius: 8,
                background: isActive ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.08)',
                border: `0.5px solid ${isActive ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.18)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {isActive && playing
                  ? <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                      {[1,2,3].map(b => (
                        <div key={b} style={{ width: 3, background: '#c9a84c', borderRadius: 2, animation: `bar${b} 0.6s ease-in-out infinite alternate`, height: `${[8,14,10][b-1]}px` }}/>
                      ))}
                    </div>
                  : <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#c9a84c' }}>{s.num}</span>
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: isActive ? '#c9a84c' : 'rgba(255,255,255,0.85)', fontWeight: isActive ? 500 : 400 }}>{s.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 11px)', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{s.verses} verses · {s.meaning}</div>
              </div>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(16px, 4.5vw, 20px)', color: isActive ? '#c9a84c' : 'rgba(201,168,76,0.5)' }}>{s.arabic}</div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bar1 { from { height: 4px; } to { height: 12px; } }
        @keyframes bar2 { from { height: 10px; } to { height: 4px; } }
        @keyframes bar3 { from { height: 6px; } to { height: 14px; } }
      `}</style>
    </div>
  );
}
