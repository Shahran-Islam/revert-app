import React, { useState, useRef, useEffect, useCallback } from 'react';
import StatusBar from '../components/StatusBar';

const audioUrl = (surahNum) =>
  `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${String(surahNum).padStart(3, '0')}.mp3`;

const ALL_SURAHS = [
  { num: 1,   name: 'Al-Fatiha',        arabic: 'الفاتحة',        meaning: 'The Opening',          verses: 7,   type: 'Meccan' },
  { num: 2,   name: 'Al-Baqarah',       arabic: 'البقرة',          meaning: 'The Cow',              verses: 286, type: 'Medinan' },
  { num: 3,   name: "Ali 'Imran",       arabic: 'آل عمران',        meaning: "Family of Imran",      verses: 200, type: 'Medinan' },
  { num: 4,   name: 'An-Nisa',          arabic: 'النساء',          meaning: 'The Women',            verses: 176, type: 'Medinan' },
  { num: 5,   name: 'Al-Maidah',        arabic: 'المائدة',         meaning: 'The Table Spread',     verses: 120, type: 'Medinan' },
  { num: 6,   name: "Al-An'am",         arabic: 'الأنعام',         meaning: 'The Cattle',           verses: 165, type: 'Meccan' },
  { num: 7,   name: "Al-A'raf",         arabic: 'الأعراف',         meaning: 'The Heights',          verses: 206, type: 'Meccan' },
  { num: 8,   name: 'Al-Anfal',         arabic: 'الأنفال',         meaning: 'The Spoils of War',    verses: 75,  type: 'Medinan' },
  { num: 9,   name: 'At-Tawbah',        arabic: 'التوبة',          meaning: 'The Repentance',       verses: 129, type: 'Medinan' },
  { num: 10,  name: 'Yunus',            arabic: 'يونس',            meaning: 'Jonah',                verses: 109, type: 'Meccan' },
  { num: 11,  name: 'Hud',              arabic: 'هود',             meaning: 'Hud',                  verses: 123, type: 'Meccan' },
  { num: 12,  name: 'Yusuf',            arabic: 'يوسف',            meaning: 'Joseph',               verses: 111, type: 'Meccan' },
  { num: 13,  name: "Ar-Ra'd",          arabic: 'الرعد',           meaning: 'The Thunder',          verses: 43,  type: 'Medinan' },
  { num: 14,  name: 'Ibrahim',          arabic: 'إبراهيم',         meaning: 'Abraham',              verses: 52,  type: 'Meccan' },
  { num: 15,  name: 'Al-Hijr',          arabic: 'الحجر',           meaning: 'The Rocky Tract',      verses: 99,  type: 'Meccan' },
  { num: 16,  name: 'An-Nahl',          arabic: 'النحل',           meaning: 'The Bee',              verses: 128, type: 'Meccan' },
  { num: 17,  name: 'Al-Isra',          arabic: 'الإسراء',         meaning: 'The Night Journey',    verses: 111, type: 'Meccan' },
  { num: 18,  name: 'Al-Kahf',          arabic: 'الكهف',           meaning: 'The Cave',             verses: 110, type: 'Meccan' },
  { num: 19,  name: 'Maryam',           arabic: 'مريم',            meaning: 'Mary',                 verses: 98,  type: 'Meccan' },
  { num: 20,  name: 'Ta-Ha',            arabic: 'طه',              meaning: 'Ta-Ha',                verses: 135, type: 'Meccan' },
  { num: 21,  name: "Al-Anbiya",        arabic: 'الأنبياء',        meaning: 'The Prophets',         verses: 112, type: 'Meccan' },
  { num: 22,  name: 'Al-Hajj',          arabic: 'الحج',            meaning: 'The Pilgrimage',       verses: 78,  type: 'Medinan' },
  { num: 23,  name: "Al-Mu'minun",      arabic: 'المؤمنون',        meaning: 'The Believers',        verses: 118, type: 'Meccan' },
  { num: 24,  name: 'An-Nur',           arabic: 'النور',           meaning: 'The Light',            verses: 64,  type: 'Medinan' },
  { num: 25,  name: 'Al-Furqan',        arabic: 'الفرقان',         meaning: 'The Criterion',        verses: 77,  type: 'Meccan' },
  { num: 26,  name: "Ash-Shu'ara",      arabic: 'الشعراء',         meaning: 'The Poets',            verses: 227, type: 'Meccan' },
  { num: 27,  name: 'An-Naml',          arabic: 'النمل',           meaning: 'The Ant',              verses: 93,  type: 'Meccan' },
  { num: 28,  name: 'Al-Qasas',         arabic: 'القصص',           meaning: 'The Stories',          verses: 88,  type: 'Meccan' },
  { num: 29,  name: "Al-'Ankabut",      arabic: 'العنكبوت',        meaning: 'The Spider',           verses: 69,  type: 'Meccan' },
  { num: 30,  name: 'Ar-Rum',           arabic: 'الروم',           meaning: 'The Romans',           verses: 60,  type: 'Meccan' },
  { num: 31,  name: 'Luqman',           arabic: 'لقمان',           meaning: 'Luqman',               verses: 34,  type: 'Meccan' },
  { num: 32,  name: 'As-Sajdah',        arabic: 'السجدة',          meaning: 'The Prostration',      verses: 30,  type: 'Meccan' },
  { num: 33,  name: 'Al-Ahzab',         arabic: 'الأحزاب',         meaning: 'The Combined Forces',  verses: 73,  type: 'Medinan' },
  { num: 34,  name: 'Saba',             arabic: 'سبأ',             meaning: 'Sheba',                verses: 54,  type: 'Meccan' },
  { num: 35,  name: 'Fatir',            arabic: 'فاطر',            meaning: 'Originator',           verses: 45,  type: 'Meccan' },
  { num: 36,  name: 'Ya-Sin',           arabic: 'يس',              meaning: 'Ya Sin',               verses: 83,  type: 'Meccan' },
  { num: 37,  name: 'As-Saffat',        arabic: 'الصافات',         meaning: 'Those Lined Up',       verses: 182, type: 'Meccan' },
  { num: 38,  name: 'Sad',              arabic: 'ص',               meaning: 'The Letter Sad',       verses: 88,  type: 'Meccan' },
  { num: 39,  name: 'Az-Zumar',         arabic: 'الزمر',           meaning: 'The Groups',           verses: 75,  type: 'Meccan' },
  { num: 40,  name: 'Ghafir',           arabic: 'غافر',            meaning: 'The Forgiver',         verses: 85,  type: 'Meccan' },
  { num: 41,  name: 'Fussilat',         arabic: 'فصلت',            meaning: 'Explained in Detail',  verses: 54,  type: 'Meccan' },
  { num: 42,  name: 'Ash-Shura',        arabic: 'الشورى',          meaning: 'The Consultation',     verses: 53,  type: 'Meccan' },
  { num: 43,  name: 'Az-Zukhruf',       arabic: 'الزخرف',          meaning: 'The Ornaments of Gold',verses: 89,  type: 'Meccan' },
  { num: 44,  name: 'Ad-Dukhan',        arabic: 'الدخان',          meaning: 'The Smoke',            verses: 59,  type: 'Meccan' },
  { num: 45,  name: 'Al-Jathiyah',      arabic: 'الجاثية',         meaning: 'The Crouching',        verses: 37,  type: 'Meccan' },
  { num: 46,  name: 'Al-Ahqaf',         arabic: 'الأحقاف',         meaning: 'The Wind-Curved Sandhills', verses: 35, type: 'Meccan' },
  { num: 47,  name: 'Muhammad',         arabic: 'محمد',            meaning: 'Muhammad',             verses: 38,  type: 'Medinan' },
  { num: 48,  name: 'Al-Fath',          arabic: 'الفتح',           meaning: 'The Victory',          verses: 29,  type: 'Medinan' },
  { num: 49,  name: 'Al-Hujurat',       arabic: 'الحجرات',         meaning: 'The Rooms',            verses: 18,  type: 'Medinan' },
  { num: 50,  name: 'Qaf',              arabic: 'ق',               meaning: 'The Letter Qaf',       verses: 45,  type: 'Meccan' },
  { num: 51,  name: 'Adh-Dhariyat',     arabic: 'الذاريات',        meaning: 'The Winnowing Winds',  verses: 60,  type: 'Meccan' },
  { num: 52,  name: 'At-Tur',           arabic: 'الطور',           meaning: 'The Mount',            verses: 49,  type: 'Meccan' },
  { num: 53,  name: 'An-Najm',          arabic: 'النجم',           meaning: 'The Star',             verses: 62,  type: 'Meccan' },
  { num: 54,  name: 'Al-Qamar',         arabic: 'القمر',           meaning: 'The Moon',             verses: 55,  type: 'Meccan' },
  { num: 55,  name: 'Ar-Rahman',        arabic: 'الرحمن',          meaning: 'The Beneficent',       verses: 78,  type: 'Medinan' },
  { num: 56,  name: "Al-Waqi'ah",       arabic: 'الواقعة',         meaning: 'The Inevitable',       verses: 96,  type: 'Meccan' },
  { num: 57,  name: 'Al-Hadid',         arabic: 'الحديد',          meaning: 'The Iron',             verses: 29,  type: 'Medinan' },
  { num: 58,  name: 'Al-Mujadila',      arabic: 'المجادلة',        meaning: 'The Pleading Woman',   verses: 22,  type: 'Medinan' },
  { num: 59,  name: 'Al-Hashr',         arabic: 'الحشر',           meaning: 'The Exile',            verses: 24,  type: 'Medinan' },
  { num: 60,  name: 'Al-Mumtahanah',    arabic: 'الممتحنة',        meaning: 'She That is to be Examined', verses: 13, type: 'Medinan' },
  { num: 61,  name: 'As-Saf',           arabic: 'الصف',            meaning: 'The Ranks',            verses: 14,  type: 'Medinan' },
  { num: 62,  name: "Al-Jumu'ah",       arabic: 'الجمعة',          meaning: 'Friday',               verses: 11,  type: 'Medinan' },
  { num: 63,  name: 'Al-Munafiqun',     arabic: 'المنافقون',       meaning: 'The Hypocrites',       verses: 11,  type: 'Medinan' },
  { num: 64,  name: 'At-Taghabun',      arabic: 'التغابن',         meaning: 'The Mutual Disillusion',verses: 18, type: 'Medinan' },
  { num: 65,  name: 'At-Talaq',         arabic: 'الطلاق',          meaning: 'The Divorce',          verses: 12,  type: 'Medinan' },
  { num: 66,  name: 'At-Tahrim',        arabic: 'التحريم',         meaning: 'The Prohibition',      verses: 12,  type: 'Medinan' },
  { num: 67,  name: 'Al-Mulk',          arabic: 'الملك',           meaning: 'The Sovereignty',      verses: 30,  type: 'Meccan' },
  { num: 68,  name: 'Al-Qalam',         arabic: 'القلم',           meaning: 'The Pen',              verses: 52,  type: 'Meccan' },
  { num: 69,  name: 'Al-Haqqah',        arabic: 'الحاقة',          meaning: 'The Reality',          verses: 52,  type: 'Meccan' },
  { num: 70,  name: "Al-Ma'arij",       arabic: 'المعارج',         meaning: 'The Ascending Stairways', verses: 44, type: 'Meccan' },
  { num: 71,  name: 'Nuh',              arabic: 'نوح',             meaning: 'Noah',                 verses: 28,  type: 'Meccan' },
  { num: 72,  name: 'Al-Jinn',          arabic: 'الجن',            meaning: 'The Jinn',             verses: 28,  type: 'Meccan' },
  { num: 73,  name: 'Al-Muzzammil',     arabic: 'المزمل',          meaning: 'The Enshrouded One',   verses: 20,  type: 'Meccan' },
  { num: 74,  name: 'Al-Muddaththir',   arabic: 'المدثر',          meaning: 'The Cloaked One',      verses: 56,  type: 'Meccan' },
  { num: 75,  name: 'Al-Qiyamah',       arabic: 'القيامة',         meaning: 'The Resurrection',     verses: 40,  type: 'Meccan' },
  { num: 76,  name: 'Al-Insan',         arabic: 'الإنسان',         meaning: 'The Man',              verses: 31,  type: 'Medinan' },
  { num: 77,  name: 'Al-Mursalat',      arabic: 'المرسلات',        meaning: 'The Emissaries',       verses: 50,  type: 'Meccan' },
  { num: 78,  name: "An-Naba'",         arabic: 'النبأ',           meaning: 'The Tidings',          verses: 40,  type: 'Meccan' },
  { num: 79,  name: "An-Nazi'at",       arabic: 'النازعات',        meaning: 'Those who drag forth', verses: 46,  type: 'Meccan' },
  { num: 80,  name: "'Abasa",           arabic: 'عبس',             meaning: 'He Frowned',           verses: 42,  type: 'Meccan' },
  { num: 81,  name: 'At-Takwir',        arabic: 'التكوير',         meaning: 'The Overthrowing',     verses: 29,  type: 'Meccan' },
  { num: 82,  name: 'Al-Infitar',       arabic: 'الانفطار',        meaning: 'The Cleaving',         verses: 19,  type: 'Meccan' },
  { num: 83,  name: 'Al-Mutaffifin',    arabic: 'المطففين',        meaning: 'The Defrauding',       verses: 36,  type: 'Meccan' },
  { num: 84,  name: 'Al-Inshiqaq',      arabic: 'الانشقاق',        meaning: 'The Sundering',        verses: 25,  type: 'Meccan' },
  { num: 85,  name: 'Al-Buruj',         arabic: 'البروج',          meaning: 'The Mansions of Stars', verses: 22, type: 'Meccan' },
  { num: 86,  name: 'At-Tariq',         arabic: 'الطارق',          meaning: 'The Morning Star',     verses: 17,  type: 'Meccan' },
  { num: 87,  name: "Al-A'la",          arabic: 'الأعلى',          meaning: 'The Most High',        verses: 19,  type: 'Meccan' },
  { num: 88,  name: 'Al-Ghashiyah',     arabic: 'الغاشية',         meaning: 'The Overwhelming',     verses: 26,  type: 'Meccan' },
  { num: 89,  name: 'Al-Fajr',          arabic: 'الفجر',           meaning: 'The Dawn',             verses: 30,  type: 'Meccan' },
  { num: 90,  name: 'Al-Balad',         arabic: 'البلد',           meaning: 'The City',             verses: 20,  type: 'Meccan' },
  { num: 91,  name: 'Ash-Shams',        arabic: 'الشمس',           meaning: 'The Sun',              verses: 15,  type: 'Meccan' },
  { num: 92,  name: 'Al-Layl',          arabic: 'الليل',           meaning: 'The Night',            verses: 21,  type: 'Meccan' },
  { num: 93,  name: 'Ad-Duha',          arabic: 'الضحى',           meaning: 'The Morning Hours',    verses: 11,  type: 'Meccan' },
  { num: 94,  name: 'Ash-Sharh',        arabic: 'الشرح',           meaning: 'The Relief',           verses: 8,   type: 'Meccan' },
  { num: 95,  name: 'At-Tin',           arabic: 'التين',           meaning: 'The Fig',              verses: 8,   type: 'Meccan' },
  { num: 96,  name: "Al-'Alaq",         arabic: 'العلق',           meaning: 'The Clot',             verses: 19,  type: 'Meccan' },
  { num: 97,  name: 'Al-Qadr',          arabic: 'القدر',           meaning: 'The Power',            verses: 5,   type: 'Meccan' },
  { num: 98,  name: 'Al-Bayyinah',      arabic: 'البينة',          meaning: 'The Clear Proof',      verses: 8,   type: 'Medinan' },
  { num: 99,  name: 'Az-Zalzalah',      arabic: 'الزلزلة',         meaning: 'The Earthquake',       verses: 8,   type: 'Medinan' },
  { num: 100, name: "Al-'Adiyat",       arabic: 'العاديات',        meaning: 'The Courser',          verses: 11,  type: 'Meccan' },
  { num: 101, name: "Al-Qari'ah",       arabic: 'القارعة',         meaning: 'The Calamity',         verses: 11,  type: 'Meccan' },
  { num: 102, name: 'At-Takathur',      arabic: 'التكاثر',         meaning: 'The Rivalry in World Increase', verses: 8, type: 'Meccan' },
  { num: 103, name: 'Al-Asr',           arabic: 'العصر',           meaning: 'The Declining Day',    verses: 3,   type: 'Meccan' },
  { num: 104, name: 'Al-Humazah',       arabic: 'الهمزة',          meaning: 'The Traducer',         verses: 9,   type: 'Meccan' },
  { num: 105, name: 'Al-Fil',           arabic: 'الفيل',           meaning: 'The Elephant',         verses: 5,   type: 'Meccan' },
  { num: 106, name: 'Quraysh',          arabic: 'قريش',            meaning: 'Quraysh',              verses: 4,   type: 'Meccan' },
  { num: 107, name: "Al-Ma'un",         arabic: 'الماعون',         meaning: 'The Small Kindnesses', verses: 7,   type: 'Meccan' },
  { num: 108, name: 'Al-Kawthar',       arabic: 'الكوثر',          meaning: 'The Abundance',        verses: 3,   type: 'Meccan' },
  { num: 109, name: 'Al-Kafirun',       arabic: 'الكافرون',        meaning: 'The Disbelievers',     verses: 6,   type: 'Meccan' },
  { num: 110, name: 'An-Nasr',          arabic: 'النصر',           meaning: 'The Divine Support',   verses: 3,   type: 'Medinan' },
  { num: 111, name: 'Al-Masad',         arabic: 'المسد',           meaning: 'The Palm Fiber',       verses: 5,   type: 'Meccan' },
  { num: 112, name: 'Al-Ikhlas',        arabic: 'الإخلاص',         meaning: 'Sincerity',            verses: 4,   type: 'Meccan' },
  { num: 113, name: 'Al-Falaq',         arabic: 'الفلق',           meaning: 'The Daybreak',         verses: 5,   type: 'Meccan' },
  { num: 114, name: 'An-Nas',           arabic: 'الناس',           meaning: 'Mankind',              verses: 6,   type: 'Meccan' },
];

