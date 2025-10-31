// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Trophy,
//   Share2,
//   RefreshCw,
//   TrendingUp,
//   Zap,
//   Award,
//   BarChart3,
//   Flame,
//   Crown,
//   Star,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function TypingResult({
//   wpm = 0,
//   minutes = 0,
//   accuracy = 0,
//   result,
// }) {
//   const [mounted, setMounted] = useState(false);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [progressionData, setProgressionData] = useState([]);
//   const router = useRouter();

//   useEffect(() => setMounted(true), []);

//   useEffect(() => {
//     if (result) {
//       setProgressionData(result.speedProgression || []);
//     } else {
//       const results = JSON.parse(localStorage.getItem("typingResults")) || [];
//       if (results.length > 0) {
//         const last = results[results.length - 1];
//         setProgressionData(last.speedProgression || []);
//       }
//     }
//     const lb = JSON.parse(localStorage.getItem("leaderboard")) || [];

//     // 7 din ke andar ke scores filter karo
//     const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
//     const recentScores = lb.filter((item) => {
//       // ensure timestamp exists
//       return item.timestamp && new Date(item.timestamp).getTime() >= oneWeekAgo;
//     });

//     // WPM ke hisaab se sort (descending)
//     const sorted = recentScores.sort((a, b) => b.wpm - a.wpm);

//     // Sirf top 10 lo
//     setLeaderboardData(sorted.slice(0, 10));
//   }, [result]);

//   useEffect(() => {
//     const ach = JSON.parse(localStorage.getItem("achievements")) || {};
//     setAchievements([
//       { name: "First Test", earned: !!ach.firstTest, icon: <Star size={16} /> },
//       {
//         name: "Speed Demon",
//         earned: !!ach.speedDemon,
//         icon: <Zap size={16} />,
//       },
//       {
//         name: "Accuracy Master",
//         earned: !!ach.accuracyMaster,
//         icon: <Award size={16} />,
//       },
//       {
//         name: "Consistency",
//         earned: (result?.consistency || 0) > 80,
//         icon: <BarChart3 size={16} />,
//       },
//       {
//         name: "10-Day Streak",
//         earned: !!ach.streak10,
//         icon: <Flame size={16} />,
//       },
//     ]);
//   }, [result]);

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans">
//       {/* Background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-lime-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.header
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex justify-between items-center mb-8"
//         >
//           <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
//             TypingMaster Pro
//           </h1>
//           <div className="flex items-center space-x-3">
//             <button className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all flex items-center">
//               <Share2 size={16} className="mr-2" />
//               Share
//             </button>
//             <button
//               onClick={() => {
//                 router.push(`/typing/${minutes}min`);
//               }}
//               className="px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-md border border-slate-700/50 hover:bg-lime-500/10 hover:border-lime-500/30 transition-all flex items-center"
//             >
//               <RefreshCw size={16} className="mr-2" />
//               Retake
//             </button>
//           </div>
//         </motion.header>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Main WPM Score */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="lg:col-span-2 rounded-2xl bg-slate-800/30 h-fit backdrop-blur-md border border-slate-700/50 p-6 relative overflow-hidden"
//           >
//             {/* <div className="absolute -top-4 -right-4 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl"></div> */}
//             <div className="flex justify-between items-start mb-6">
//               <h2 className="text-lg font-semibold text-slate-300">
//                 Your Score
//               </h2>
//               {wpm > 40 && (
//                 <div className="flex items-center px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-sm">
//                   <Trophy size={14} className="mr-1" />
//                   Personal Best!
//                 </div>
//               )}
//             </div>

//             <div className="flex items-end space-x-4 mb-6">
//               <div className="flex flex-col">
//                 <span className="text-slate-400 text-sm">WPM</span>
//                 <span className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-lime-400">
//                   {wpm}
//                 </span>
//               </div>

//               <div className="flex flex-col pb-2">
//                 <span className="text-slate-400 text-sm">Accuracy</span>
//                 <span className="text-3xl md:text-4xl font-bold text-lime-400">
//                   {accuracy}%
//                 </span>
//               </div>

//               <div className="flex flex-col pb-2 ml-auto">
//                 <span className="text-slate-400 text-sm">Time</span>
//                 <span className="text-xl font-mono font-bold text-cyan-400">
//                   {minutes}m
//                 </span>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-slate-800/50 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-sm">Rank</div>
//                 <div className="text-xl font-bold text-cyan-400">#1</div>
//               </div>
//               <div className="bg-slate-800/50 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-sm">Consistency</div>
//                 <div className="text-xl font-bold text-lime-400">
//                   {result?.consistency || 0}%
//                 </div>
//               </div>
//               <div className="bg-slate-800/50 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-sm">Streak</div>
//                 <div className="text-xl font-bold text-yellow-400 flex items-center justify-center">
//                   <Flame size={16} className="mr-1" /> 5
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Leaderboard */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="rounded-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50 p-6"
//           >
//             <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
//               <Crown size={18} className="mr-2 text-yellow-400" />
//               Leaderboard
//             </h2>

