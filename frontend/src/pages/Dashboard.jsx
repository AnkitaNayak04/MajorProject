 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";

function Dashboard() {
  const [active, setActive] = useState("notice");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const [pyqs, setPyqs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const [editingNoticeId, setEditingNoticeId] = useState(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingActivityId, setEditingActivityId] = useState(null);
  const [editingPyqId, setEditingPyqId] = useState(null);
  const [editingAchievementId, setEditingAchievementId] = useState(null);

  const [faculties, setFaculties] = useState([]);
  const [bio, setBio] = useState("");
  const [editingFacultyId, setEditingFacultyId] = useState(null);

  // Achievement specific fields
  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState("");
  const [type, setType] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      const [n, a, e, p, act, f, ach] = await Promise.all([
        axios.get("https://deptconnect-1kcc.onrender.com/api/notices"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/announcements"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/events"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/pyq"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/activities"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/faculty"),
        axios.get("https://deptconnect-1kcc.onrender.com/api/achievements"),
      ]);

      setNotices(n.data);
      setAnnouncements(a.data);
      setEvents(e.data);
      setPyqs(p.data);
      setActivities(act.data);
      setFaculties(f.data);
      setAchievements(ach.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setSubject("");
    setYear("");
    setFile(null);
    setEditingNoticeId(null);
    setEditingAnnouncementId(null);
    setEditingEventId(null);
    setEditingActivityId(null);
    setEditingPyqId(null);
    setEditingFacultyId(null);
    setEditingAchievementId(null);
    
    // Reset achievement fields
    setName("");
    setShortDesc("");
    setFullDesc("");
    setCoverImage("");
    setImages("");
    setType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      if (active === "notice") {
        if (editingNoticeId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/notices/${editingNoticeId}`, { title, description }, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/notices", { title, description }, config);
        }
      }
      
      if (active === "faculty") {
        const data = {
          name: title,
          designation: description,
          email: subject,
          image: year,
          bio: bio,
        };

        if (editingFacultyId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/faculty/${editingFacultyId}`, data, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/faculty", data, config);
        }
      }

      if (active === "announcement") {
        const data = { title, description, date };
        if (editingAnnouncementId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/announcements/${editingAnnouncementId}`, data, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/announcements", data, config);
        }
      }

      if (active === "event") {
        const data = { title, description, date };
        if (editingEventId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/events/${editingEventId}`, data, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/events", data, config);
        }
      }

      if (active === "activities") {
        const data = { title, description, date };
        if (editingActivityId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/activities/${editingActivityId}`, data, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/activities", data, config);
        }
      }

      if (active === "pyq") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("year", year);
        if (file) formData.append("file", file);

        config.headers["Content-Type"] = "multipart/form-data";

        if (editingPyqId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/pyq/${editingPyqId}`, formData, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/pyq", formData, config);
        }
      }

      if (active === "achievement") {
        const data = {
          title,
          name,
          shortDesc,
          fullDesc,
          year,
          coverImage,
          images: images.split(",").map(img => img.trim()), // comma separated URLs
          type,
        };

        if (editingAchievementId) {
          await axios.put(`https://deptconnect-1kcc.onrender.com/api/achievements/${editingAchievementId}`, data, config);
        } else {
          await axios.post("https://deptconnect-1kcc.onrender.com/api/achievements", data, config);
        }
      }

      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error occurred while saving data");
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`https://deptconnect-1kcc.onrender.com/api/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting item");
    }
  };

  const handleEdit = (type, item) => {
    if (type === "notices") {
      setTitle(item.title);
      setDescription(item.description);
      setEditingNoticeId(item._id);
    }
    if (type === "announcements") {
      setTitle(item.title);
      setDescription(item.description);
      setDate(item.date || "");
      setEditingAnnouncementId(item._id);
    }
    if (type === "events") {
      setTitle(item.title);
      setDescription(item.description);
      setDate(item.date || "");
      setEditingEventId(item._id);
    }
    if (type === "activities") {
      setTitle(item.title);
      setDescription(item.description);
      setDate(item.date || "");
      setEditingActivityId(item._id);
    }
    if (type === "pyq") {
      setTitle(item.title);
      setSubject(item.subject);
      setYear(item.year);
      setEditingPyqId(item._id);
    }
    if (type === "faculty") {
      setActive("faculty");
      setTitle(item.name);
      setDescription(item.designation);
      setSubject(item.email);
      setYear(item.image);
      setBio(item.bio);
      setEditingFacultyId(item._id);
    }
    if (type === "achievement") {
      setActive("achievement");
      setTitle(item.title);
      setName(item.name);
      setShortDesc(item.shortDesc);
      setFullDesc(item.fullDesc);
      setYear(item.year);
      setCoverImage(item.coverImage);
      setImages(item.images ? item.images.join(",") : "");
      setType(item.type);
      setEditingAchievementId(item._id);
    }
  };

  const menu = ["notice", "announcement", "event", "activities", "pyq", "faculty", "achievement"];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-red-700 to-red-900 text-white p-6 space-y-3">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        {menu.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActive(tab);
              resetForm();
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium
              ${active === tab ? "bg-white text-red-700" : "hover:bg-red-600"}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 capitalize">{active} Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            {active !== "pyq" && active !== "faculty" && active !== "achievement" && (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-red-500"
              />
            )}

            {(active === "announcement" || active === "event" || active === "activities") && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            )}

            {active === "faculty" && (
              <>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Name"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Designation"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email"
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Image URL"
                  className="w-full border p-3 rounded-lg"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio"
                  className="w-full border p-3 rounded-lg"
                />
              </>
            )}

            {active === "pyq" && (
              <>
                <input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
                <input
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                />
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full border p-3 rounded-lg" />
              </>
            )}

            {active === "achievement" && (
              <>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Achievement Title" 
                  className="w-full border p-3 rounded-lg" 
                />
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Student/Faculty Name" 
                  className="w-full border p-3 rounded-lg" 
                />
                <input 
                  value={shortDesc} 
                  onChange={(e) => setShortDesc(e.target.value)} 
                  placeholder="Short Description" 
                  className="w-full border p-3 rounded-lg" 
                />
                <textarea 
                  value={fullDesc} 
                  onChange={(e) => setFullDesc(e.target.value)} 
                  placeholder="Full Description" 
                  className="w-full border p-3 rounded-lg" 
                  rows="4"
                />
                <input 
                  value={year} 
                  onChange={(e) => setYear(e.target.value)} 
                  placeholder="Year" 
                  className="w-full border p-3 rounded-lg" 
                />
                <input 
                  value={coverImage} 
                  onChange={(e) => setCoverImage(e.target.value)} 
                  placeholder="Cover Image URL" 
                  className="w-full border p-3 rounded-lg" 
                />
                <input 
                  value={images} 
                  onChange={(e) => setImages(e.target.value)} 
                  placeholder="Other Images (comma separated URLs)" 
                  className="w-full border p-3 rounded-lg" 
                />
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)} 
                  className="w-full border p-3 rounded-lg"
                >
                  <option value="">Select Type</option>
                  <option value="student">Student Achievement</option>
                  <option value="faculty">Faculty Achievement</option>
                </select>
              </>
            )}

            <button className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg">
              <Plus size={18} />
              {editingNoticeId || editingAnnouncementId || editingEventId || editingActivityId || editingPyqId || editingFacultyId || editingAchievementId
                ? "Update"
                : "Add"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="grid gap-4">
          {active === "notice" && notices.map((n) => (
            <div key={n._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-gray-600">{n.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("notices", n)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("notices", n._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {active === "faculty" && faculties.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{f.name}</h3>
                <p>{f.designation}</p>
                <p className="text-blue-500">{f.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("faculty", f)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("faculty", f._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {active === "announcement" && announcements.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.description}</p>
                <span className="text-sm text-gray-500">{a.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("announcements", a)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("announcements", a._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {active === "event" && events.map((e) => (
            <div key={e._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{e.title}</h3>
                <p>{e.description}</p>
                <span className="text-sm text-gray-500">{e.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("events", e)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("events", e._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {active === "activities" && activities.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p>{a.description}</p>
                <span className="text-sm text-gray-500">{a.date}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("activities", a)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("activities", a._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {active === "pyq" && pyqs.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p>{p.subject} ({p.year})</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("pyq", p)} className="p-2 bg-yellow-400 rounded-lg"><Pencil size={16} /></button>
                <button onClick={() => handleDelete("pyq", p._id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {active === "achievement" && achievements.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded-xl shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-gray-700">{a.name} ({a.type === "student" ? "Student" : "Faculty"})</p>
                <p className="text-gray-600 text-sm">{a.shortDesc}</p>
                <span className="text-xs text-gray-500">{a.year}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit("achievement", a)} className="p-2 bg-yellow-400 rounded-lg">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete("achievements", a._id)} className="p-2 bg-red-500 text-white rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;