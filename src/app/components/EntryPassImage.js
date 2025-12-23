import Image from "next/image";

export default function EntryPassImage({ student }) {
  return (
    <div
      id={`entry-pass-${student.id}`}
      className="w-full h-fit mx-auto px-5 pb-3 rounded-2xl bg-[url('/bg.jpeg')] bg-cover bg-center
      bg-linear-to-br from-yellow-200 via-yellow-100 to-white
      text-gray-900 border-4 border-yellow-500 flex flex-col"
    >
      {/* HEADER IMAGE */}
      <div className="relative w-full h-28 mx-auto mb-1 flex justify-center">
        <Image
          src="/header.jpg"
          alt="OMJ Logo"
          fill
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* TITLE */}
      <h2 className="text-center text-lg font-extrabold">
        🐝 Spelling Bee Entry Pass
      </h2>

      {/* STUDENT INFO */}
      <div className="space-y-1 text-sm flex-1">
        <h2 className="text-center text-lg font-extrabold px-2 py-1.5 mt-0.5 bg-amber-300 rounded-md w-fit mx-auto ">
          🐝 {student.category}
        </h2>
        <p>
          <b>Name:</b> {student.studentName || "-"}
        </p>
        <p>
          <b>Father Name:</b> {student.fatherName || "-"}
        </p>
        <p>
          <b>Roll No: {student.rollNumber || "-"}</b>
        </p>
        <p>
          <b>Category:</b> {student.category || "-"}
        </p>
        <p>
          <b>Class:</b> {student.class || "-"}
        </p>
        <p>
          <b>School:</b> {student.nameOfSchool || "-"}
        </p>
        <p>
          <b>Community:</b> {student.khundiWithGroup || "-"}
        </p>
        <p>
          <b>Area:</b> {student.area || "-"}
        </p>
      </div>

      {/* FOOTER NOTE */}
      <div className="px-2 py-1.5 mt-2 bg-amber-300 rounded-md">
        <p className="text-sm text-center text-black mt-1">
          Please bring this entry pass on audition day
        </p>
        <p className="text-base font-bold text-center text-black max-w-64 mx-auto mt-1 capitalize">
          The audition will be held on 25th december 2025 at Husein Ebrahim
          sports complex & Community center, F.B.area karachi.
        </p>
      </div>
    </div>
  );
}