//             <div className="space-y-3">
//               {leaderboardData.length === 0 && (
//                 <p className="text-slate-500 text-sm">No scores yet.</p>
//               )}
//               {leaderboardData.map((user, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-between p-3 rounded-xl ${
//                     user.rank === 1
//                       ? "bg-cyan-500/10 border border-cyan-500/20"
//                       : "bg-slate-800/50"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <div
//                       className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
//                         user.rank === 1
//                           ? "bg-yellow-500/20 text-yellow-400"
//                           : "bg-slate-700/70 text-slate-400"
//                       } text-xs font-bold`}
//                     >
//                       {user.rank}
//                     </div>
//                     <span
//                       className={
//                         user.rank === 1
//                           ? "text-cyan-400 font-medium"
//                           : "text-slate-300"
//                       }
//                     >
//                       {user.name}
//                     </span>
//                   </div>
//                   <div className="text-lime-400 font-mono font-bold">
//                     {user.wpm} WPM
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Speed Progression Chart */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="lg:col-span-2 rounded-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50 p-6"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-slate-300 flex items-center">
//                 <TrendingUp size={18} className="mr-2 text-cyan-400" />
//                 Speed Progression
//               </h2>
//               <div className="flex items-center space-x-2">
//                 <span className="text-xs text-slate-400">Smooth</span>
//                 <div className="relative inline-block w-10 h-5">
//                   <input
//                     type="checkbox"
//                     className="sr-only"
//                     id="smooth-toggle"
//                     defaultChecked
//                   />
//                   <label
//                     htmlFor="smooth-toggle"
//                     className="block w-10 h-5 rounded-full bg-slate-700 cursor-pointer transition-colors"
//                   ></label>
//                   <span className="absolute left-0.5 top-0.5 bg-cyan-500 w-4 h-4 rounded-full transition-transform"></span>
//                 </div>
//               </div>
//             </div>

//             {/* Advanced chart container */}
//             <div className="h-52 relative">
//               {/* Dynamic horizontal grid lines with glow effect */}
//               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
//                 {(() => {
//                   const maxWpm =
//                     progressionData.length > 0
//                       ? Math.max(...progressionData.map((p) => p.wpm))
//                       : 100;
//                   const safeMax = Math.max(maxWpm * 1.1, 10); // Add 10% padding

//                   return [0.0, 0.25, 0.5, 0.75, 1.0].map((fraction, i) => {
//                     const value = Math.round(safeMax * fraction);
//                     return (
//                       <div key={i} className="flex items-center">
//                         <div className="text-xs text-slate-500 mr-2 w-8 text-right font-mono">
//                           {value}
//                         </div>
//                         <div className="flex-1 border-t border-slate-700/50 relative">
//                           <div className="absolute inset-0 border-t border-cyan-500/10 blur-[1px]"></div>
//                         </div>
//                       </div>
//                     );
//                   });
//                 })()}
//               </div>

//               {/* Chart area */}
//               <div className="absolute inset-0 flex items-end pl-8 pr-2 pb-6">
//                 {/* Compute dynamic max */}
//                 {(() => {
//                   const maxWpm =
//                     progressionData.length > 0
//                       ? Math.max(...progressionData.map((p) => p.wpm))
//                       : 100;
//                   const safeMax = Math.max(maxWpm * 1.1, 10); // Add 10% padding

//                   // Create line path for SVG
//                   const points = progressionData
//                     .map((point, i) => {
//                       const x = (i / (progressionData.length - 1)) * 100;
//                       const y = 100 - (point.wpm / safeMax) * 100;
//                       return `${x},${y}`;
//                     })
//                     .join(" ");

//                   // Create area path for SVG
//                   const areaPoints = `${points} ${100},100 0,100`;

