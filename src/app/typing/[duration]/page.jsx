import TypingPage from "@/components/TypingPage";

// Generate dynamic metadata for 1, 2, 5 min typing pages
export async function generateMetadata({ params }) {
  const { duration } = await params;
  const capitalizedDuration =
    duration.charAt(0).toUpperCase() + duration.slice(1);

  const title = `Typing Test ${capitalizedDuration} - Improve Speed & Accuracy`;
  const description = `Take a ${capitalizedDuration} online typing test to measure your WPM and accuracy. Practice now and improve your typing skills with detailed analytics and real-time performance tracking.`;

  const url = `https://www.yourwebsite.com/typing/${duration}`;

  return {
    title,
    description,
    keywords: [
      "typing test",
      `${duration} typing test`,
      "online typing speed test",
      "WPM test",
      "typing accuracy",
      "improve typing skills",
      "typing practice",
      "typing speed challenge",
    ],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Pro Typing Test",
      images: [
        {
          url: "/logoicon.png",
          width: 1200,
          height: 630,
          alt: `Typing Test ${capitalizedDuration}`,
          type: "image/png",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logoicon.png"],
      site: "@ProTypingTest",
      creator: "@YourTwitterHandle",
    },
    metadataBase: new URL("https://www.yourwebsite.com"),
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: description,
      url: url,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.yourwebsite.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${capitalizedDuration} Typing Test`,
            item: url,
          },
        ],
      },
    },
  };
}

export default async function TypingTestPage({ params }) {
  const { duration } = await params;

  return <TypingPage duration={duration} />;
}
