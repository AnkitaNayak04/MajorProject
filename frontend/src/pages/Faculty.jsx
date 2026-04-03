import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Faculty() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    axios
      .get("https://deptconnect-1kcc.onrender.com/api/faculty")
      .then((res) => setFacultyData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-red-100">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center text-red-700 mb-12">
            Our Faculty
          </h1>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {facultyData.map((faculty, index) => (
              <Link
                key={faculty._id}
                to={`/faculty/${faculty._id}`}
                className="group"
              >
                <div
                  className="rounded-2xl p-6 text-center
                  bg-gradient-to-br from-white via-red-50 to-white
                  border-2 border-red-500
                  shadow-md
                  transform transition-all duration-500
                  hover:-translate-y-3 hover:shadow-red-200 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >

                  IMAGE
                  <div className="w-40 h-40 mx-auto mb-4 rounded-xl overflow-hidden bg-gray-200 border-2 border-red-100">
                    {/* <img
                      src={faculty.image}
                      alt={faculty.name}
                      onError={(e) => (e.target.src = "/default-user.png")}
                      className="w-full h-full object-cover object-top
                      transition duration-500 group-hover:scale-110"
                    /> */}
                  </div>

                  {/* NAME */}
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-700 transition">
                    {faculty.name}
                  </h3>

                  {/* DESIGNATION */}
                  <p className="text-sm text-gray-500 mt-1">
                    {faculty.designation}
                  </p>

                  {/* EMAIL */}
                  <p className="text-sm text-blue-600 mt-2">
                    {faculty.email}
                  </p>

                  {/* LINE */}
                  <div className="mt-4 h-1 w-0 bg-red-600 mx-auto transition-all duration-500 group-hover:w-16 rounded"></div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Faculty;