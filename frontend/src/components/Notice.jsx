import { useEffect, useState } from "react";
import API from "../services/axios";

const Notice = ({ editable = false }) => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        try {
            const res = await API.get("/notices");
            setData(Array.isArray(res.data) ? res.data : []); // ✅ FIX
        } catch (err) {
            console.log(err);
            setData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                const res = await API.put(`/notices/${editId}`, {
                    title,
                    description,
                });

                setData(
                    (Array.isArray(data) ? data : []).map((d) =>
                        d._id === editId ? res.data : d
                    )
                );

                setEditId(null);
            } else {
                const res = await API.post("/notices", {
                    title,
                    description,
                });

                setData([res.data, ...(Array.isArray(data) ? data : [])]);
            }

            setTitle("");
            setDescription("");
        } catch (err) {
            console.log(err);
        }
    };

    const edit = (n) => {
        setEditId(n._id);
        setTitle(n.title);
        setDescription(n.description);
    };

    const del = async (id) => {
        await API.delete(`/notices/${id}`);

        setData(
            (Array.isArray(data) ? data : []).filter((d) => d._id !== id)
        );
    };

    return (
        <div>
            <h2>Notices</h2>

            {editable && (
                <form onSubmit={submit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button>{editId ? "Update" : "Add"}</button>
                </form>
            )}

            {(Array.isArray(data) ? data : []).map((n) => ( // ✅ FIX
                <div key={n._id}>
                    <h4>{n.title}</h4>
                    <p>{n.description}</p>

                    {editable && (
                        <>
                            <button onClick={() => edit(n)}>Edit</button>
                            <button onClick={() => del(n._id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Notice;