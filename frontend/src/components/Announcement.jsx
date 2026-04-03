import { useEffect, useState } from "react";
import API from "../services/axios";

const Announcement = ({ editable = false }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchAnnouncements = async () => {
        try {
            const res = await API.get("/announcements");
            setAnnouncements(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
            setAnnouncements([]);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                const res = await API.put(`/announcements/${editId}`, {
                    title,
                    message,
                });

                setAnnouncements(
                    (Array.isArray(announcements) ? announcements : []).map((a) =>
                        a._id === editId ? res.data : a
                    )
                );
                setEditId(null);
            } else {
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
            (Array.isArray(announcements) ? announcements : []).filter(
                (a) => a._id !== id
            )
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

            {(Array.isArray(announcements) ? announcements : []).map((a) => (
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