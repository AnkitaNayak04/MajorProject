import React, { useEffect, useState } from "react";
import axios from "axios";

function NoticeAnnouncementSection() {
  const [activeTab, setActiveTab] = useState("notices");
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("https://deptconnect-1kcc.onrender.com/api/notices")
      .then(res => setNotices(res.data))
      .catch(() => {});

    axios.get("https://deptconnect-1kcc.onrender.com/api/announcements")
      .then(res => setAnnouncements(res.data))
      .catch(() => {});
  }, []);

  const data = activeTab === "notices" ? notices : announcements;
  const scrollDuration = activeTab === "notices" ? "9s" : "10s";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-red-700">
            Notice Board
          </h2>
          <div className="w-32 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-3">
            Official notices & announcements
          </p>
        </div>

        {/* BOARD */}
        <div className="bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto">

          {/* TABS */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("notices")}
              className={`flex-1 py-4 font-bold transition
                ${activeTab === "notices"
                  ? "bg-red-700 text-white"
                  : "bg-gray-50 hover:bg-red-50"}`}
            >
              NOTICES
            </button>

            <button
              onClick={() => setActiveTab("announcements")}
              className={`flex-1 py-4 font-bold transition
                ${activeTab === "announcements"
                  ? "bg-red-700 text-white"
                  : "bg-gray-50 hover:bg-red-50"}`}
            >
              ANNOUNCEMENTS
            </button>
          </div>

          {/* CONTENT */}
          <div className="px-8 py-6">
            <div className="max-h-[420px] overflow-hidden relative">

              {/* SCROLL LIST */}
              <ul
                key={activeTab}
                className="space-y-6 scroll-up"
                style={{ animationDuration: scrollDuration }}
              >
                {data.length === 0 && (
                  <li className="text-center py-16 text-gray-500">
                    No data available
                  </li>
                )}

                {data.map(item => (
                  <li
                    key={item._id}
                    className="flex gap-4 p-4 rounded-xl
                               bg-gray-50 hover:bg-red-50
                               transition-all border-l-4 border-red-600"
                  >
                    <span className="text-red-700 text-xl font-bold">➤</span>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                        <span className="ml-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                          NEW
                        </span>
                      </p>

                      {item.description && (
                        <p className="text-gray-600 text-sm mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default NoticeAnnouncementSection;
