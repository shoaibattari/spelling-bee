import EntryPassImage from "./EntryPassImage";
import { downloadEntryPass } from "../utils/downloadEntryPass";

export default function StudentCard({ student, highlight }) {
  return (
    <div
      className={`p-4 rounded-xl border shadow-sm relative transition-all duration-300
        flex flex-col justify-between h-full
        ${
          highlight
            ? "bg-yellow-100 border-yellow-400 hover:bg-yellow-200"
            : "bg-white border-gray-200 hover:bg-gray-50"
        }
        hover:shadow-lg`}
    >
      <div>
        {/* Student Name with Animated Bee */}
        <h2 className="font-bold text-lg mb-2 flex items-center gap-2 text-yellow-800">
          <span className="animate-bee">🐝</span> {student.studentName}
        </h2>

        {/* Student Info */}
        <p className="text-gray-700 mb-1">
          Roll No:{" "}
          <span className="font-bold text-lg">{student.rollNumber || "-"}</span>
        </p>
        <p className="text-gray-700 mb-1">
          Father: {student.fatherName || "-"}
        </p>
        <p className="text-gray-700 mb-1">
          Category: {student.category || "-"}
        </p>
        <p className="text-gray-700 mb-1">Age: {student.age || "-"}</p>
        <p className="text-gray-700 mb-1">
          Community: {student.khundiWithGroup || "-"}
        </p>
        <p className="text-gray-700 mb-1">
          School: {student.nameOfSchool || "-"}
        </p>

        {/* Hidden Entry Pass */}
        <div className="absolute -left-2499.75 top-0">
          <EntryPassImage student={student} />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={() =>
          downloadEntryPass(
            `entry-pass-${student.id}`,
            `${student.rollNumber}-entry-pass.png`
          )
        }
        className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-lg cursor-pointer 
                   hover:bg-yellow-700 hover:scale-105 transition-all duration-300"
      >
        Download Entry Pass
      </button>
    </div>
  );
}
