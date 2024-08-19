import React from "react";
import Image from "next/image";
import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

interface Teacher {
  name: string;
  email: string;
}

interface ClassItem2 {
  teachers: Teacher[];
}

function ClassCard({ classItem2 }: { classItem2: ClassItem2 }) {
  function formatTeacherInfo(teachers: Teacher[]) {
    return teachers.map((teacher, index) => (
      <div key={`teacher-${index}`}>
        <div className="text-xl font-semibold mb-2">{teacher.name}</div>
        <div className="border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-600 mb-2">
          {teacher.email}
        </div>
      </div>
    ));
  }

  return (
    <div className="border border-gray-200 p-4 flex flex-col items-center text-center bg-white shadow-md rounded-lg">
      <div className="w-32 h-32 mb-4">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
          alt="User"
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {formatTeacherInfo(classItem2.teachers)}

      <div className="flex space-x-3 mb-4">
        <Link href="#" className="text-gray-600 hover:text-blue-500">
          <FacebookOutlined />
        </Link>
        <Link href="#" className="text-gray-600 hover:text-blue-500">
          <TwitterOutlined />
        </Link>
        <Link href="#" className="text-gray-600 hover:text-blue-500">
          <YoutubeOutlined />
        </Link>
      </div>

      <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
        Shop with me
      </button>
    </div>
  );
}

export default ClassCard;