//                   return (
//                     <>
//                       {/* SVG for line chart */}
//                       <svg
//                         width="100%"
//                         height="100%"
//                         viewBox="0 0 100 100"
//                         preserveAspectRatio="none"
//                         className="absolute inset-0"
//                       >
//                         {/* Gradient for area fill */}
//                         <defs>
//                           <linearGradient
//                             id="areaGradient"
//                             x1="0%"
//                             y1="0%"
//                             x2="0%"
//                             y2="100%"
//                           >
//                             <stop
//                               offset="0%"
//                               stopColor="#06b6d4"
//                               stopOpacity="0.2"
//                             />
//                             <stop
//                               offset="100%"
//                               stopColor="#06b6d4"
//                               stopOpacity="0.01"
//                             />
//                           </linearGradient>
//                         </defs>

//                         {/* Area fill */}
//                         <motion.path
//                           d={`M${areaPoints} Z`}
//                           fill="url(#areaGradient)"
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 1.5, delay: 0.5 }}
//                         />

//                         {/* Main line */}
//                         <motion.polyline
//                           fill="none"
//                           stroke="url(#lineGradient)"
//                           strokeWidth="2"
//                           points={points}
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 1.5, delay: 0.3 }}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />

//                         {/* Glow effect */}
//                         <motion.polyline
//                           fill="none"
//                           stroke="url(#glowGradient)"
//                           strokeWidth="8"
//                           points={points}
//                           initial={{ pathLength: 0 }}
//                           animate={{ pathLength: 1 }}
//                           transition={{ duration: 1.5, delay: 0.3 }}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           opacity="0.3"
//                           filter="blur(4px)"
//                         />
//                       </svg>

//                       {/* Data points and labels */}
//                       <div className="relative w-full h-full">
//                         {progressionData.map((point, index) => {
//                           const xPercentage =
//                             (index / (progressionData.length - 1)) * 100;
//                           const yPercentage = 100 - (point.wpm / safeMax) * 100;

//                           return (
//                             <motion.div
//                               key={index}
//                               className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
//                               style={{
//                                 left: `${xPercentage}%`,
//                                 top: `${yPercentage}%`,
//                               }}
//                               initial={{ scale: 0, opacity: 0 }}
//                               animate={{ scale: 1, opacity: 1 }}
//                               transition={{
//                                 duration: 0.5,
//                                 delay: 0.8 + index * 0.1,
//                                 type: "spring",
//                                 stiffness: 150,
//                               }}
//                               whileHover={{ scale: 1.2 }}
//                             >
//                               <div className="w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-lg shadow-cyan-500/30"></div>

//                               {/* Tooltip on hover */}
//                               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
//                                 <div className="bg-slate-800 text-cyan-300 text-xs font-semibold py-1 px-2 rounded-md whitespace-nowrap shadow-lg border border-slate-700/50">
//                                   {point.time}: {point.wpm} WPM
//                                   <div className="absolute left-1/2 top-full transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
//                                 </div>
//                               </div>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     </>
//                   );
//                 })()}
//               </div>

//               {/* X-axis labels */}
//               <div className="absolute bottom-0 left-0 right-0 flex justify-between pl-8 pr-2">
//                 {progressionData.map((point, index) => (
//                   <div
//                     key={index}
//                     className="text-xs text-slate-400 font-mono transform -translate-x-1/2"
//                     style={{
//                       marginLeft: `${
//                         (index / (progressionData.length - 1)) * 100
//                       }%`,
//                     }}
//                   >
//                     {point.time}
//                   </div>
//                 ))}
//               </div>

//               {/* Current performance indicator */}
//               <motion.div
//                 className="absolute right-4 top-4 bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.2 }}
//               >
//                 <div className="text-xs text-slate-400">Peak Speed</div>
//                 <div className="text-lg font-bold text-cyan-400 flex items-center">
//                   <Zap size={16} className="mr-1" />
//                   {Math.max(...progressionData.map((p) => p.wpm))} WPM
//                 </div>
//               </motion.div>
//             </div>

//             {/* Performance summary */}
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               <div className="bg-slate-800/40 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-xs">Avg. Speed</div>
//                 <div className="text-lg font-bold text-cyan-400">
//                   {Math.round(
//                     progressionData.reduce((sum, p) => sum + p.wpm, 0) /
//                       progressionData.length
//                   )}{" "}
//                   WPM
//                 </div>
//               </div>
//               <div className="bg-slate-800/40 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-xs">Improvement</div>
//                 <div className="text-lg font-bold text-lime-400">
//                   {progressionData.length > 1 ? (
//                     <div className="text-lg font-bold text-lime-400">
//                       +
//                       {progressionData[progressionData.length - 1].wpm -
//                         progressionData[0].wpm}{" "}
//                       WPM
//                     </div>
//                   ) : (
//                     <div className="text-lg font-bold text-slate-400">
//                       No Data
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="bg-slate-800/40 rounded-xl p-3 text-center">
//                 <div className="text-slate-400 text-xs">Consistency</div>
//                 <div className="text-lg font-bold text-yellow-400">92%</div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Achievements */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="rounded-2xl bg-slate-800/30 backdrop-blur-md border border-slate-700/50 p-6"
//           >
//             <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
//               <Award size={18} className="mr-2 text-yellow-400" />
//               Achievements
//             </h2>

