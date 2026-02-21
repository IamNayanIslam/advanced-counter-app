import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";

interface IPrayerData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Midnight: string;
  };
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string };
      year: string;
    };
  };
}

const PrayerTimes = () => {
  const [data, setData] = useState<IPrayerData | null>(null);
  const [userCity, setUserCity] = useState<string>("Detecting...");
  const [loading, setLoading] = useState<boolean>(true);

  // ১২ ঘণ্টা ফরম্যাটে কনভার্ট করার ফাংশন (সাথে মিনিট যোগ/বিয়োগের সুবিধা)
  const formatTime = (time: string, adjMinutes: number = 0) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + adjMinutes);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        // adjustment=-2 added for correct BD Ramadan date
        const prayerRes = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1&adjustment=-2`,
        );
        const prayerResult = await prayerRes.json();
        setData(prayerResult.data);

        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
        );
        const geoData = await geoRes.json();
        setUserCity(geoData.city || geoData.locality || "Your Area");
      } catch (err) {
        console.error("Data fetch error", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading)
    return (
      <div className="text-center p-4 text-cyan-400 font-mono">
        Updating Schedule...
      </div>
    );
  if (!data) return null;

  const { timings, date } = data;
  const isRamadan = date.hijri.month.en === "Ramaḍān";

  return (
    <>
      <Navbar />
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 m-4 font-sans">
        <div className="flex justify-center mb-2">
          <div className="bg-slate-800 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-700 flex items-center gap-1 uppercase">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Location: {userCity}
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-cyan-400 text-xs font-medium">{date.readable}</p>
          <h3 className="text-white text-lg font-bold">
            {Number(date.hijri.day) - 1} {date.hijri.month.en},{" "}
            {date.hijri.year}
          </h3>
          {isRamadan && (
            <div className="mt-1 bg-emerald-500/20 text-emerald-400 py-1 px-3 rounded-full inline-block text-xs font-bold border border-emerald-500/30">
              Ramadan {Number(date.hijri.day) - 1} 🎉
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-800 p-3 rounded-lg border-l-4 border-emerald-400">
            <p className="text-gray-400 text-[9px] uppercase font-bold">
              Sehri Ends
            </p>
            <p className="text-lg font-bold text-white">
              {formatTime(timings.Fajr, -5)}
            </p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border-l-4 border-rose-400">
            <p className="text-gray-400 text-[9px] uppercase font-bold">
              Iftar Time
            </p>
            <p className="text-lg font-bold text-white">
              {formatTime(timings.Maghrib, 3)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-gray-500 text-[10px] uppercase font-bold tracking-widest text-center mb-3">
            Prayer Schedule (12h)
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {[
              { label: "Fajr", start: timings.Fajr, end: timings.Sunrise },
              { label: "Dhuhr", start: timings.Dhuhr, end: timings.Asr },
              { label: "Asr", start: timings.Asr, end: timings.Maghrib },
              { label: "Maghrib", start: timings.Maghrib, end: timings.Isha },
              { label: "Isha", start: timings.Isha, end: timings.Midnight },
            ].map((prayer) => (
              <div
                key={prayer.label}
                className="flex justify-between items-center bg-slate-800/40 p-2 px-4 rounded-lg border border-slate-800/50"
              >
                <span className="text-white font-medium text-sm">
                  {prayer.label}
                </span>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-[8px] text-gray-500 uppercase">Starts</p>
                    <p className="text-xs text-cyan-400 font-bold">
                      {formatTime(prayer.start)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] text-gray-500 uppercase">Ends</p>
                    <p className="text-xs text-rose-400 font-bold">
                      {formatTime(prayer.end)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrayerTimes;
