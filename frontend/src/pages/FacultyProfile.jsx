import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function FacultyProfile() {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    axios
      .get(`https://deptconnect-1kcc.onrender.com/api/faculty/${id}`)
      .then((res) => setFaculty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!faculty) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        {/* TOP PROFILE SECTION */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* LEFT IMAGE */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative group">

              <div className="absolute -inset-2 bg-gray-100 rounded-2xl"></div>

              <div className="relative bg-white p-2 rounded-2xl shadow-md group-hover:shadow-lg transition duration-300">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  onError={(e) => (e.target.src = "/default-user.png")}
                  className="w-48 md:w-56 h-auto rounded-xl object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="w-full md:w-2/3 mt-6 md:mt-12">
            <h1 className="text-3xl font-bold text-gray-900">
              {faculty.name}
            </h1>

            <p className="text-gray-700 font-medium mt-2">
              {faculty.designation}
            </p>

            <p className="text-blue-600 mt-1">
              Email: {faculty.email}
            </p>
          </div>

        </div>

        {/* BIO SECTION */}
        <div className="mt-14">
          <div className="flex items-center gap-6 mb-6">
            <h2 className="text-7xl font-extrabold text-gray-200 leading-none">
              BIO
            </h2>
            <div className="h-[1px] bg-gray-300 flex-1"></div>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-justify">
            {faculty.bio}
          </p>
        </div>

      </div>
    </div>
  );
}

export default FacultyProfile;