//             <div className="space-y-3">
//               {achievements.map((achievement, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-center p-3 rounded-xl ${
//                     achievement.earned
//                       ? "bg-lime-500/10 border border-lime-500/20"
//                       : "bg-slate-800/50 opacity-50"
//                   }`}
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
//                       achievement.earned
//                         ? "bg-lime-500/20 text-lime-400"
//                         : "bg-slate-700/70 text-slate-600"
//                     }`}
//                   >
//                     {achievement.icon}
//                   </div>
//                   <span
//                     className={
//                       achievement.earned ? "text-lime-300" : "text-slate-500"
//                     }
//                   >
//                     {achievement.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Ad Space */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//           className="rounded-2xl bg-slate-800/20 border border-dashed border-slate-700/50 p-8 text-center mb-8"
//         >
//           <div className="text-slate-500 text-sm mb-2">Advertisement Space</div>
//           <div className="text-slate-600 text-xs">
//             This area is reserved for future advertisements. Easily replace with
//             ad code when needed.
//           </div>
//         </motion.div>

//         {/* Footer */}
//         <motion.footer
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.6 }}
//           className="text-center text-slate-500 text-sm pt-4 border-t border-slate-800/50"
//         >
//           © {mounted ? new Date().getFullYear() : ""} TypingMaster Pro • Improve
//           your typing skills
//         </motion.footer>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiRepeat,
  FiClock,
  FiTrendingUp,
  FiTarget,
  FiAward,
  FiBarChart2,
  FiZap,
  FiStar,
  FiShare,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import Confetti from "react-dom-confetti";
import Head from "next/head";
import Link from "next/link";

