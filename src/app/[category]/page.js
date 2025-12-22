import CategoryPageClient from "@/app/components/CategoryPageClient";
import { categories } from "@/app/constant/data";

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
