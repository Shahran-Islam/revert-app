import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';

const LESSONS = [
  {
    id: 1, icon: '🌙', color: '#8a63da', bg: 'rgba(138,99,218,0.12)',
    title: 'The Shahada', sub: 'Declaration of faith',
    content: 'The Shahada is the Islamic declaration of faith: "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah" — "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the Messenger of Allah." Saying this with sincere belief and understanding makes one a Muslim.',
    duration: '5 min', done: true,
  },
  {
    id: 2, icon: '🚿', color: '#2db496', bg: 'rgba(45,180,150,0.12)',
    title: 'Wudu', sub: 'Purification before prayer',
    content: 'Wudu is the Islamic procedure for washing parts of the body before prayer. Steps: 1) Make intention. 2) Wash hands 3x. 3) Rinse mouth 3x. 4) Sniff water into nose 3x. 5) Wash face 3x. 6) Wash arms to elbows 3x (right first). 7) Wipe head once. 8) Wipe ears. 9) Wash feet to ankles 3x (right first).',
    duration: '8 min', done: true,
  },
  {
    id: 3, icon: '🙏', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)',
    title: 'How to Pray', sub: 'Step-by-step Salah',
    content: 'Muslims pray 5 times daily. Face the Qibla (direction of Makkah). Begin with Takbir (Allahu Akbar). Recite Al-Fatiha, then another surah. Perform Ruku (bowing) and Sujood (prostration). Each unit is called a Rak\'ah. Fajr has 2, Dhuhr 4, Asr 4, Maghrib 3, Isha 4.',
    duration: '15 min', done: true,
  },
  {
    id: 4, icon: '📿', color: '#8a63da', bg: 'rgba(138,99,218,0.12)',
    title: 'Daily Dhikr', sub: 'Remembrance of Allah',
    content: 'Dhikr means remembrance of Allah. After each prayer say: SubhanAllah 33x, Alhamdulillah 33x, Allahu Akbar 33x. Morning and evening adhkar are powerful sunnah practices. Common phrases: "Subhanallahi wa bihamdih" and "La hawla wa la quwwata illa billah".',
    duration: '10 min', done: false, next: true,
  },
  {
    id: 5, icon: '⚡', color: '#6fb3d8', bg: 'rgba(111,179,216,0.12)',
    title: 'The Five Pillars', sub: 'Foundations of Islam',
    content: '1) Shahada – Declaration of faith. 2) Salah – Five daily prayers. 3) Zakat – Obligatory charity (2.5% of savings). 4) Sawm – Fasting during Ramadan. 5) Hajj – Pilgrimage to Makkah (once in a lifetime if able).',
    duration: '12 min', done: false, locked: false,
  },
  {
    id: 6, icon: '🌙', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)',
    title: 'Ramadan Basics', sub: 'The month of fasting',
    content: 'Ramadan is the 9th month of the Islamic lunar calendar. Muslims fast from Fajr to Maghrib — abstaining from food, drink, and other nullifiers. It is a time of increased worship, Quran recitation, and charity. The fast is broken with Iftar and the pre-dawn meal is called Suhoor.',
    duration: '10 min', done: false, locked: false,
  },
  {
    id: 7, icon: '📖', color: '#2db496', bg: 'rgba(45,180,150,0.12)',
    title: 'Reading the Quran', sub: 'Starting your Quran journey',
    content: 'Begin with Surah Al-Fatiha (7 verses) and the short surahs at the end of the Quran. Learn the Arabic alphabet and basic Tajweed rules. Use a translation alongside to understand meaning. Apps like Quran.com provide audio recitation to help with pronunciation.',
    duration: '15 min', done: false, locked: true,
  },
  {
    id: 8, icon: '🤲', color: '#8a63da', bg: 'rgba(138,99,218,0.12)',
    title: 'Dua & Supplication', sub: 'Talking directly to Allah',
    content: 'Dua is personal supplication — you can speak to Allah in any language, at any time. Best times: during sujood (prostration), between adhan and iqamah, last third of the night, and on Fridays. Begin with praise and salawat upon the Prophet ﷺ.',
    duration: '8 min', done: false, locked: true,
  },
  {
    id: 9, icon: '🕌', color: '#6fb3d8', bg: 'rgba(111,179,216,0.12)',
    title: 'The Mosque', sub: 'Your community home',
    content: 'The masjid (mosque) is the centre of Muslim community life. Friday Jumu\'ah prayer is obligatory for men. Etiquette: remove shoes at entrance, enter with right foot, pray 2 rakaat "tahiyyat al-masjid" upon entering, maintain silence and respect.',
    duration: '10 min', done: false, locked: true,
  },
  {
    id: 10, icon: '⭐', color: '#c9a84c', bg: 'rgba(201,168,76,0.1)',
    title: 'Islamic Character', sub: 'Living as a Muslim',
    content: 'Islam is a complete way of life. The Prophet ﷺ said: "I have been sent to perfect good character." Key traits: honesty (sidq), trustworthiness (amanah), humility (tawadu), patience (sabr), and gratitude (shukr). Begin each action with Bismillah.',
    duration: '12 min', done: false, locked: true,
  },
];

