import React, { useEffect, useState } from "react";
import axios from "axios";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function EventSection() {
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("https://deptconnect-1kcc.onrender.com/api/events")
  .then(res => {
    const data = Array.isArray(res.data) ? res.data : [];
    setEvents(data);
  })
  .catch(err => console.error(err));
  }, []);

 const filteredEvents = (Array.isArray(events) ? events : []).filter(e =>
  new Date(e.date).toLocaleString("default", { month: "long" }) === selectedMonth
);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-700">
           Events
          </h2>
          <div className="w-32 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-3">
            Stay updated with departmental activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* MONTH SELECTOR */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-gray-700">
              Select Month
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {months.map(month => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-all
                    ${selectedMonth === month
                      ? "bg-red-700 text-white shadow-md"
                      : "bg-white border hover:bg-red-50"}`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* EVENTS AREA */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8">

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-red-700">
                  {selectedMonth}
                </h3>
                <span className="text-sm bg-red-100 text-red-700 px-4 py-1 rounded-full">
                  {filteredEvents.length} Events
                </span>
              </div>

              {/* EVENTS LIST */}
              <div className="grid gap-6">

                {filteredEvents.length === 0 && (
                  <div className="text-center py-16 text-gray-500">
                    <p className="text-lg font-medium">
                      No events scheduled
                    </p>
                    <p className="text-sm mt-2">
                      Please check another month
                    </p>
                  </div>
                )}

                {filteredEvents.map(event => (
                  <div
                    key={event._id}
                    className="border-l-4 border-red-600 bg-red-50/40
                               rounded-xl p-6 transition-all duration-300
                               hover:shadow-lg hover:bg-red-50"
                  >
                    <p className="text-sm text-red-700 font-semibold">
                      {new Date(event.date).toDateString()}
                    </p>

                    <h4 className="text-xl font-bold text-gray-800 mt-1">
                      {event.title}
                    </h4>

                    {event.description && (
                      <p className="text-gray-600 mt-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default EventSection;
