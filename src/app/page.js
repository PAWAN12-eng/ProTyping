"use client";

import TypingHome from "@/components/TypingHome";
import Head from "next/head";

export default function DashboardPage() {
  const title = "Pro Typing Test - Free Online Typing Speed & Accuracy Test";
  const description =
    "Take a free online typing test to measure your WPM and accuracy. Improve your typing speed with 1, 2, or 5-minute tests. Track your progress with detailed analytics.";
  const url = typeof window !== "undefined" ? window.location.href : "https://www.yourwebsite.com/";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pro Typing Test",
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="typing test, online typing speed test, WPM, typing accuracy, typing practice, improve typing skills, free typing test"
        />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="/logoicon.png" />
        <meta property="og:site_name" content="Pro Typing Test" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/logoicon.png" />
        <meta name="twitter:site" content="@ProTypingTest" />
        <meta name="twitter:creator" content="@ProTypingTest" />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <TypingHome />
    </>
  );
}
