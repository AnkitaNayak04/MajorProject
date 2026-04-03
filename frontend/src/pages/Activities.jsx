import React, { useEffect, useState } from "react";
import axios from "axios";

function Activities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 FETCH ACTIVITIES
    const fetchActivities = async () => {
        try {
            const res = await axios.get("https://deptconnect-1kcc.onrender.com/activities");
            setActivities(res.data);
        } catch (err) {
            console.error(err);
            alert("Error fetching activities");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    // 🔥 REGISTER FUNCTION (FIXED)
    const handleRegister = async (item) => {
        const name = prompt("Enter your name:");
        const email = prompt("Enter your email:");
        const branch = prompt("Enter your branch:");
        const roll = prompt("Enter your roll no:");

        if (!name || !email || !branch || !roll) {
            return alert("All fields required");
        }

        try {
            await axios.post(
                "https://deptconnect-1kcc.onrender.com/api/registrations/register",
                {
                    name,
                    email,
                    branch,
                    roll,
                    activityId: item._id,
                    activityTitle: item.title,
                }
            );

            alert("Registered Successfully 🎉");
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.msg || "Registration failed"
            );
        }
    };

    if (loading) {
        return <h2 className="text-center mt-24">Loading...</h2>;
    }

    return (
        // 🔥 navbar overlap fix
        <div className="min-h-screen bg-gray-100 p-10 pt-24">

            <h1 className="text-3xl font-bold text-center text-red-700 mb-10">
                Department Activities
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.length === 0 ? (
                    <p className="text-center col-span-full">
                        No Activities Available
                    </p>
                ) : (
                    activities.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h2>

                            <p className="text-gray-600 mb-3">
                                {item.description}
                            </p>

                            {item.date && (
                                <p className="text-sm text-gray-500 mb-4">
                                    📅 {new Date(item.date).toLocaleDateString()}
                                </p>
                            )}

                            <button
                                onClick={() => handleRegister(item)}
                                className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition"
                            >
                                Register
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Activities;