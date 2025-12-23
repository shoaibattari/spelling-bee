export const metadata = {
  title: "Spelling Bee Rules | Junior, Rising, Skilled & Master Bees",
  description:
    "Official Spelling Bee rules for Junior Bees, Rising Bees, Skilled Bees and Master Bees categories. View category-wise rules and guidelines.",
  keywords: [
    "Spelling Bee Rules",
    "Junior Bees Rules",
    "Rising Bees Rules",
    "Skilled Bees Rules",
    "Master Bees Rules",
    "Spelling Competition",
    "OMYS Spelling Bee",
  ],
  openGraph: {
    title: "Spelling Bee Rules 🐝",
    description:
      "Category-wise Spelling Bee rules for Junior, Rising, Skilled and Master Bees.",
    images: [
      {
        url: "/header.jpeg", // main preview image
        width: 1200,
        height: 630,
        alt: "Spelling Bee Rules",
      },
    ],
  },
};

import Rules from "@/app/components/Rules";

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-[url('/bg.jpeg')] bg-cover bg-cente bg-no-repeat">
      <Rules />;
    </div>
  );
}
