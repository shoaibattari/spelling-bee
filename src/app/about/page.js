// Server Component (metadata works here)
export const metadata = {
  title: "About Spelling Bee Competition | OMJ & OMYS",
  description:
    "Learn about the Spelling Bee Competition organized by Okhai Memon Jamat (OMJ) in collaboration with Okhai Memon Youth Services (OMYS).",
  keywords: [
    "Spelling Bee",
    "About Spelling Bee",
    "OMJ",
    "OMYS",
    "Competition",
  ],
  authors: [{ name: "Shoaib Abdul Sattar Khosa" }],
  openGraph: {
    title: "About Spelling Bee Competition 🐝",
    description:
      "Official Spelling Bee Competition organized by OMJ & OMYS. Learn about the event, rules, and participants.",
    images: [
      {
        url: "/bg.jpeg",
        width: 1200,
        height: 630,
        alt: "About Spelling Bee Competition",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Spelling Bee Competition 🐝",
    description:
      "Learn about the Spelling Bee Competition organized by OMJ & OMYS.",
    images: ["/header.jpeg"],
  },
};

import React from "react";
import AboutPage from "../components/AboutPage";

const page = () => {
  return (
    <div className="min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-cente bg-no-repeat">
      <AboutPage />
    </div>
  );
};

export default page;
