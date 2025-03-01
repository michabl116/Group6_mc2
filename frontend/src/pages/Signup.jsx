import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // ✅ Import CSS file

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "", // ✅ Added date of birth
    membershipStatus: "", // ✅ Added membership status
  });

  const [error, setError] = useState(""); // To store error messages
  const [success, setSuccess] = useState(""); // To show success message
  const navigate = useNavigate();

  // ✅ Reset form state when the component loads
  useEffect(() => {
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "", // ✅ Reset date of birth
      membershipStatus: "", // ✅ Reset membership status
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      console.log("Submitting Data:", formData); // ✅ Debugging log

      const response = await fetch("http://localhost:4000/api/register", {
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
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
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
          
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="membershipStatus"
              placeholder="membershipStatus"
              value={formData.membershipStatus}
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
