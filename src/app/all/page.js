import { Suspense } from "react";
import AllStudentsClient from "../components/AllStudentsClient";

export default function Page() {
  return (
    <Suspense
      fallback={<p className="text-center mt-10 ">Loading students...</p>}
    >
      <AllStudentsClient />
    </Suspense>
  );
}
