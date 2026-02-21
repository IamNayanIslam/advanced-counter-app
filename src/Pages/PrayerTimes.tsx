import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import PrayerSkeleton from "../Components/PrayerSkeleton";

const PrayerTimes = () => {
  const [data, setData] = useState<any>(null);
  const [userCity, setUserCity] = useState<string>("Detecting...");
  const [loading, setLoading] = useState<boolean>(true);
  const [timezone, setTimezone] = useState<string>("");

  const getAdjustedHijri = (hijri: any, timings: any, tz: string) => {
    let day = parseInt(hijri.day);
    const month: string = hijri.month.en;
    const year = parseInt(hijri.year);

    if (tz.includes("Dhaka")) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const [mHours, mMinutes] = timings.Maghrib.split(":").map(Number);
      const maghribMinutes = mHours * 60 + mMinutes;

      if (currentMinutes < maghribMinutes) {
        day = day - 1;
      }

      if (day <= 0) {
        return {
          day: "চাঁদ দেখার",
          month: "সাপেক্ষ",
          year,
        };
      }
    }

    return { day, month, year };
  };

  const formatTime = (time: string, adjMinutes: number = 0) => {
    if (!time) return "--:--";
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
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const prayerRes = await fetch(
            `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`,
          );
          const prayerResult = await prayerRes.json();
          setData(prayerResult.data);
          setTimezone(prayerResult.data.meta.timezone);

          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );
          const geoData = await geoRes.json();
          setUserCity(geoData.city || geoData.locality || "Your Area");
        } catch (err) {
          console.error("Error fetching data:", err);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        alert("Please enable location to see accurate prayer times.");
      },
    );
  }, []);

  const adjustedHijri = data
    ? getAdjustedHijri(data.date.hijri, data.timings, timezone)
    : null;

  return (
    <>
      <Navbar />
      {loading ? (
        <PrayerSkeleton />
      ) : (
        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 m-4 font-sans max-w-lg mx-auto">
          <div className="flex justify-center mb-4">
            <div className="bg-slate-800 text-slate-400 text-[10px] px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Location: {userCity}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-cyan-400 text-xs font-mono mb-1">
              {data?.date.readable}
            </p>
            <h3 className="text-white text-xl font-black tracking-tight">
              {adjustedHijri?.day} {adjustedHijri?.month}, {adjustedHijri?.year}
            </h3>

            {data?.date.hijri.month.en === "Ramaḍān" &&
              adjustedHijri?.month !== "সাপেক্ষ" && (
                <div className="mt-2 bg-emerald-500/20 text-emerald-400 py-1 px-4 rounded-full inline-block text-[10px] font-black border border-emerald-500/30 uppercase">
                  Ramadan {adjustedHijri?.day} Mubarak 🎉
                </div>
              )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 p-4 rounded-2xl border-b-2 border-emerald-500 shadow-inner">
              <p className="text-gray-500 text-[9px] uppercase font-black mb-1">
                Sehri Ends
              </p>
              <p className="text-xl font-bold text-white tracking-tighter">
                {formatTime(data?.timings.Fajr, -5)}
              </p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border-b-2 border-rose-500 shadow-inner">
              <p className="text-gray-500 text-[9px] uppercase font-black mb-1">
                Iftar Time
              </p>
              <p className="text-xl font-bold text-white tracking-tighter">
                {formatTime(data?.timings.Maghrib, 3)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-gray-600 text-[10px] uppercase font-black tracking-[0.2em] text-center mb-4">
              Prayer Schedule
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                {
                  label: "Fajr",
                  start: data?.timings.Fajr,
                  end: data?.timings.Sunrise,
                  color: "text-cyan-400",
                },
                {
                  label: "Dhuhr",
                  start: data?.timings.Dhuhr,
                  end: data?.timings.Asr,
                  color: "text-emerald-400",
                },
                {
                  label: "Asr",
                  start: data?.timings.Asr,
                  end: data?.timings.Maghrib,
                  color: "text-orange-400",
                },
                {
                  label: "Maghrib",
                  start: data?.timings.Maghrib,
                  end: data?.timings.Isha,
                  color: "text-rose-400",
                },
                {
                  label: "Isha",
                  start: data?.timings.Isha,
                  end: data?.timings.Midnight,
                  color: "text-indigo-400",
                },
              ].map((prayer) => (
                <div
                  key={prayer.label}
                  className="flex justify-between items-center bg-slate-800/30 p-3 px-5 rounded-xl border border-slate-700/30"
                >
                  <span className="text-gray-200 font-bold text-sm tracking-tight">
                    {prayer.label}
                  </span>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="text-[7px] text-gray-600 uppercase font-black">
                        Starts
                      </p>
                      <p className={`text-xs ${prayer.color} font-bold`}>
                        {formatTime(prayer.start)}
                      </p>
                    </div>
                    <div className="text-right border-l border-slate-700 pl-4">
                      <p className="text-[7px] text-gray-600 uppercase font-black">
                        Ends
                      </p>
                      <p className="text-xs text-gray-400 font-bold">
                        {formatTime(prayer.end)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PrayerTimes;
