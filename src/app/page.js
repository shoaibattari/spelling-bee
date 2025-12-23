export const metadata = {
  title: "OMJ Spelling Bee Competition | Search Students & Download Entry Pass",
  description:
    "Official Spelling Bee Competition portal. Search registered students, browse categories, view statistics and download entry passes easily.",
  keywords: [
    "Spelling Bee",
    "Spelling Bee Competition",
    "Student Registration",
    "Entry Pass Download",
    "OMJ Spelling Bee",
    "OMYS Competition",
  ],
  authors: [{ name: "Shoaib Abdul Sattar Khosa" }],
  openGraph: {
    title: "OMJ Spelling Bee Competition 🐝",
    description:
      "Search students, explore categories and download entry passes for the Spelling Bee Competition.",
    url: "https://omj-spellingbee.vercel.app/", // optional
    siteName: "Spelling Bee Competition",
    images: [
      {
        url: "/header.jpeg", // must be in public folder
        width: 1200,
        height: 630,
        alt: "Spelling Bee Competition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spelling Bee Competition 🐝",
    description:
      "Search students, browse categories and download entry passes.",
    images: ["/bg.jpeg"],
  },
};

import React from "react";
import LandingPage from "./components/LandingPage";

const page = () => {
  return <LandingPage />;
};

export default page;
