import React, { useState, useEffect } from "react";
import axios from "axios";

const PYQ = () => {
    const [data, setData] = useState([]);
    const [year, setYear] = useState("");
    const [subject, setSubject] = useState("");

    // 🔥 SUBJECT LIST
    const subjects = [
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "Data Structures",
        "Algorithms",
        "Software Engineering",
        "Compiler Design",
        "Theory of Computation",
        "Artificial Intelligence",
        "Machine Learning",
        "Cloud Computing",
        "Cyber Security",
        "Java",
        "Python",
        "C Programming",
        "Web Development",
    ];

    // 🔥 YEARS (2016 → 2024)
    const years = Array.from({ length: 9 }, (_, i) => 2016 + i);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `https://deptconnect-1kcc.onrender.com/api/pyq?year=${year}&subject=${subject}`
            );
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [year, subject]);

    return (
        <div className="min-h-screen bg-gray-100 pt-24 px-10">

            <h2 className="text-3xl font-bold text-red-700 mb-6">
                Previous Year Questions
            </h2>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-4 mb-6">

                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Years</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Subjects</option>
                    {subjects.map((sub, index) => (
                        <option key={index} value={sub}>{sub}</option>
                    ))}
                </select>
            </div>

            {/* LIST */}
            <div className="grid gap-4">
                {data.length === 0 ? (
                    <p>No PYQs found</p>
                ) : (
                    data.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded shadow">

                            <h4 className="text-lg font-semibold">{item.title}</h4>

                            <p className="text-sm text-gray-600">
                                {item.subject} | {item.year}
                            </p>

                            <a
                                href={item.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-red-700 font-semibold"
                            >
                                View File
                            </a>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default PYQ;