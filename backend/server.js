require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

/* DATABASE */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* STATIC */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/pyq", require("./routes/pyqRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/achievements", require("./routes/achievementRoutes"));

/* 404 HANDLER */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});