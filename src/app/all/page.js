import { Suspense } from "react";
import AllStudentsClient from "../components/AllStudentsClient";

export default function Page() {
  return (
    <div className="bg-[url('/bg.jpeg')] bg-repeat w-full min-h-screen">
      <Suspense
        fallback={<p className="text-center mt-10 ">Loading students...</p>}
      >
        <AllStudentsClient />
      </Suspense>
    </div>
  );
}
