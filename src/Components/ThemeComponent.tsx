interface IProps {
  bg: string;
}

const ThemeComponent = ({ bg }: IProps) => {
  const colors: Record<string, string> = {
    cyan: "#22d3ee", // cyan-400
    teal: "#2dd4bf", // teal-400
    violet: "#a78bfa", // violet-400
    indigo: "#818cf8", // indigo-400
    emerald: "#34d399", // emerald-400
    rose: "#fb7185", // rose-400
  };

  const activeColor = colors[bg];

  return (
    <div
      className={`flex flex-col gap-4 p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer border-${bg}-400 active:scale-95`}
      style={
        {
          "--glow-color": activeColor,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 15px ${activeColor}80`; // 80 means opacity
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${activeColor}B3`; // B3 means more opacity
      }}
    >
      <div
        className={`w-[100px] h-[100px] rounded-full flex justify-center items-center bg-${bg}-400 shadow-lg`}
      >
        <h2 className="text-[40px] font-bold text-center text-slate-950 select-none">
          33
        </h2>
      </div>
      <h3 className={`text-center font-bold text-${bg}-400`}>
        {bg.toUpperCase()}
      </h3>
    </div>
  );
};

export default ThemeComponent;
