import Image from "next/image";

export default function EntryPassImage({ student }) {
  return (
    <div
      id={`entry-pass-${student.id}`}
      className="w-full h-[420px] mx-auto p-5 rounded-2xl bg-[url('/bg.jpeg')] bg-cover bg-center
      bg-gradient-to-br from-yellow-200 via-yellow-100 to-white
      text-gray-900 border-4 border-yellow-500 flex flex-col"
    >
      {/* HEADER IMAGE */}
      <div className="relative w-full h-20 mb-3 flex justify-center">
        <Image
          src="/header.jpg"
          alt="OMJ Logo"
          fill
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* TITLE */}
      <h2 className="text-center text-lg font-extrabold mb-3">
        🐝 Spelling Bee Entry Pass
      </h2>

      {/* STUDENT INFO */}
      <div className="space-y-1 text-sm flex-1">
        <h2 className="text-center text-lg font-extrabold ">
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
      <div className="text-xs text-center text-gray-600 mt-3">
        Please bring this entry pass on competition day
      </div>
    </div>
  );
}