const DONE_COUNT = LESSONS.filter(l => l.done).length;
const PROGRESS = (DONE_COUNT / LESSONS.length) * 100;

export default function GuidesScreen() {
  const [expanded, setExpanded] = useState(null);
  const [completedIds, setCompletedIds] = useState(new Set(LESSONS.filter(l => l.done).map(l => l.id)));

  const toggleComplete = (id, e) => {
    e.stopPropagation();
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = (completedIds.size / LESSONS.length) * 100;

  return (
    <div className="screen scrollable" style={{ background: '#120d1f', minHeight: '100%' }}>
      <StatusBar color="rgba(255,255,255,0.5)" />

      {/* Header */}
      <div style={{ padding: '4px 20px 16px', background: 'linear-gradient(180deg, #1c1030 0%, transparent 100%)' }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(18px, 5vw, 22px)', color: '#fff', marginBottom: '2px' }}>My Journey</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px, 2.5vw, 12px)', color: 'rgba(255,255,255,0.35)' }}>
          New Muslim Learning Path · For Deanna
        </div>
      </div>

      {/* Progress Banner */}
      <div style={{
        margin: '0 16px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 'clamp(14px, 4vw, 18px)',
        border: '0.5px solid rgba(138,99,218,0.25)',
        padding: 'clamp(14px, 3.5vw, 18px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
            Your Progress
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 3vw, 13px)', color: '#8a63da' }}>
            {completedIds.size} of {LESSONS.length}
          </div>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 5, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #8a63da, #b088f5)', borderRadius: 5, transition: 'width 0.4s ease' }}/>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(9px, 2.2vw, 11px)', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
          {Math.round(progress)}% complete — you're doing amazing, keep going! 🌙
        </div>
      </div>

      {/* Lesson List */}
      <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vw, 10px)' }}>
        {LESSONS.map((lesson) => {
          const done = completedIds.has(lesson.id);
          const open = expanded === lesson.id;

          return (
            <div key={lesson.id}>
              <div
                onClick={() => !lesson.locked && setExpanded(open ? null : lesson.id)}
                style={{
                  background: done ? 'rgba(138,99,218,0.08)' : 'rgba(255,255,255,0.03)',
                  border: done ? '0.5px solid rgba(138,99,218,0.25)' : '0.5px solid rgba(255,255,255,0.07)',
                  borderRadius: open ? 'clamp(12px,3.5vw,16px) clamp(12px,3.5vw,16px) 0 0' : 'clamp(12px,3.5vw,16px)',
                  padding: 'clamp(12px,3vw,15px) clamp(14px,3.5vw,18px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: lesson.locked ? 'not-allowed' : 'pointer',
                  opacity: lesson.locked ? 0.45 : 1,
                  transition: 'all 0.2s',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 'clamp(36px,9vw,42px)',
                  height: 'clamp(36px,9vw,42px)',
                  borderRadius: 10,
                  background: lesson.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(18px,5vw,22px)',
                  flexShrink: 0,
                }}>
                  {lesson.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px,3.5vw,15px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>
                    {lesson.title}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(10px,2.5vw,12px)', color: 'rgba(255,255,255,0.35)' }}>
                    {lesson.sub} · {lesson.duration}
                  </div>
                </div>

                {/* Badge */}
                <div>
                  {lesson.locked ? (
                    <span style={{ fontSize: '14px' }}>🔒</span>
                  ) : done ? (
                    <div onClick={(e) => toggleComplete(lesson.id, e)} style={{
                      background: 'rgba(138,99,218,0.2)',
                      color: '#b088f5',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(9px,2.2vw,11px)',
                      padding: '4px 10px',
                      borderRadius: 20,
                      cursor: 'pointer',
                    }}>Done ✓</div>
                  ) : lesson.next ? (
                    <div style={{
                      background: 'rgba(201,168,76,0.15)',
                      color: '#c9a84c',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(9px,2.2vw,11px)',
                      padding: '4px 10px',
                      borderRadius: 20,
                    }}>Next</div>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d={open ? "M4 10L8 6L12 10" : "M4 6L8 10L12 6"} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {open && !lesson.locked && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderTop: 'none',
                  borderRadius: '0 0 clamp(12px,3.5vw,16px) clamp(12px,3.5vw,16px)',
                  padding: 'clamp(14px,3.5vw,18px)',
                  animation: 'fadeIn 0.2s ease',
                }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px,3.5vw,15px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '14px' }}>
                    {lesson.content}
                  </p>
                  {!done && (
                    <button
                      onClick={(e) => { toggleComplete(lesson.id, e); setExpanded(null); }}
                      style={{
                        width: '100%',
                        padding: 'clamp(11px,3vw,14px)',
                        background: lesson.bg,
                        border: `0.5px solid ${lesson.color}40`,
                        borderRadius: 'clamp(10px,3vw,12px)',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'clamp(13px,3.5vw,14px)',
                        fontWeight: 500,
                        color: lesson.color,
                        cursor: 'pointer',
                      }}
                    >
                      Mark as Complete ✓
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