export default function TypingResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Params le lo URL se
  const wpm = parseInt(searchParams.get("wpm") || 0);
  const accuracy = parseInt(searchParams.get("accuracy") || 0);
  const minutes = parseFloat(searchParams.get("minutes") || "1");
  const total = parseInt(searchParams.get("total") || 0);
  const correct = parseInt(searchParams.get("correct") || 0);
  const incorrect = parseInt(searchParams.get("incorrect") || 0);

  useEffect(() => {
    setIsMounted(true);
    // Trigger confetti on component mount
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  // ❌ Agar params hi na mile to error page
  if (!wpm && !accuracy && !minutes) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            It seems you came here without completing a test.
          </p>
          <Link
            href="/"
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <FiHome /> Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Performance level logic
  const getPerformanceLevel = () => {
    if (wpm >= 70) return "Expert Typist";
    if (wpm >= 50) return "Advanced Typist";
    if (wpm >= 30) return "Intermediate Typist";
    return "Beginner Typist";
  };
  const performanceLevel = getPerformanceLevel();

  // Get performance color based on WPM
  const getPerformanceColor = () => {
    if (wpm >= 70) return "text-purple-600";
    if (wpm >= 50) return "text-blue-600";
    if (wpm >= 30) return "text-green-600";
    return "text-yellow-600";
  };

  // Get badge icon based on performance
  const getPerformanceBadge = () => {
    if (wpm >= 70) return <FiCrown className="text-2xl text-purple-600" />;
    if (wpm >= 50) return <FiZap className="text-2xl text-blue-600" />;
    if (wpm >= 30) return <FiTrendingUp className="text-2xl text-green-600" />;
    return <FiStar className="text-2xl text-yellow-600" />;
  };

  // ✅ LocalStorage me result save
  useEffect(() => {
    if (!isMounted) return;

    const previousResults =
      JSON.parse(localStorage.getItem("typingResults")) || [];

    const exists = previousResults.some(
      (r) =>
        r.date === new Date().toLocaleDateString("en-GB") &&
        r.wpm === wpm &&
        r.accuracy === accuracy
    );

    if (!exists) {
      const newResult = {
        date: new Date().toISOString(),
        wpm,
        accuracy,
        minutes,
        correct,
        incorrect,
        total,
      };
      previousResults.push(newResult);
      localStorage.setItem("typingResults", JSON.stringify(previousResults));
    }
  }, [wpm, accuracy, minutes, correct, incorrect, total, isMounted]);

  // Confetti configuration
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <>
      <Head>
        <title>Typing Result - Check Your WPM & Accuracy</title>
        <meta
          name="description"
          content="See your typing test result: WPM, accuracy, and detailed performance. Improve your typing speed online."
        />
        <meta
          name="keywords"
          content="typing test, typing result, WPM, typing accuracy, online typing test"
        />
        <link
          rel="canonical"
          href={
            typeof window !== "undefined"
              ? window.location.href
              : "https://www.yourwebsite.com/results"
          }
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Typing Result - Check Your WPM & Accuracy"
        />
        <meta
          property="og:description"
          content="See your typing test result: WPM, accuracy, and detailed performance. Improve your typing speed online."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            typeof window !== "undefined"
              ? window.location.href
              : "https://www.yourwebsite.com/results"
          }
        />
        <meta property="og:image" content="/logoicon.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Typing Result - Check Your WPM & Accuracy"
        />
        <meta
          name="twitter:description"
          content="See your typing test result: WPM, accuracy, and detailed performance. Improve your typing speed online."
        />
        <meta name="twitter:image" content="/logoicon.png" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-100 p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-300/20 rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-300/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Confetti */}
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50">
          <Confetti active={showConfetti} config={confettiConfig} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl max-w-3xl w-full p-8 relative z-10"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-2"
            >
              <FiAward className="text-4xl text-yellow-500 mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Test Completed! 🎉
            </h1>
            <p className="text-gray-500 mt-2">
              Here's your detailed performance summary
            </p>
          </motion.div>

          {/* Performance Level Badge */}
          <motion.div
            className={`flex items-center justify-center mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 ${getPerformanceColor()}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {getPerformanceBadge()}
            <span className="ml-2 font-semibold">{performanceLevel}</span>
          </motion.div>

          {/* Main Score */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <h2 className="text-5xl font-bold text-indigo-600">{wpm} WPM</h2>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-indigo-50 p-5 rounded-xl text-center shadow-sm border border-indigo-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 8 }}
              >
                <FiTrendingUp className="text-indigo-600 text-3xl mx-auto mb-2" />
              </motion.div>
              <h3 className="text-lg font-semibold">{accuracy}%</h3>
              <p className="text-gray-500 text-sm">Accuracy</p>
            </motion.div>

            <motion.div
              className="bg-green-50 p-5 rounded-xl text-center shadow-sm border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 7 }}
              >
                <FiClock className="text-green-600 text-3xl mx-auto mb-2" />
              </motion.div>
              <span className="text-base ml-2 text-gray-500">
                (
                {Number.isInteger(minutes)
                  ? `${minutes} min mode`
                  : `${minutes * 60} seconds`}
                )
              </span>

              <p className="text-gray-500 text-sm">Time Taken</p>
            </motion.div>

            <motion.div
              className="bg-yellow-50 p-5 rounded-xl text-center shadow-sm border border-yellow-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 6 }}
              >
                <FiTarget className="text-yellow-600 text-3xl mx-auto mb-2" />
              </motion.div>
              <h3 className="text-lg font-semibold">{total}</h3>
              <p className="text-gray-500 text-sm">Total Words</p>
            </motion.div>
          </div>

          {/* Extra Details */}
          <motion.div
            className="bg-gray-50 rounded-xl p-5 mb-8 text-center border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="flex justify-center space-x-6">
              <div>
                <span className="font-semibold text-green-600">{correct}</span>
                <p className="text-gray-600 text-sm">Correct</p>
              </div>
              <div>
                <span className="font-semibold text-red-500">{incorrect}</span>
                <p className="text-gray-600 text-sm">Incorrect</p>
              </div>
            </div>
          </motion.div>

          {/* Progress Visualization */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Typing Speed</span>
              <span className="text-sm font-semibold">{wpm} WPM</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-indigo-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(wpm, 100)}%` }}
                transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>50</span>
              <span>100+</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
          >
            <Link
              href={`/typing/${minutes}min`}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all cursor-pointer"
            >
              <FiRepeat className="animate-spin-slow" />
              Try Again
            </Link>

            <Link
              href="/share" // <-- yaha apna route daalo
              className="flex items-center justify-center gap-2 bg-white text-indigo-600 border border-indigo-200 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all cursor-pointer"
            >
              <FiShare />
              Share Results
            </Link>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
            >
              <FiHome />
              Go Home
            </Link>
          </motion.div>

          {/* Floating celebration elements */}
          <AnimatePresence>
            {showConfetti && (
              <>
                <motion.div
                  className="absolute -top-2 -right-2 text-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8 }}
                >
                  🎯
                </motion.div>
                <motion.div
                  className="absolute -bottom-2 -left-2 text-2xl"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  ⚡
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
