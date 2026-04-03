import React from "react";

function HodMessage() {
  return (
    <section className="py-24 bg-red-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-700">
            Message from HOD
          </h2>
          <div className="w-32 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-3">
            Head of the Department
          </p>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row items-center gap-12
                        bg-white rounded-3xl shadow-2xl p-12">

          {/* IMAGE */}
          <div className="flex-shrink-0">
            <div className="relative w-56 h-56">
              <div className="absolute inset-0 rounded-full bg-red-600 blur-xl opacity-20"></div>
              <img
                // src="/hod.png"
                alt="HOD"
                className="relative w-full h-full rounded-full object-cover
                           border-4 border-red-700 bg-white"
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">
              Prof. Satya Narayan Das
            </h3>
            <p className="text-red-700 font-semibold mt-1">
              Head of the Department, Computer Applications
            </p>

            <p className="text-gray-600 leading-relaxed mt-6 max-w-3xl">
              Welcome to the Department of Computer Applications. Our department
              is committed to academic excellence, innovation, and holistic
              development of students. We strive to create an environment that
              nurtures technical competence, ethical values, and professional
              growth.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              I encourage students to actively participate in academic,
              co-curricular, and extracurricular activities to prepare
              themselves for future challenges in the industry and society.
            </p>

            {/* SIGNATURE */}
            <div className="mt-8">
              <p className="font-bold text-gray-800">
                Prof. Satya Narayan Das
              </p>
              <p className="text-sm text-gray-500">
                HOD – Department of Computer Applications
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default HodMessage;