export default function QuranScreen() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSurah, setActiveSurah] = useState(112);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [search, setSearch] = useState('');
  const [audioError, setAudioError] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [verses, setVerses] = useState([]);
  const [versesLoading, setVersesLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setAudioError(false);
    setAudioLoading(true);
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
    const onCanPlay = () => setAudioLoading(false);
    const onEnd = () => { setPlaying(false); setProgress(0); setCurrentTime(0); };
    const onError = () => { setAudioError(true); setAudioLoading(false); setPlaying(false); };
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

  const fetchVerses = useCallback(async (num) => {
    setVersesLoading(true);
    setVerses([]);
    try {
      const res = await fetch(
        `https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,en.asad`
      );
      const data = await res.json();
      if (data.code === 200) {
        const arabicAyahs = data.data[0].ayahs;
        const englishAyahs = data.data[1].ayahs;
        setVerses(arabicAyahs.map((a, i) => ({
          number: a.numberInSurah,
          arabic: a.text,
          translation: englishAyahs[i]?.text || '',
        })));
      }
    } catch (e) {
      setVerses([]);
    } finally {
      setVersesLoading(false);
    }
  }, []);

  const openSurah = (surah) => {
    setSelectedSurah(surah);
    setActiveSurah(surah.num);
    fetchVerses(surah.num);
    setTimeout(() => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    }, 500);
  };

  const closeSurah = () => {
    setSelectedSurah(null);
    audioRef.current?.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => setAudioError(true)); }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const filtered = ALL_SURAHS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.arabic.includes(search) ||
    s.meaning.toLowerCase().includes(search.toLowerCase()) ||
    String(s.num).includes(search)
  );

  // ── SURAH DETAIL VIEW ──
  if (selectedSurah) {
    return (
      <div className="screen" style={{ background: '#1a0f0a' }}>
        <audio ref={audioRef} preload="auto" />
        <StatusBar color="rgba(255,255,255,0.5)" />

        <div style={{ padding: '4px 16px 12px', background: 'linear-gradient(180deg, #2a1408 0%, transparent 100%)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <button onClick={closeSurah} style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '8px 14px', color: '#fff', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13, flexShrink: 0 }}>
              ← Back
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(15px, 4.5vw, 19px)', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedSurah.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{selectedSurah.meaning} · {selectedSurah.verses} verses · {selectedSurah.type}</div>
            </div>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: 'rgba(201,168,76,0.7)', flexShrink: 0 }}>{selectedSurah.arabic}</div>
          </div>

          {/* Audio player */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '10px 14px', border: '0.5px solid rgba(201,168,76,0.2)' }}>
            <button onClick={togglePlay} disabled={audioLoading} style={{ width: 34, height: 34, borderRadius: '50%', background: audioLoading ? 'rgba(201,168,76,0.4)' : '#c9a84c', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {audioLoading
                ? <div style={{ width: 10, height: 10, border: '2px solid #1a0f0a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }}/>
                : playing
                  ? <svg width="11" height="11" viewBox="0 0 12 12"><rect x="1" y="1" width="3.5" height="10" fill="#1a0f0a" rx="1"/><rect x="7.5" y="1" width="3.5" height="10" fill="#1a0f0a" rx="1"/></svg>
                  : <svg width="11" height="11" viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11" fill="#1a0f0a"/></svg>
              }
            </button>
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 3, cursor: 'pointer' }}
              onClick={(e) => { const a = audioRef.current; if (!a?.duration) return; const r = e.currentTarget.getBoundingClientRect(); a.currentTime = ((e.clientX - r.left) / r.width) * a.duration; }}>
              <div style={{ width: `${progress * 100}%`, height: '100%', background: '#c9a84c', borderRadius: 3, transition: 'width 0.3s linear' }}/>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.35)', minWidth: 28 }}>{formatTime(currentTime)}</span>
          </div>
          {audioError && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,100,100,0.7)', marginTop: 6, textAlign: 'center' }}>Audio unavailable — check internet connection</div>}
        </div>

        {/* Verses */}
        <div className="scrollable" style={{ flex: 1, padding: '0 16px 24px' }}>
          {selectedSurah.num !== 9 && (
            <div style={{ textAlign: 'center', fontFamily: "'Amiri', serif", fontSize: 'clamp(18px, 5.5vw, 24px)', color: 'rgba(201,168,76,0.65)', padding: '14px 0 16px', borderBottom: '0.5px solid rgba(255,255,255,0.06)', marginBottom: '4px' }}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
          )}
          {versesLoading
            ? [1,2,3,4].map(i => <div key={i} style={{ height: 90, borderRadius: 12, background: 'rgba(255,255,255,0.04)', margin: '10px 0', animation: 'shimmer 1.5s ease-in-out infinite' }}/>)
            : verses.map((v) => (
              <div key={v.number} style={{ padding: '16px 0', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '0.5px solid rgba(201,168,76,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: '#c9a84c' }}>
                    {v.number}
                  </div>
                </div>
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(20px, 6vw, 26px)', color: '#e8d5a3', textAlign: 'right', direction: 'rtl', lineHeight: 2, marginBottom: 10 }}>
                  {v.arabic}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(12px, 3.2vw, 14px)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  {v.translation}
                </div>
              </div>
            ))
          }
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // ── MAIN LIST VIEW ──
  return (
    <div className="screen scrollable" style={{ background: '#1a0f0a', minHeight: '100%' }}>
      <audio ref={audioRef} preload="auto" />
      <StatusBar color="rgba(255,255,255,0.5)" />

      <div style={{ padding: '4px 20px 14px', background: 'linear-gradient(180deg, #2a1408 0%, transparent 100%)', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: 2 }}>Quran</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)' }}>114 Surahs · Tap to read & listen</div>
      </div>

      <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
        <input type="text" placeholder="Search by name, number or meaning..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 'clamp(10px, 3vw, 14px)', padding: 'clamp(10px, 2.5vw, 13px) 16px', fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#fff', outline: 'none' }}
        />
      </div>

      <div style={{ padding: '0 20px 6px', fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>
        {filtered.length} surah{filtered.length !== 1 ? 's' : ''}
      </div>

      <div style={{ padding: '0 16px 24px' }}>
        {filtered.map((s, i) => (
          <div key={s.num} onClick={() => openSurah(s)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 'clamp(11px, 3vw, 14px) 8px', borderBottom: i < filtered.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none', cursor: 'pointer', borderRadius: activeSurah === s.num ? 10 : 0, background: activeSurah === s.num ? 'rgba(201,168,76,0.07)' : 'transparent', transition: 'background 0.18s' }}
          >
            <div style={{ width: 'clamp(32px, 8vw, 38px)', height: 'clamp(32px, 8vw, 38px)', borderRadius: 9, background: activeSurah === s.num ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.07)', border: `0.5px solid ${activeSurah === s.num ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {activeSurah === s.num && playing
                ? <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                    {[8,14,10].map((h, idx) => <div key={idx} style={{ width: 3, background: '#c9a84c', borderRadius: 2, height: h, animation: `bar${idx+1} 0.6s ease-in-out infinite alternate` }}/>)}
                  </div>
                : <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#c9a84c' }}>{s.num}</span>
              }
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: activeSurah === s.num ? '#c9a84c' : 'rgba(255,255,255,0.85)', fontWeight: activeSurah === s.num ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 11px)', color: 'rgba(255,255,255,0.32)', marginTop: 2 }}>{s.verses} verses · {s.meaning}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(16px, 4.5vw, 20px)', color: activeSurah === s.num ? '#c9a84c' : 'rgba(201,168,76,0.55)' }}>{s.arabic}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.type}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes bar1 { from { height: 4px; } to { height: 12px; } }
        @keyframes bar2 { from { height: 10px; } to { height: 4px; } }
        @keyframes bar3 { from { height: 6px; } to { height: 14px; } }
      `}</style>
    </div>
  );
}
