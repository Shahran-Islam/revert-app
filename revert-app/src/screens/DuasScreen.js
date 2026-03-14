import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';

const CATEGORIES = ['All', 'Forgiveness', 'Guidance', 'Gratitude', 'Protection', 'Patience', 'Prophets'];

const DUAS = [
  {
    id: 1,
    title: 'The Opening Prayer',
    arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    transliteration: "Ihdinas siraatal mustaqeem",
    translation: '"Guide us to the straight path — the path of those upon whom You have bestowed favour."',
    reference: 'Al-Fatiha 1:6-7',
    note: 'Recited in every prayer — 17 times daily',
    category: 'Guidance',
    featured: false,
  },
  {
    id: 2,
    title: 'Dua for This World & Hereafter',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana aatina fid-dunya hasanatan wa fil aakhirati hasanatan waqina 'adhaban-naar",
    translation: '"Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire."',
    reference: 'Al-Baqarah 2:201',
    note: 'Described as the most comprehensive dua in the Quran',
    category: 'Protection',
    featured: true,
  },
  {
    id: 3,
    title: 'Dua for Forgiveness',
    arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا',
    transliteration: "Rabbana laa tu'akhidhnaa in naseenaa aw akhtanaa, Rabbana wa laa tahmil 'alaynaa isran",
    translation: '"Our Lord, do not take us to account if we forget or make a mistake. Our Lord, do not burden us as You burdened those before us."',
    reference: 'Al-Baqarah 2:286',
    note: 'Allah replied to this dua saying "I have done so"',
    category: 'Forgiveness',
    featured: false,
  },
  {
    id: 4,
    title: 'Dua of Adam & Hawwa (AS)',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: "Rabbana zalamna anfusana wa illam taghfir lana wa tarhamna lanakunanna minal khasireen",
    translation: '"Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers."',
    reference: "Al-A'raf 7:23",
    note: 'The first dua made by humanity after leaving Paradise',
    category: 'Forgiveness',
    featured: false,
  },
  {
    id: 5,
    title: 'Dua of Yunus (AS) — The Whale',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: "Laa ilaaha illaa anta subhaanaka innee kuntu minaz-zaalimeen",
    translation: '"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers."',
    reference: 'Al-Anbiya 21:87',
    note: 'Said by Prophet Yunus (AS) from inside the whale. The Prophet ﷺ said no Muslim recites this in distress except that Allah answers.',
    category: 'Prophets',
    featured: true,
  },
  {
    id: 6,
    title: 'Dua of Ibrahim (AS) for Guidance',
    arabic: 'رَبِّ هَبْ لِي حُكْمًا وَأَلْحِقْنِي بِالصَّالِحِينَ',
    transliteration: "Rabbi hab lee hukman wa alhiqnee bis-saaliheen",
    translation: '"My Lord, grant me wisdom and join me with the righteous."',
    reference: 'Ash-Shu\'ara 26:83',
    note: 'Dua of Prophet Ibrahim (AS) — the Friend of Allah',
    category: 'Prophets',
    featured: false,
  },
  {
    id: 7,
    title: 'Dua of Musa (AS) for Help',
    arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
    transliteration: "Rabbi innee limaa anzalta ilayya min khayrin faqeer",
    translation: '"My Lord, indeed I am in need of whatever good You would send down to me."',
    reference: 'Al-Qasas 28:24',
    note: 'Said by Prophet Musa (AS) after fleeing Egypt, alone and hungry',
    category: 'Prophets',
    featured: false,
  },
  {
    id: 8,
    title: 'Dua of Sulayman (AS) for Gratitude',
    arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ',
    transliteration: "Rabbi awzi'nee an ashkura ni'matakal-latee an'amta 'alayya wa 'alaa waalidayya",
    translation: '"My Lord, enable me to be grateful for Your favour which You have bestowed upon me and upon my parents."',
    reference: 'An-Naml 27:19',
    note: 'Dua of Prophet Sulayman (AS) — said upon hearing the speech of an ant',
    category: 'Gratitude',
    featured: false,
  },
  {
    id: 9,
    title: 'Dua of Ayyub (AS) in Hardship',
    arabic: 'أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
    transliteration: "Annee massaniyad-durru wa anta arhamur-raahimeen",
    translation: '"Indeed, adversity has touched me, and you are the Most Merciful of the merciful."',
    reference: 'Al-Anbiya 21:83',
    note: 'Dua of Prophet Ayyub (AS) after years of illness — Allah healed him',
    category: 'Patience',
    featured: false,
  },
  {
    id: 10,
    title: 'Dua for Steadfastness',
    arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    transliteration: "Rabbana afrigh 'alaynaa sabran wa thabbit aqdaamanaa wansurnaa 'alal qawmil kaafireen",
    translation: '"Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people."',
    reference: 'Al-Baqarah 2:250',
    note: 'Said by the army of Talut before facing Goliath',
    category: 'Patience',
    featured: false,
  },
  {
    id: 11,
    title: 'Dua for Righteous Children',
    arabic: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ',
    transliteration: "Rabbi hab lee min ladunka dhurriyyatan tayyibah, innaka samee'ud-du'aa",
    translation: '"My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication."',
    reference: 'Ali \'Imran 3:38',
    note: 'Dua of Prophet Zakariyya (AS) — Allah blessed him with Yahya (John)',
    category: 'Prophets',
    featured: false,
  },
  {
    id: 12,
    title: 'Dua for Mercy & Guidance',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً',
    transliteration: "Rabbana laa tuzigh quloobana ba'da idh hadaytana wa hab lana min ladunka rahmah",
    translation: '"Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy."',
    reference: 'Ali \'Imran 3:8',
    note: 'One of the most important duas — protecting the heart from going astray',
    category: 'Guidance',
    featured: false,
  },
  {
    id: 13,
    title: 'Dua of Musa (AS) Before Pharaoh',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    transliteration: "Rabbish-rah lee sadree wa yassir lee amree",
    translation: '"My Lord, expand for me my chest and ease for me my task."',
    reference: 'Ta-Ha 20:25-26',
    note: 'Said by Prophet Musa (AS) when sent to confront Pharaoh',
    category: 'Prophets',
    featured: false,
  },
  {
    id: 14,
    title: 'Dua for Protection from Hellfire',
    arabic: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
    transliteration: "Rabbanas-rif 'anna 'adhaaba jahannama inna 'adhaabahaa kaana gharaama",
    translation: '"Our Lord, avert from us the punishment of Hell. Indeed, its punishment is a permanent affliction."',
    reference: 'Al-Furqan 25:65',
    note: 'From the description of the servants of the Most Merciful',
    category: 'Protection',
    featured: false,
  },
  {
    id: 15,
    title: 'Dua for Parents',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: "Rabbir-hamhumaa kamaa rabbayaanee sagheeraa",
    translation: '"My Lord, have mercy upon them as they brought me up when I was small."',
    reference: 'Al-Isra 17:24',
    note: 'The Quran commands us to make this dua for our parents',
    category: 'Gratitude',
    featured: false,
  },
];

