import { useContext } from "react";
import Navbar from "../Components/Navbar";
import { ThemesContext } from "../Contexts/ThemseContext";
import { FaCode, FaTools, FaGithub, FaTerminal } from "react-icons/fa";

const About = () => {
  const { themesState } = useContext(ThemesContext);

  const features = [
    "Advanced Context API & useReducer State Management",
    "Dynamic Theme System with 6 Premium Colors",
    "Volume Button Control for Seamless Counting",
    "Customizable Counter Shapes (Hexagon, Circle, Cubical)",
    "Haptic Feedback & Interactive Sound Effects",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0E1820] text-white font-mono">
      <Navbar />

      <main className="flex-1 p-6 max-w-2xl mx-auto w-full pb-24">
        {/* Header Section */}
        <div className="text-center mb-10 mt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-[10px] mb-4 border border-slate-700 text-gray-400">
            STABLE_RELEASE / v1.0.0
          </div>
          <h1
            className={`text-4xl font-black text-${themesState.theme}-400 mb-2 tracking-tighter uppercase`}
          >
            Tasbih Pro
          </h1>
          <p className="text-gray-500 text-xs italic">
            {"// Built for focus and dhikr"}
          </p>
        </div>

        {/* Project Context */}
        <div className="bg-slate-800/30 border border-slate-700/50 p-6 rounded-3xl mb-8 relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <FaTerminal className="text-4xl" />
          </div>

          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <FaCode className="text-xl" />
            <h2 className="font-bold uppercase tracking-wider text-xs">
              Project_Motivation
            </h2>
          </div>

          <p className="text-gray-300 leading-relaxed text-sm">
            This is an{" "}
            <span className={`text-${themesState.theme}-400`}>
              Advanced Practice Project
            </span>{" "}
            designed to master deep React concepts including
            <span className="text-white">
              {" "}
              Context API, UseReducer, React-TypeScript,
            </span>{" "}
            and
            <span className="text-white"> Complex UI Logic.</span> It
            demonstrates how a simple counter can be elevated to an
            industry-standard application architecture.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3 ml-2 mb-2 text-indigo-400">
            <FaTools className="text-xl" />
            <h2 className="font-bold uppercase tracking-wider text-xs">
              System_Features
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-800/20 p-3 rounded-xl border border-slate-700/30 hover:border-slate-600 transition-colors group"
              >
                <code className={`text-xs text-${themesState.theme}-400`}>
                  0{index + 1}
                </code>
                <span className="text-xs text-gray-400 group-hover:text-gray-200">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Card */}
        {/* Developer Card - Image Section Updated */}
        <div
          className={`relative overflow-hidden bg-slate-900 border border-slate-700 p-8 rounded-[2rem] text-center shadow-2xl`}
        >
          <div
            className={`absolute top-0 left-0 w-1 h-full bg-${themesState.theme}-400`}
          />

          <div className="flex flex-col items-center">
            {/* Image Wrapper */}
            <div
              className={`p-1 rounded-full border border-slate-700 mb-4 bg-slate-800 w-24 h-24 overflow-hidden`}
            >
              <img
                src="/nayan_islam.png"
                alt="Md. Nayan Islam"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <h2 className="text-xl font-bold mb-1">Md. Nayan Islam</h2>
            <p
              className={`text-${themesState.theme}-400 font-medium text-[10px] mb-6 uppercase tracking-[0.2em]`}
            >
              Frontend_Developer.exe
            </p>

            <a
              href="https://github.com/iamnayanislam"
              target="_blank"
              className={`flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-xs font-black hover:bg-${themesState.theme}-400 hover:text-white transition-all`}
            >
              <FaGithub /> VIEW_GITHUB
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 text-[9px] mt-12 uppercase tracking-[0.3em]">
          {"<"} Designed & Developed by Nayan {"/>"}
        </p>
      </main>
    </div>
  );
};

export default About;
