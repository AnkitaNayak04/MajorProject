// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // TEMP ADMIN LOGIN
//     if (email === "admin@giet.edu" && password === "admin123") {
//       localStorage.setItem("adminToken", "true"); // ✅ IMPORTANT
//       navigate("/admin");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow-lg w-[350px]"
//       >
//         <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
//           Admin Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://deptconnect-1kcc.onrender.com/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token); // ✅ REAL TOKEN
      navigate("/admin");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Admin Login
        </h2>

        <input type="email" placeholder="Admin Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded" required />

        <input type="password" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded" required />

        <button className="w-full bg-red-700 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;