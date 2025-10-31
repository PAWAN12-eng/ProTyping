"use client";

import TypingResult from "@/components/TypingResult";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);

  const wpm = searchParams.get("wpm") || "0";
  const minutes = searchParams.get("minutes") || "1";
  const accuracy = searchParams.get("accuracy") || "0";

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("typingResults")) || [];
    setResult(results[results.length - 1]);
  }, []);

  if (!wpm || !minutes || !accuracy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">
          No results found. Please take a test first.
        </p>
      </div>
    );
  }

  const title = `Typing Test Result: ${wpm} WPM in ${minutes} min | Accuracy ${accuracy}%`;
  const description = `Your typing test result: ${wpm} WPM in ${minutes} minute(s) with ${accuracy}% accuracy. Improve your typing speed with Pro Typing Test online.`;

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.yourwebsite.com/results";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: currentUrl,
    mainEntity: {
      "@type": "Dataset",
      name: "Typing Test Result",
      description: `Typing speed: ${wpm} WPM, Duration: ${minutes} minutes, Accuracy: ${accuracy}%`,
    },
  };

  return (
    <div className="min-h-screen items-center bg-gray-50">
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

      {result && (
        <TypingResult
          wpm={parseInt(wpm)}
          minutes={parseInt(minutes)}
          accuracy={parseInt(accuracy)}
          result={result}
        />
      )}
    </div>
  );
}