const CATEGORY_COLORS = {
  Forgiveness: { bg: 'rgba(138,99,218,0.15)', color: '#b088f5', border: 'rgba(138,99,218,0.3)' },
  Guidance:    { bg: 'rgba(111,179,216,0.12)', color: '#6fb3d8', border: 'rgba(111,179,216,0.25)' },
  Gratitude:   { bg: 'rgba(201,168,76,0.12)',  color: '#c9a84c', border: 'rgba(201,168,76,0.25)' },
  Protection:  { bg: 'rgba(45,180,150,0.12)',  color: '#2db496', border: 'rgba(45,180,150,0.25)' },
  Patience:    { bg: 'rgba(216,90,48,0.12)',   color: '#e8875a', border: 'rgba(216,90,48,0.25)' },
  Prophets:    { bg: 'rgba(201,168,76,0.12)',  color: '#c9a84c', border: 'rgba(201,168,76,0.25)' },
};

export default function DuasScreen({ addBookmark, removeBookmark, isBookmarked }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = DUAS.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = search === '' ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.translation.toLowerCase().includes(search.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter(d => d.featured);
  const regular = filtered.filter(d => !d.featured);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <div className="screen scrollable" style={{ background: '#0e0a1a', minHeight: '100%' }}>
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 12px', background: 'linear-gradient(180deg, #1a0e35 0%, transparent 100%)', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: 2 }}>Duas</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)' }}>
          Supplications from the Holy Quran · {DUAS.length} duas
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '0 16px 10px', flexShrink: 0 }}>
        <input
          type="text"
          placeholder="Search duas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 'clamp(10px, 3vw, 14px)', padding: 'clamp(10px, 2.5vw, 12px) 16px', fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#fff', outline: 'none' }}
        />
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 14px', overflowX: 'auto', flexShrink: 0 }}>
        <style>{`.cats-scroll::-webkit-scrollbar{display:none}`}</style>
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat;
          const col = CATEGORY_COLORS[cat];
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(9px, 2.5vw, 11px)',
              padding: '5px 12px',
              borderRadius: 20,
              border: active ? `0.5px solid ${col ? col.border : 'rgba(138,99,218,0.4)'}` : '0.5px solid rgba(255,255,255,0.08)',
              background: active ? (col ? col.bg : 'rgba(138,99,218,0.2)') : 'rgba(255,255,255,0.04)',
              color: active ? (col ? col.color : '#b088f5') : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.18s',
            }}>
              {cat}
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>

        {/* Featured */}
        {featured.map(dua => <DuaCard key={dua.id} dua={dua} expanded={expandedId === dua.id} onToggle={toggle} featured addBookmark={addBookmark} removeBookmark={removeBookmark} isBookmarked={isBookmarked} />)}
        {/* Regular */}
        {regular.map(dua => <DuaCard key={dua.id} dua={dua} expanded={expandedId === dua.id} onToggle={toggle} addBookmark={addBookmark} removeBookmark={removeBookmark} isBookmarked={isBookmarked} />)}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
            No duas found 🤲
          </div>
        )}
      </div>
    </div>
  );
}

