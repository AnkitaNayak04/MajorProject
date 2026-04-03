// import React, { useState } from "react";

// const studentAchievements = [
//   {
//     id: 1,
//     title: "Hackathon Winner",
//     name: "Ankita Nayak",
//     shortDesc: "1st prize in National Level Hackathon",
//     fullDesc:
//       "Won 1st prize in a National Level Hackathon 2024 by developing an innovative web solution.",
//     year: "2024",
//     coverImage: "https://via.placeholder.com/120",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//   },
// ];

// const facultyAchievements = [
//   {
//     id: 2,
//     title: "Research Publication",
//     name: "Prof. Satya Narayan Das",
//     shortDesc: "Published research paper in IEEE Journal",
//     fullDesc:
//       "Published a research paper in an IEEE indexed journal focusing on Artificial Intelligence.",
//     year: "2023",
//     coverImage: "https://via.placeholder.com/120",
//     images: [
//       "https://via.placeholder.com/300",
//       "https://via.placeholder.com/300",
//     ],
//   },
// ];

// function Achievements() {
//   const [activeTab, setActiveTab] = useState("student");
//   const [selected, setSelected] = useState(null);

//   const data =
//     activeTab === "student" ? studentAchievements : facultyAchievements;

//   return (
//     <div className="bg-gray-100 py-20 px-4">
//       <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

//         <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
//           Achievements
//         </h1>

//         {/* TABS */}
//         <div className="flex justify-center gap-6 mb-10">
//           <button
//             onClick={() => setActiveTab("student")}
//             className={`px-6 py-2 rounded-full ${
//               activeTab === "student"
//                 ? "bg-red-700 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             Student
//           </button>

//           <button
//             onClick={() => setActiveTab("faculty")}
//             className={`px-6 py-2 rounded-full ${
//               activeTab === "faculty"
//                 ? "bg-red-700 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             Faculty
//           </button>
//         </div>

//         {/* ACHIEVEMENT LIST */}
//         <div className="space-y-6">
//           {data.map((item) => (
//             <div
//               key={item.id}
//               className="border rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition"
//             >
//               {/* LEFT CONTENT */}
//               <div>
//                 <h3 className="text-lg font-semibold">{item.title}</h3>
//                 <p className="text-sm text-gray-600">{item.name}</p>
//                 <p className="text-gray-700 mt-2">{item.shortDesc}</p>
//                 <p className="text-sm text-gray-500 mt-1">Year: {item.year}</p>

//                 <button
//                   onClick={() => setSelected(item)}
//                   className="mt-3 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
//                 >
//                   View
//                 </button>
//               </div>

//               {/* RIGHT IMAGE */}
//               <img
//                 src={item.coverImage}
//                 alt="achievement"
//                 className="w-28 h-28 object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>

//         {/* DETAILS MODAL */}
//         {selected && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white max-w-3xl w-full p-8 rounded-2xl relative">
//               <button
//                 onClick={() => setSelected(null)}
//                 className="absolute top-3 right-4 text-xl font-bold"
//               >
//                 ✕
//               </button>

//               <h2 className="text-2xl font-bold text-red-700 mb-2">
//                 {selected.title}
//               </h2>

//               <p className="text-gray-600">{selected.name}</p>
//               <p className="mt-4 text-gray-700">{selected.fullDesc}</p>

//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 {selected.images.map((img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt="achievement"
//                     className="rounded-lg"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Achievements;
import React, { useState, useEffect } from "react";
import axios from "axios";

function Achievements() {
  const [activeTab, setActiveTab] = useState("student");
  const [selected, setSelected] = useState(null);
  const [studentAchievements, setStudentAchievements] = useState([]);
  const [facultyAchievements, setFacultyAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch achievements from API
  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://deptconnect-1kcc.onrender.com/api/achievements");
      const allAchievements = response.data;
      
      // Separate student and faculty achievements
      const students = students = (Array.isArray(allAchievements) ? allAchievements : []).filter(
  a => a.type === "student"
);
      const faculties = students = (Array.isArray(allAchievements) ? allAchievements : []).filter(
  a => a.type === "faculty"
);
      
      setStudentAchievements(students);
      setFacultyAchievements(faculties);
      setError(null);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    return activeTab === "student" ? studentAchievements : facultyAchievements;
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
          <div className="text-xl text-gray-600">Loading achievements...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
          <div className="text-xl text-red-600">{error}</div>
          <button 
            onClick={fetchAchievements}
            className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();

  return (
    <div className="bg-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-red-700 mb-10">
          Achievements
        </h1>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={() => setActiveTab("student")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "student"
                ? "bg-red-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Student ({studentAchievements.length})
          </button>

          <button
            onClick={() => setActiveTab("faculty")}
            className={`px-6 py-2 rounded-full transition-all ${
              activeTab === "faculty"
                ? "bg-red-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Faculty ({facultyAchievements.length})
          </button>
        </div>

        {/* ACHIEVEMENT LIST */}
        {currentData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No achievements found for {activeTab}s.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentData.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition"
              >
                {/* LEFT CONTENT */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="text-gray-700 mt-2">{item.shortDesc}</p>
                  <p className="text-sm text-gray-500 mt-1">Year: {item.year}</p>

                  <button
                    onClick={() => setSelected(item)}
                    className="mt-3 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
                  >
                    View Details
                  </button>
                </div>

                {/* RIGHT IMAGE */}
                {item.coverImage && (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-28 h-28 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/120";
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* DETAILS MODAL */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white max-w-3xl w-full p-8 rounded-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-4 text-2xl font-bold hover:text-red-700 transition"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-red-700 mb-2">
                {selected.title}
              </h2>

              <p className="text-gray-600 font-medium">{selected.name}</p>
              <p className="text-gray-500 text-sm mb-4">Year: {selected.year}</p>
              
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selected.fullDesc}</p>
              </div>

              {selected.images && selected.images.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selected.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Achievement ${index + 1}`}
                        className="rounded-lg w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300";
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;