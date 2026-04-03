import React, { useState } from "react";

const topperData = {
  BCA: {
    "2021-24": {
      name: "Anwesh Kumar",
      score: "98.4%",
      // image: "https://via.placeholder.com/400"
    },
    "2022-25": {
      name: "Anwesh Kumar",
      score: "98.4%",
      // image: "https://via.placeholder.com/400"
    },
    "2023-26": {
      name: "Aryaman Das",
      score: "97.0%",
      // image: "https://via.placeholder.com/400"
    }
  },
  MCA: {
    "2023-25": {
      name: "Rohan Mishra",
      score: "95.2%",
      // image: "https://via.placeholder.com/400"
    },
    "2024-26": {
      name: "Rohan Mishra",
      score: "95.2%",
      // image: "https://via.placeholder.com/400"
    }
  }
};

function ToppersSection() {
  const [program, setProgram] = useState("BCA");
  const [batch, setBatch] = useState("2022-25");

  const handleProgramChange = (newProgram) => {
    const firstBatch = Object.keys(topperData[newProgram])[0];
    setProgram(newProgram);
    setBatch(firstBatch);
  };

  const topper = topperData[program][batch];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-700">
            Batch Topper
          </h2>
          <div className="w-28 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-3">
            Recognising academic excellence
          </p>
        </div>

        {/* PROGRAM SWITCH */}
        <div className="flex justify-center gap-6 mb-10">
          {Object.keys(topperData).map((p) => (
            <button
              key={p}
              onClick={() => handleProgramChange(p)}
              className={`px-10 py-3 rounded-full font-semibold transition-all duration-300
                ${program === p
                  ? "bg-red-700 text-white shadow-xl scale-105"
                  : "bg-white border border-red-200 text-red-700 hover:bg-red-50"}`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* BATCH BUTTONS */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {Object.keys(topperData[program]).map((b) => (
            <button
              key={b}
              onClick={() => setBatch(b)}
              className={`px-6 py-2 rounded-lg font-medium transition-all
                ${batch === b
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white border hover:bg-red-50"}`}
            >
              {program} {b}
            </button>
          ))}
        </div>

        {/* TOPPER CARD */}
        <div className="flex justify-center">
          <div
            key={`${program}-${batch}`}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center
                       transition-all duration-500 hover:-translate-y-2"
          >

            {/* IMAGE */}
            <div className="relative mx-auto w-44 h-44 mb-8">
              <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 rounded-full"></div>
              <img
                src={topper.image}
                alt={topper.name}
                className="relative w-full h-full rounded-full object-cover
                           border-4 border-red-700 bg-white"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2
                               bg-red-700 text-white px-6 py-1.5 text-sm
                               rounded-full shadow-lg">
                {topper.score}
              </span>
            </div>

            {/* DETAILS */}
            <h3 className="text-2xl font-bold text-gray-800">
              {topper.name}
            </h3>

            <p className="text-gray-500 mt-2">
              {program} {batch} Topper
            </p>


          </div>
        </div>

      </div>
    </section>
  );
}

export default ToppersSection;