function DuaCard({ dua, expanded, onToggle, featured, addBookmark, removeBookmark, isBookmarked }) {
  const col = CATEGORY_COLORS[dua.category] || CATEGORY_COLORS.Forgiveness;
  const saved = isBookmarked && isBookmarked(`dua-${dua.id}`);

  const toggleBookmark = (e) => {
    e.stopPropagation();
    if (saved) {
      removeBookmark(`dua-${dua.id}`);
    } else {
      addBookmark({
        id: `dua-${dua.id}`,
        type: 'dua',
        title: dua.title,
        arabic: dua.arabic,
        transliteration: dua.transliteration,
        translation: dua.translation,
        reference: dua.reference,
      });
    }
  };

  return (
    <div style={{
      background: featured ? `linear-gradient(135deg, ${col.bg}, rgba(255,255,255,0.02))` : 'rgba(255,255,255,0.03)',
      border: `0.5px solid ${featured ? col.border : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 'clamp(12px, 3.5vw, 16px)',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Card header — always visible */}
      <div
        onClick={() => onToggle(dua.id)}
        style={{ padding: 'clamp(12px, 3vw, 16px)', cursor: 'pointer' }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {featured && <span style={{ fontSize: 12 }}>⭐</span>}
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(8px, 2vw, 10px)',
              padding: '3px 8px',
              borderRadius: 20,
              background: col.bg,
              color: col.color,
              border: `0.5px solid ${col.border}`,
            }}>{dua.category}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(8px, 2vw, 10px)', color: 'rgba(255,255,255,0.25)' }}>{dua.reference}</div>
            <button onClick={toggleBookmark} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 0, lineHeight: 1 }}>
              {saved ? '❤️' : '🤍'}
            </button>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
              <path d="M3 5L7 9L11 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>
          {dua.title}
        </div>

        {/* Arabic — always shown */}
        <div style={{
          fontFamily: "'Amiri', serif",
          fontSize: 'clamp(17px, 5vw, 22px)',
          color: '#c9a84c',
          textAlign: 'right',
          direction: 'rtl',
          lineHeight: 1.9,
        }}>
          {dua.arabic}
        </div>
      </div>

      {/* Expanded section */}
      {expanded && (
        <div style={{
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          padding: 'clamp(12px, 3vw, 16px)',
          background: 'rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.2s ease',
        }}>
          {/* Transliteration */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(8px, 2vw, 10px)', color: col.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Transliteration
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(12px, 3.2vw, 14px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontStyle: 'italic' }}>
              {dua.transliteration}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

          {/* Translation */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(8px, 2vw, 10px)', color: col.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Meaning
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(12px, 3.2vw, 14px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontStyle: 'italic' }}>
              {dua.translation}
            </div>
          </div>

          {/* Note */}
          <div style={{
            background: col.bg,
            border: `0.5px solid ${col.border}`,
            borderRadius: 10,
            padding: '8px 12px',
          }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: col.color, lineHeight: 1.5 }}>
              📖 {dua.note}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
