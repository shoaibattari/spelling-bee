export default function EntryPass({ student }) {
  return (
    <div className="p-6 w-[350px] border rounded-xl text-sm">
      <h2 className="text-xl font-bold text-center mb-4">
        🐝 Spelling Bee Entry Pass
      </h2>

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

      <div className="mt-6 text-center text-xs text-gray-500">
        Please bring this entry pass on competition day
      </div>
    </div>
  );
}
