"use client";

import React, { useState, useEffect, useTransition, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import { useRouter } from "next/navigation";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

// Dynamically load the chart to reduce initial bundle size and avoid SSR issues
const Line = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  { ssr: false, loading: () => <div className="h-64 flex items-center justify-center">Loading chart...</div> }
);

const TypingHome = () => {
  const [activeTab, setActiveTab] = useState("speed");
  const router = useRouter();
  const [allResults, setAllResults] = useState([]); // load once from localStorage
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState(null);

  // Load localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem("typingResults")) || [];
      // normalize date to ISO strings to avoid repeated Date objects during render
      const normalized = saved.map((r) => ({ ...r, date: r.date }));
      setAllResults(normalized.reverse());
    } catch (err) {
      console.error("Failed to parse typingResults from localStorage", err);
      setAllResults([]);
    }
  }, []);

  // Filter results by duration using useMemo (fast on re-renders)
  const results = useMemo(() => {
    // ensure numeric comparison in case stored values are strings
    return allResults.filter((r) => Number(r.minutes) === Number(selectedDuration));
  }, [allResults, selectedDuration]);

  // Memoized derived data used by charts and cards
  const labels = useMemo(
    () =>
      results.map((r) =>
        new Date(r.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })
      ),
    [results]
  );

  const wpmData = useMemo(() => results.map((r) => r.wpm), [results]);
  const accuracyData = useMemo(() => results.map((r) => r.accuracy), [results]);

  const recentResults = useMemo(() => results.slice(0, 5), [results]);

  const averageWpm = useMemo(() => {
    if (results.length === 0) return 0;
    return (results.reduce((sum, r) => sum + r.wpm, 0) / results.length).toFixed(1);
  }, [results]);

  const averageAccuracy = useMemo(() => {
    if (results.length === 0) return 0;
    return (results.reduce((sum, r) => sum + r.accuracy, 0) / results.length).toFixed(1);
  }, [results]);

  // Safe min for accuracy scale
  const accuracyMin = useMemo(() => {
    if (accuracyData.length === 0) return 0;
    return Math.max(0, Math.min(...accuracyData) - 10);
  }, [accuracyData]);

  // Safe max for wpm scale
  const wpmMax = useMemo(() => {
    if (wpmData.length === 0) return 110; // default
    return Math.max(100, ...wpmData) + 10;
  }, [wpmData]);

  const handleStart = useCallback(
    (minutes) => {
      setLoadingId(minutes);
      startTransition(() => {
        // router.push inside a transition is okay
        router.push(`/typing/${minutes}min`);
      });
    },
    [router, startTransition]
  );

  const selectDuration = useCallback((minutes) => {
    setSelectedDuration(minutes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800 font-sans">
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className="mr-4 text-gray-600 hover:text-purple-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">ProType</h1>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">U</div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="p-6 w-72 h-full bg-white shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">ProType Test</h1>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 hover:text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <nav className="mb-8">
                <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Timed Tests</h2>
                <div className="space-y-2">
                  {[1, 2, 5, 10].map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => {
                        selectDuration(minutes);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        selectedDuration === minutes
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{minutes} Minute{minutes !== 1 ? "s" : ""}</span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/typing/${minutes}min`);
                            setIsMenuOpen(false);
                          }}
                          className={`text-xs px-2 py-1 rounded-full ${
                            selectedDuration === minutes
                              ? "bg-white/20 hover:bg-white/30"
                              : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
                          }`}
                        >
                          Start
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:w-72 flex-col bg-blue-50 border-r border-gray-200 p-6 shadow-lg">
          <div className="mb-10">
            <p className="text-3xl font-bold"><span className="text-blue-600">Pro</span>Type Test</p>
            <p className="text-gray-500 text-sm mt-2">Boost your typing speed to new heights</p>
          </div>

          <nav className="flex-1">
            <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-500 mb-4">Timed Tests</h2>
            <div className="space-y-2">
              {[0.5, 1, 2, 5, 10].map((minutes) => (
                <div
                  key={minutes}
                  onClick={() => selectDuration(minutes)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all cursor-pointer ${
                    selectedDuration === minutes
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {minutes === 0.5 ? "30 Seconds" : `${minutes} Minute${minutes !== 1 ? "s" : ""}`}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStart(minutes);
                      }}
                      disabled={isPending && loadingId === minutes}
                      className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                        selectedDuration === minutes
                          ? "bg-white/20 hover:bg-white/30"
                          : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
                      }`}
                    >
                      {isPending && loadingId === minutes ? (
                        <div className="flex items-center gap-1 py-1.5">
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                        </div>
                      ) : (
                        "Start"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Typing Analytics</h1>
              <p className="text-gray-600">Track your progress and improve your typing skills</p>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-2 bg-white p-1 rounded-lg shadow-inner ">
              {[1, 2, 5].map((min) => (
                <button
                  key={min}
                  onClick={() => selectDuration(min)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                    selectedDuration === min
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-gray-600 hover:text-purple-600 bg-white"
                  }`}
                >
                  {min} Min
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border  border-blue-300 transition-all shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Total Tests</p>
                  <h3 className="text-3xl font-bold mt-1 text-gray-800">{results.length}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">{selectedDuration}-minute tests completed</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-purple-300 transition-all shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Average WPM</p>
                  <h3 className="text-3xl font-bold mt-1 text-gray-800">{averageWpm}</h3>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" style={{ width: `${Math.min(100, averageWpm)}%` }}></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-green-300 transition-all shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">Average Accuracy</p>
                  <h3 className="text-3xl font-bold mt-1 text-gray-800">{averageAccuracy}%</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500" style={{ width: `${averageAccuracy}%` }}></div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Speed (WPM)</h3>
                <div className="flex items-center gap-2 text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-semibold">{wpmData[wpmData.length - 1] || 0} WPM</span>
                </div>
              </div>
              <div className="h-64">
                <Line
                  data={useMemo(() => ({
                    labels,
                    datasets: [
                      {
                        label: "WPM",
                        data: wpmData,
                        borderColor: "#3B82F6",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: "#3B82F6",
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }), [labels, wpmData])}
                  options={useMemo(() => ({
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        titleColor: "#111827",
                        bodyColor: "#111827",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        borderWidth: 1,
                      },
                    },
                    scales: {
                      x: {
                        grid: { color: "rgba(0, 0, 0, 0.05)" },
                        ticks: { color: "rgba(0, 0, 0, 0.6)" },
                      },
                      y: {
                        min: 0,
                        max: wpmMax,
                        grid: { color: "rgba(0, 0, 0, 0.05)" },
                        ticks: { color: "rgba(0, 0, 0, 0.6)" },
                      },
                    },
                  }), [wpmMax])}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Accuracy (%)</h3>
                <div className="text-green-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div className="h-64">
                <Line
                  data={useMemo(() => ({
                    labels,
                    datasets: [
                      {
                        label: "Accuracy",
                        data: accuracyData,
                        borderColor: "#10B981",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: "#10B981",
                        borderWidth: 2,
                        fill: true,
                      },
                    ],
                  }), [labels, accuracyData])}
                  options={useMemo(() => ({
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        mode: "index",
                        intersect: false,
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        titleColor: "#111827",
                        bodyColor: "#111827",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        borderWidth: 1,
                      },
                    },
                    scales: {
                      x: {
                        grid: { color: "rgba(0, 0, 0, 0.05)" },
                        ticks: { color: "rgba(0, 0, 0, 0.6)" },
                      },
                      y: {
                        min: accuracyMin,
                        max: 100,
                        grid: { color: "rgba(0, 0, 0, 0.05)" },
                        ticks: { color: "rgba(0, 0, 0, 0.6)" },
                      },
                    },
                  }), [accuracyMin])}
                />
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Recent {selectedDuration}-Minute Tests</h2>
              <button className="text-sm text-blue-500 hover:text-blue-600 flex items-center">View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            {recentResults.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
                <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-600">No results yet</h3>
                <p className="mt-1 text-gray-500">Complete a {selectedDuration}-minute test to see your stats</p>
                <button onClick={() => router.push(`/typing/${selectedDuration}min`)} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity shadow-md">Take a Test Now</button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentResults.map((test, idx) => (
                  <div key={idx} className="bg-white p-5 cursor-pointer rounded-xl border border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="bg-gray-100 group-hover:bg-blue-50 px-4 py-2 rounded-lg transition-all">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{new Date(test.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                        </div>

                        <div>
                          <p className="text-xl font-bold text-gray-800">{test.wpm} <span className="text-sm font-normal text-gray-500">WPM</span></p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                              <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" style={{ width: `${Math.min(100, test.wpm)}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500">{test.accuracy}% Accuracy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TypingHome;
