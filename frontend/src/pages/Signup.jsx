/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // ✅ Import CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    membership_status: "",
  });

  const [error, setError] = useState(""); // To store error messages
  const [success, setSuccess] = useState(""); // To show success message
  const navigate = useNavigate();

  // ✅ Reset form state when the component loads
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone_number: "",
      gender: "",
      date_of_birth: "",
      membership_status: "",
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
    setSuccess(""); // Clears previous success messages

   // if (formData.password !== formData.confirmPassword) {
    //  setError("Passwords do not match!");
    //  return;
   // }

    try {
      console.log("Submitting Data:", formData); // ✅ Debugging log

      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Debugging log

      if (!response.ok) {
        setError(data.message || "Signup failed!");
        return;
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Registration form</h2>
        {error && <p className="error">{error}</p>} {/* ✅ Show error message */}
        {success && <p className="success">{success}</p>} {/* ✅ Show success message */}
        <form onSubmit={handleSubmit} autoComplete="off"> {/* ✅ Prevent browser autofill */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
           
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
           
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password" // ✅ Ensures browsers don't save passwords
              required
            />
            
          </div>
          <div>
          <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div>
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          </div>
          <div>
          <input
            type="text"
            name="date_of_birth"
            placeholder="Date of Birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          </div>
          <div>
          <input
            type="text"
            name="membership_status"
            placeholder="membership_status"
            value={formData.membership_status}
            onChange={handleChange}
            autoComplete="off"
            required
          />

          </div>
         

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
