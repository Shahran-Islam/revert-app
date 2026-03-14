import { useState, useEffect } from 'react';

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseTime(timeStr) {
  // timeStr like "05:42 (EDT)"
  const clean = timeStr.replace(/\s*\(.*\)/, '').trim();
  const [h, m] = clean.split(':').map(Number);
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function getCountdown(target) {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) return null;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 0) return `in ${h}h ${m}m`;
  return `in ${m}m`;
}

export default function usePrayerTimes() {
  const [prayers, setPrayers] = useState([]);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [location, setLocation] = useState('New York, NY');
  const [loading, setLoading] = useState(true);
  const [qibla, setQibla] = useState({ direction: 58.3, city: 'New York' });
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    async function fetchTimes() {
      try {
        // Try to get user location
        let lat = 40.7128, lng = -74.006, city = 'New York, NY';

        if (navigator.geolocation) {
          await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                lat = pos.coords.latitude;
                lng = pos.coords.longitude;
                resolve();
              },
              () => resolve(),
              { timeout: 5000 }
            );
          });
        }

        // Fetch prayer times
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const res = await fetch(
          `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=2`
        );
        const data = await res.json();

        if (data.code === 200) {
          const timings = data.data.timings;
          const meta = data.data.meta;
          city = `${meta.timezone.split('/')[1]?.replace('_', ' ') || 'Your City'}`;

          const prayerList = PRAYER_NAMES.map((name) => ({
            name,
            time: parseTime(timings[name]),
            timeStr: formatTime(parseTime(timings[name])),
          }));

          setPrayers(prayerList);
          setLocation(city);

          // Determine next prayer
          const now = new Date();
          const next = prayerList.find((p) => p.time > now) || prayerList[0];
          setNextPrayer(next);
        }

        // Fetch Qibla direction
        const qRes = await fetch(
          `https://api.aladhan.com/v1/qibla/${lat}/${lng}`
        );
        const qData = await qRes.json();
        if (qData.code === 200) {
          setQibla({ direction: Math.round(qData.data.direction * 10) / 10, city });
        }
      } catch (e) {
        // Fallback to hardcoded New York data
        const fallback = [
          { name: 'Fajr',    timeStr: '5:42 AM'  },
          { name: 'Dhuhr',   timeStr: '12:18 PM' },
          { name: 'Asr',     timeStr: '4:28 PM'  },
          { name: 'Maghrib', timeStr: '6:14 PM'  },
          { name: 'Isha',    timeStr: '7:45 PM'  },
        ].map((p) => ({ ...p, time: new Date() }));
        setPrayers(fallback);
        setNextPrayer(fallback[2]);
      } finally {
        setLoading(false);
      }
    }

    fetchTimes();
  }, []);

  // Update countdown every 30s
  useEffect(() => {
    if (!nextPrayer?.time) return;
    const update = () => setCountdown(getCountdown(nextPrayer.time) || 'Now');
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [nextPrayer]);

  return { prayers, nextPrayer, location, loading, qibla, countdown };
}
