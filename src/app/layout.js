// app/layout.js
import "./globals.css";

export const defaultTitle = "Pro Typing Test - Boost Your Speed & Accuracy";

export const metadata = {
  title: {
    default: defaultTitle,
    template: "%s | Pro Typing Test - Improve Your WPM",
  },
  description:
    "Take the ultimate online typing test to measure your WPM and typing accuracy. Improve your typing skills with 1, 2, or 5-minute tests, real-time analytics, and detailed performance reports.",
  keywords: [
    "typing test",
    "online typing speed test",
    "WPM test",
    "typing accuracy",
    "ProType test",
    "improve typing skills",
    "typing practice",
    "typing speed challenge",
  ],
  authors: [{ name: "pawan", url: "https://yourdomain.com" }],
  creator: "pawan",
  publisher: "Pro Typing Test",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  // manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logoicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: defaultTitle,
    description:
      "Check your typing speed and accuracy online. Free 1, 2, or 5-minute typing tests with analytics and performance tracking.",
    url: "https://yourdomain.com",
    siteName: "Pro Typing Test",
    images: [
      {
        url: "/logoicon.png",
        width: 1200,
        height: 630,
        alt: "Pro Typing Test - Typing Speed & Accuracy",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "Take the online typing test and improve your speed and accuracy. Free, fast, and accurate typing tests for all levels.",
    images: ["/logoicon.png"],
    site: "@ProTypingTest",
    creator: "@ProTypingTest", // change if you have real handle
  },
  alternates: {
    canonical: "https://yourdomain.com",
    languages: {
      "en-US": "https://yourdomain.com",
      "en-GB": "https://yourdomain.com/en-gb",
    },
  },
  verification: {
    google: "your-google-site-verification-code",
    bing: "your-bing-site-verification-code",
  },
  metadataBase: new URL("https://yourdomain.com"),
  formatDetection: { telephone: false, email: false, address: false },
  other: {
    "theme-color": "#4F46E5",
    "msapplication-TileColor": "#4F46E5",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Pro Typing Test",
              url: "https://yourdomain.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://yourdomain.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning={true} className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {children}
      </body>
    </html>
  );
}
