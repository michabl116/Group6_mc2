import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ✅ Import CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // To store error messages
  const navigate = useNavigate();

  // ✅ Reset form state when the component loads
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });

    // ✅ Clear local storage to prevent autofill issues
    localStorage.clear();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevents page refresh
    setError(""); // Clears previous errors

    try {
      console.log("Submitting Data:", formData); // ✅ Debugging log

      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Debugging log

      if (!response.ok) {
        setError(data.message || "Login failed!");
        return;
      }

      localStorage.setItem("token", data.token); // ✅ Save token
      navigate("/dashboard"); // ✅ Redirect to dashboard
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login form</h2>
        {error && <p className="error">{error}</p>} {/* ✅ Show error message */}
        <form onSubmit={handleSubmit} autoComplete="off"> {/* ✅ Prevent browser autofill */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email Id"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off" // ✅ Prevents autofill
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password" // ✅ Stops password autofill
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  );
};

export default Login;