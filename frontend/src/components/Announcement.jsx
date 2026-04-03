// // import { useEffect, useState } from "react";
// // import api from "../services/api";

// // const Announcement = () => {
// //     const [announcements, setAnnouncements] = useState([]);

// //     useEffect(() => {
// //         api.get("/announcements").then((res) => {
// //             setAnnouncements(res.data);
// //         });
// //     }, []);

// //     return (
// //         <div>
// //             <h2>Announcements</h2>
// //             {announcements.map((a) => (
// //                 <div key={a._id}>
// //                     <h4>{a.title}</h4>
// //                     <p>{a.message}</p>
// //                     <hr />
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default Announcement;
// import { useEffect, useState } from "react";
// import api from "../services/axios";  // services folder me
//  // tumhare API import ke hisaab se

// const Announcement = ({ editable = false }) => {
//     const [announcements, setAnnouncements] = useState([]);
//     const [title, setTitle] = useState("");
//     const [message, setMessage] = useState("");

//     const fetchAnnouncements = async () => {
//         try {
//             const res = await api.get("/announcements");
//             setAnnouncements(res.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         fetchAnnouncements();
//     }, []);

//     const handleAdd = async (e) => {
//         e.preventDefault();
//         if (!title || !message) return;

//         try {
//             const res = await api.post("/announcements", { title, message });
//             setAnnouncements([res.data, ...announcements]);
//             setTitle("");
//             setMessage("");
//         } catch (err) {
//             console.log(err);
//             alert("Failed to add announcement");
//         }
//     };

//     return (
//         <div>
//             <h2>Announcements</h2>

//             {editable && (
//                 <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     <br />
//                     <textarea
//                         placeholder="Message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     ></textarea>
//                     <br />
//                     <button type="submit">Add Announcement</button>
//                 </form>
//             )}

//             {announcements.length === 0 && <p>No announcements yet.</p>}

//             {announcements.map((a) => (
//                 <div key={a._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
//                     <h4>{a.title}</h4>
//                     <p>{a.message}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Announcement;
import { useEffect, useState } from "react";
import API from "../services/axios";

const Announcement = ({ editable = false }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchAnnouncements = async () => {
        const res = await API.get("/announcements");
        setAnnouncements(res.data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                // UPDATE
                const res = await API.put(`/announcements/${editId}`, {
                    title,
                    message,
                });

                setAnnouncements(
                    announcements.map((a) =>
                        a._id === editId ? res.data : a
                    )
                );
                setEditId(null);
            } else {
                // CREATE
                const res = await API.post("/announcements", {
                    title,
                    message,
                });

                setAnnouncements([res.data, ...announcements]);
            }

            setTitle("");
            setMessage("");
        } catch (err) {
            alert("Operation failed");
        }
    };

    const editHandler = (a) => {
        setEditId(a._id);
        setTitle(a.title);
        setMessage(a.message);
    };

    const deleteHandler = async (id) => {
        if (!window.confirm("Delete announcement?")) return;

        await API.delete(`/announcements/${id}`);
        setAnnouncements(
  (Array.isArray(announcements) ? announcements : []).filter(a => a.active)
);
    };

    return (
        <div>
            <h2>Announcements</h2>

            {editable && (
                <form onSubmit={submitHandler}>
                    <input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <br />
                    <button type="submit">
                        {editId ? "Update" : "Add"} Announcement
                    </button>
                </form>
            )}

            <hr />

            {announcements.map((a) => (
                <div key={a._id} style={{ marginBottom: "15px" }}>
                    <h4>{a.title}</h4>
                    <p>{a.message}</p>

                    {editable && (
                        <>
                            <button onClick={() => editHandler(a)}>Edit</button>
                            <button
                                onClick={() => deleteHandler(a._id)}
                                style={{ marginLeft: "10px" }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Announcement;
