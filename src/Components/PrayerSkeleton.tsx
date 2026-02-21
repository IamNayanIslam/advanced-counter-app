const PrayerSkeleton = () => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 m-4 animate-pulse">
      <div className="h-4 bg-slate-800 rounded-full w-32 mx-auto mb-6"></div>

      <div className="h-3 bg-slate-800 rounded w-24 mx-auto mb-3"></div>
      <div className="h-8 bg-slate-800 rounded w-48 mx-auto mb-6"></div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="h-20 bg-slate-800 rounded-lg"></div>
        <div className="h-20 bg-slate-800 rounded-lg"></div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 bg-slate-800/50 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default PrayerSkeleton;
