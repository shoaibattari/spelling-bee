import CategoryPageClient from "@/app/components/CategoryPageClient";
import { categories } from "@/app/constant/data";

/* 🔹 Dynamic Metadata */
export async function generateMetadata({ params }) {
  const slug = params?.category;

  const categoryObj = categories.find(
    (c) => c?.slug && c.slug.trim().toLowerCase() === slug?.trim().toLowerCase()
  );

  if (!categoryObj) {
    return {
      title: "Category Not Found | Spelling Bee",
      description: "Invalid Spelling Bee category.",
    };
  }

  return {
    title: `${categoryObj.name} | Spelling Bee Competition`,
    description: `View registered students and details for ${categoryObj.name} category in the Spelling Bee Competition.`,
    keywords: [
      "Spelling Bee",
      categoryObj.name,
      "Spelling Bee Students",
      "OMJ Spelling Bee",
      "OMYS Competition",
    ],
    openGraph: {
      title: `${categoryObj.name} 🐝 | Spelling Bee`,
      description: `Students list and details for ${categoryObj.name} category.`,
      images: [
        {
          url: "/jbRules.jpeg",
          width: 1200,
          height: 630,
          alt: `${categoryObj.name} Category`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }) {
  // <-- add async
  const resolvedParams = await params; // <-- unwrap promise
  const slug = resolvedParams?.category; // now you can access category

  if (!slug) {
    return (
      <div className="p-10 text-center text-red-500">Invalid category</div>
    );
  }

  // find category safely
  const categoryObj = categories.find(
    (c) => c?.slug && c.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  if (!categoryObj) {
    return (
      <div className="p-10 text-center text-red-500">Category not found</div>
    );
  }

  const categoryName = categoryObj.name;
  return (
    <div className="bg-[url('/bg.jpeg')] bg-repeat w-full min-h-screen">
      <CategoryPageClient categoryName={categoryName} />
    </div>
  );
}
