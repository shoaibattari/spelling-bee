import Image from "next/image";

export default function EntryPassImage({ student }) {
  return (
    <div
      id={`entry-pass-${student.id}`}
      className="w-90 h-130 p-6 rounded-2xl
      bg-linear-to-br from-yellow-200 via-yellow-100 to-white
      text-gray-900 border-4 border-yellow-500"
    >
      {" "}
      <div className="flex items-center mb-4">
        {/* Logo on the left */}
        <div className="w-20 h-6 relative mr-4">
          <Image
            src="/omj-logo.png"
            alt="OMJ Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Title and subtitle on the right */}
        <div className="flex flex-col ">
          <h2 className="text-2xl font-extrabold">🐝 Spelling Bee</h2>
          <p className="text-base ml-5 text-gray-700">Official Entry Pass</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <b>Name:</b> {student.studentName}
        </p>
        <p>
          <b>Roll No:</b> {student.rollNumber}
        </p>
        <p>
          <b>Category:</b> {student.category}
        </p>
        <p>
          <b>Class:</b> {student.class}
        </p>
        <p>
          <b>School:</b> {student.nameOfSchool}
        </p>
        <p>
          <b>Area:</b> {student.area}
        </p>
      </div>
      <div className="absolute bottom-6 left-0 right-0 text-center text-xs">
        Please bring this entry pass on competition day
      </div>
    </div>
  );
}
