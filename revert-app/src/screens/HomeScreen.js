import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import usePrayerTimes from '../hooks/usePrayerTimes';

// 30 daily verses — one per day of the month
const DAILY_VERSES = [
  { arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', transliteration: "Inna ma'al 'usri yusraa", translation: 'Indeed, with hardship will be ease.', ref: 'Ash-Sharh 94:6' },
  { arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ', transliteration: "Wa huwa ma'akum ayna maa kuntum", translation: 'And He is with you wherever you are.', ref: 'Al-Hadid 57:4' },
  { arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', transliteration: "Innallaaha ma'as-saabireen", translation: 'Indeed, Allah is with the patient.', ref: 'Al-Baqarah 2:153' },
  { arabic: 'وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ', transliteration: "Wa nahnu aqrabu ilayhi min hablil wareed", translation: 'We are closer to him than his jugular vein.', ref: 'Qaf 50:16' },
  { arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ', transliteration: "Fadhkuroonee adhkurkum", translation: 'Remember Me and I will remember you.', ref: 'Al-Baqarah 2:152' },
  { arabic: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ', transliteration: "Innallaaha laa yudee'u ajral muhsineen", translation: 'Indeed, Allah does not allow the reward of those who do good to be lost.', ref: 'Yusuf 12:90' },
  { arabic: 'وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ', transliteration: "Wa 'asaa an takrahoo shay'an wa huwa khayrun lakum", translation: 'Perhaps you dislike a thing and it is good for you.', ref: 'Al-Baqarah 2:216' },
  { arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', transliteration: "Hasbunallaahu wa ni'mal wakeel", translation: 'Allah is sufficient for us, and He is the best disposer of affairs.', ref: 'Ali Imran 3:173' },
  { arabic: 'اللَّهُ لَطِيفٌ بِعِبَادِهِ', transliteration: "Allaahu lateefun bi'ibaadih", translation: 'Allah is Kind to His servants.', ref: 'Ash-Shura 42:19' },
  { arabic: 'وَاللَّهُ يُحِبُّ الصَّابِرِينَ', transliteration: "Wallaahu yuhibbus-saabireen", translation: 'And Allah loves the patient.', ref: 'Ali Imran 3:146' },
  { arabic: 'إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ', transliteration: "Innallaaha ghafoorur raheem", translation: 'Indeed, Allah is Forgiving and Merciful.', ref: 'Al-Baqarah 2:173' },
  { arabic: 'وَهُوَ الْغَفُورُ الْوَدُودُ', transliteration: "Wa huwal ghafooroul wadood", translation: 'And He is the Forgiving, the Affectionate.', ref: 'Al-Buruj 85:14' },
  { arabic: 'رَبِّ زِدْنِي عِلْمًا', transliteration: "Rabbi zidnee 'ilmaa", translation: 'My Lord, increase me in knowledge.', ref: 'Ta-Ha 20:114' },
  { arabic: 'إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', transliteration: "Innallaaha 'alaa kulli shay'in qadeer", translation: 'Indeed, Allah has power over all things.', ref: 'Al-Baqarah 2:20' },
  { arabic: 'وَلَذِكْرُ اللَّهِ أَكْبَرُ', transliteration: "Wa ladhikrullaahi akbar", translation: 'And the remembrance of Allah is greater.', ref: 'Al-Ankabut 29:45' },
  { arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', transliteration: "Fa inna ma'al 'usri yusraa", translation: 'For indeed, with hardship will be ease.', ref: 'Ash-Sharh 94:5' },
  { arabic: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ', transliteration: "Wallaahu khairur raaziqeen", translation: 'And Allah is the best of providers.', ref: "Al-Jumu'ah 62:11" },
  { arabic: 'إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ', transliteration: "Innallaaha samee'un 'aleem", translation: 'Indeed, Allah is Hearing and Knowing.', ref: 'Al-Baqarah 2:227' },
  { arabic: 'وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ', transliteration: "Wallaahu ya'lamu wa antum laa ta'lamoon", translation: 'And Allah knows while you know not.', ref: 'Al-Baqarah 2:232' },
  { arabic: 'فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ', transliteration: "Fa aynamaa tuwalluu fathamma wajhullaah", translation: 'So wherever you turn, there is the Face of Allah.', ref: 'Al-Baqarah 2:115' },
  { arabic: 'إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ', transliteration: "Innallaaha yuhibbul mutawakkileen", translation: 'Indeed, Allah loves those who rely upon Him.', ref: 'Ali Imran 3:159' },
  { arabic: 'وَهُوَ الْقَاهِرُ فَوْقَ عِبَادِهِ', transliteration: "Wa huwal qaahiru fawqa 'ibaadih", translation: 'And He is the subjugator over His servants.', ref: "Al-An'am 6:18" },
  { arabic: 'وَأَنَّ إِلَىٰ رَبِّكَ الْمُنتَهَىٰ', transliteration: "Wa anna ilaa rabbikal muntahaa", translation: 'And that to your Lord is the finality.', ref: 'An-Najm 53:42' },
  { arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ', transliteration: "Wa man yatawakkal 'alallaahi fahuwa hasbuh", translation: 'And whoever relies upon Allah — then He is sufficient for him.', ref: 'At-Talaq 65:3' },
  { arabic: 'وَاللَّهُ وَلِيُّ الْمُؤْمِنِينَ', transliteration: "Wallaahu waliyyul mu'mineen", translation: 'And Allah is the Ally of the believers.', ref: 'Ali Imran 3:68' },
  { arabic: 'إِنَّ الْأَبْرَارَ لَفِي نَعِيمٍ', transliteration: "Innal abraara lafee na'eem", translation: 'Indeed, the righteous will be in pleasure.', ref: 'Al-Infitar 82:13' },
  { arabic: 'وَاللَّهُ أَحَبُّ إِلَيْكُم', transliteration: "Wallaahu ahabbu ilaykum", translation: 'And Allah is most loving to you.', ref: 'Al-Baqarah 2:165' },
  { arabic: 'إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوا', transliteration: "Innallaaha ma'al ladheenattaqaw", translation: 'Indeed, Allah is with those who fear Him.', ref: 'An-Nahl 16:128' },
  { arabic: 'وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ', transliteration: "Wa huwa bikulli shay'in 'aleem", translation: 'And He is knowing of all things.', ref: 'Al-Baqarah 2:29' },
  { arabic: 'إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ', transliteration: "Inna rahmatallaahi qareebum minal muhsineen", translation: 'Indeed, the mercy of Allah is near to the doers of good.', ref: "Al-A'raf 7:56" },
];

export default function HomeScreen({ onNavigate }) {
  const { nextPrayer, location, loading, countdown } = usePrayerTimes();
  const [greeting, setGreeting] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  // Pick verse based on day of month so it changes daily
  const todayVerse = DAILY_VERSES[new Date().getDate() % DAILY_VERSES.length];

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good Morning');
    else if (h < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="screen scrollable" style={{ background: 'linear-gradient(160deg, #0f1a12 0%, #162a1a 60%, #0d2020 100%)', minHeight: '100%' }}>

      {/* Welcome overlay — shown when icon tapped */}
      {showWelcome && (
        <WelcomeOverlay onClose={() => setShowWelcome(false)} />
      )}

      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 14px', position: 'relative' }}>
        {/* Letter icon — top right */}
        <button
          onClick={() => setShowWelcome(true)}
          style={{
            position: 'absolute',
            top: 4,
            right: 20,
            background: 'rgba(138,99,218,0.15)',
            border: '0.5px solid rgba(138,99,218,0.3)',
            borderRadius: 12,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 18,
          }}
        >
          💌
        </button>

        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(20px, 5.5vw, 26px)', color: '#c9a84c', textAlign: 'center', marginBottom: 4 }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.35)', textAlign: 'center', letterSpacing: '0.05em' }}>
          {greeting} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Next Prayer Card */}
      <div onClick={() => onNavigate('prayer')} style={{ margin: '0 16px 14px', background: 'linear-gradient(135deg, #1e4d30 0%, #14382a 100%)', borderRadius: 'clamp(14px, 4vw, 20px)', padding: 'clamp(16px, 4vw, 22px)', border: '0.5px solid rgba(201,168,76,0.3)', cursor: 'pointer' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Next Prayer</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(28px, 8vw, 36px)', color: '#fff', lineHeight: 1 }}>
              {loading ? '...' : (nextPrayer?.name || 'Asr')}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
              {loading ? '' : (nextPrayer?.timeStr || '')} · {location}
            </div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: '#c9a84c', background: 'rgba(201,168,76,0.12)', padding: '6px 12px', borderRadius: 20, border: '0.5px solid rgba(201,168,76,0.25)' }}>
            {countdown || 'Loading...'}
          </div>
        </div>
      </div>

      {/* ── DAILY VERSE ── */}
      <div style={{ margin: '0 16px 14px', background: 'rgba(201,168,76,0.05)', border: '0.5px solid rgba(201,168,76,0.18)', borderRadius: 'clamp(14px, 4vw, 18px)', padding: 'clamp(14px, 3.5vw, 20px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ✨ Verse of the Day
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 10px)', color: 'rgba(255,255,255,0.25)' }}>
            {todayVerse.ref}
          </div>
        </div>
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(20px, 6vw, 26px)', color: '#c9a84c', textAlign: 'right', direction: 'rtl', lineHeight: 1.9, marginBottom: 8 }}>
          {todayVerse.arabic}
        </div>
        <div style={{ width: '100%', height: '0.5px', background: 'rgba(201,168,76,0.15)', marginBottom: 8 }} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.8vw, 12px)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 4 }}>
          {todayVerse.transliteration}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
          "{todayVerse.translation}"
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(8px, 2vw, 12px)', padding: '0 16px 14px' }}>
        <QuickTile icon="📖" label="Daily Quran" sub="Surah Al-Fatiha" onClick={() => onNavigate('quran')} />
        <QuickTile icon="🧭" label="Qibla" sub="Tap to find direction" onClick={() => onNavigate('prayer')} />
        <QuickTile icon="🤲" label="Duas" sub="Quranic supplications" onClick={() => onNavigate('duas')} />
        <QuickTile icon="🔖" label="Bookmarks" sub="Your saved items" onClick={() => onNavigate('bookmarks')} />
      </div>

      {/* Dhikr reminder */}
      <div style={{ margin: '0 16px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 'clamp(12px, 3.5vw, 16px)', border: '0.5px solid rgba(255,255,255,0.07)', padding: 'clamp(14px, 3.5vw, 20px)' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          Remember Allah
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          {[
            { arabic: 'سُبْحَانَ اللهِ', text: 'Subhanallah' },
            { arabic: 'الحمد لله', text: 'Alhamdulillah' },
            { arabic: 'اللهُ أكبر', text: 'Allahu Akbar' },
          ].map(d => (
            <div key={d.text}>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(14px, 4.5vw, 18px)', color: '#c9a84c', marginBottom: 4 }}>{d.arabic}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(8px, 2vw, 10px)', color: 'rgba(255,255,255,0.35)' }}>{d.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickTile({ icon, label, sub, onClick }) {
  return (
    <div onClick={onClick} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 'clamp(12px, 3.5vw, 16px)', padding: 'clamp(12px, 3vw, 18px)', cursor: 'pointer' }}
      onTouchStart={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
      onTouchEnd={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
    >
      <div style={{ fontSize: 'clamp(22px, 6vw, 28px)', marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.35)' }}>{sub}</div>
    </div>
  );
}

function WelcomeOverlay({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'flex-end',
      animation: 'fadeIn 0.25s ease',
    }}
      onClick={onClose}
    >
      {/* Bottom sheet */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          background: '#0e0a1a',
          borderRadius: '24px 24px 0 0',
          border: '0.5px solid rgba(138,99,218,0.25)',
          padding: 'clamp(20px, 5vw, 28px)',
          paddingBottom: 'calc(clamp(20px, 5vw, 28px) + env(safe-area-inset-bottom, 20px))',
          animation: 'slideUp 0.3s ease',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle bar */}
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', margin: '0 auto 20px' }} />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 24 }}>💌</div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '6px 14px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
            Close
          </button>
        </div>

        {/* Bismillah */}
        <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: 'rgba(201,168,76,0.65)', textAlign: 'center', marginBottom: 14 }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>

        {/* Dear Deanna */}
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5.5vw, 22px)', color: '#fff', textAlign: 'center', marginBottom: 16 }}>
          Dear Deanna,
        </div>

        {/* Message */}
        <div style={{ background: 'rgba(138,99,218,0.08)', border: '0.5px solid rgba(138,99,218,0.2)', borderRadius: 16, padding: 'clamp(16px, 4vw, 22px)', marginBottom: 16 }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(15px, 4.5vw, 18px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, textAlign: 'center', fontStyle: 'italic' }}>
            "I am so proud of you on your journey with Islam. I know how hard it is for reverts to feel accepted, and I made this app to show how much we all have to learn and to keep us on our deen.
          </div>
          <div style={{ height: 12 }} />
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(15px, 4.5vw, 18px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.9, textAlign: 'center', fontStyle: 'italic' }}>
            You have truly inspired me to become a better Muslim after hearing all the obstacles you have faced. I can't wait to keep growing together and InshAllah become better Muslims."
          </div>
        </div>

        {/* Signature */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>with love</div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(16px, 4.5vw, 20px)', color: '#c9a84c' }}>Shahran 🤍</div>
        </div>

        {/* Quran verse */}
        <div style={{ background: 'rgba(201,168,76,0.06)', border: '0.5px solid rgba(201,168,76,0.15)', borderRadius: 14, padding: 'clamp(12px, 3.5vw, 18px)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 'clamp(15px, 4.5vw, 20px)', color: '#c9a84c', lineHeight: 1.8, marginBottom: 8 }}>
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 4 }}>
            "And whoever fears Allah — He will make for them a way out."
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>At-Talaq 65:2</div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
