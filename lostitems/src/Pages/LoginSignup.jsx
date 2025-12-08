/*import React from 'react'
import './LoginSignup.css'

const LoginSignup = () => {
  return (
    <>
    <div className="loginsignup2">
      <div className="container">
        <h1>SIGN UP</h1>

        <div className="fields">
          <input type='text' placeholder='your name'/>
          <input type='email' placeholder='email adress'/>
          <input type='password' placeholder='password'/>
        </div>

        <button className='continue'>continue</button>
         <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            By continuing I agree to <span>terms and conditions</span>
          </label>
        </div>

        <p className="abc">
          Already have an account? <span>Login here</span>
        </p>
        
       
        </div>
    </div>
    </>
  )
}

export default LoginSignup
*/
/*




import React, { useState } from "react";
import "./LoginSignup.css";

const API_BASE = "http://localhost:5000/api/auth"; // adjust to your backend

const LoginSignup = () => {
  const [mode, setMode] = useState("signup"); // "signup" or "login"
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === "signup" ? "signup" : "login";
      const body =
        mode === "signup"
          ? {
              username: form.username,
              email: form.email,
              password: form.password,
              role: "user", // or "admin" manually for you
            }
          : {
              email: form.email,
              password: form.password,
            };

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // data has: message, token, user {id, username, email}
      console.log("Auth success", data); // later: save token in context

      alert(data.message || (mode === "signup" ? "Signup successful" : "Login successful"));

      // clear password only
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode("login");
  };

  const switchToSignup = () => {
    setMode("signup");
  };

  return (
    <div className="loginsignup2">
      <div className="container">
        <h1>{mode === "signup" ? "SIGN UP" : "LOGIN"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="fields">
            {mode === "signup" && (
              <input
                type="text"
                name="username"
                placeholder="your name"
                value={form.username}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By continuing I agree to <span>terms and conditions</span>
              </label>
            </div>
          )}

          <button className="continue" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Continue"
              : "Login"}
          </button>
        </form>

        {mode === "signup" ? (
          <p className="abc">
            Already have an account?{" "}
            <span onClick={switchToLogin} style={{ cursor: "pointer" }}>
              Login here
            </span>
          </p>
        ) : (
          <p className="abc">
            New here?{" "}
            <span onClick={switchToSignup} style={{ cursor: "pointer" }}>
              Create an account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
*/

/*
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { AuthContext } from "../Context/AuthContext";

const API_BASE = "http://localhost:5000/api/auth";

const LoginSignup = () => {
  const [mode, setMode] = useState("signup");
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = mode === "signup" ? "signup" : "login";
      const body = mode === "signup" 
        ? { username: form.username, email: form.email, password: form.password, role: "user" }
        : { email: form.email, password: form.password };

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      // Save to auth context and redirect
      login(data);
      alert(`${mode === "signup" ? "Signup" : "Login"} successful!`);
      navigate("/"); // or "/add" or wherever you want
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup2">
      <div className="container">
        <h1>{mode === "signup" ? "SIGN UP" : "LOGIN"}</h1>
        
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="fields">
            {mode === "signup" && (
              <input
                type="text"
                name="username"
                placeholder="your name"
                value={form.username}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="email address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By continuing I agree to <span>terms and conditions</span>
              </label>
            </div>
          )}

          <button className="continue" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "signup" ? "Continue" : "Login"}
          </button>
        </form>

        {mode === "signup" ? (
          <p className="abc">
            Already have an account?{" "}
            <span onClick={() => setMode("login")} style={{ cursor: "pointer", color: "#007bff" }}>
              Login here
            </span>
          </p>
        ) : (
          <p className="abc">
            New here?{" "}
            <span onClick={() => setMode("signup")} style={{ cursor: "pointer", color: "#007bff" }}>
              Create an account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
*/

import React, { useState, useContext } from "react"; // ADD useContext
import { useNavigate } from "react-router-dom"; // ADD THIS
import "./LoginSignup.css";
import { AuthContext } from "../Context/AuthContext"; // ADD THIS

const API_BASE = "http://localhost:5000/api/auth";

const LoginSignup = () => {
  const [mode, setMode] = useState("signup");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  
  // ADD THESE 2 LINES
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = mode === "signup" ? "signup" : "login";
      const body =
        mode === "signup"
          ? {
              username: form.username,
              email: form.email,
              password: form.password,
              role: "user",
            }
          : {
              email: form.email,
              password: form.password,
            };

      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      // CHANGE THIS SECTION (save to AuthContext + redirect)
      login(data); // ✅ Saves token + user to AuthContext
      alert(data.message || (mode === "signup" ? "Signup successful" : "Login successful"));
      navigate("/"); // ✅ Redirect to home after success

      // clear form
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // REST OF YOUR CODE STAYS EXACTLY SAME
  const switchToLogin = () => {
    setMode("login");
  };

  const switchToSignup = () => {
    setMode("signup");
  };

  return (
    // YOUR JSX STAYS EXACTLY SAME - NO CHANGES NEEDED
    <div className="loginsignup2">
      <div className="container">
        <h1>{mode === "signup" ? "SIGN UP" : "LOGIN"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="fields">
            {mode === "signup" && (
              <input
                type="text"
                name="username"
                placeholder="your name"
                value={form.username}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="email address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By continuing I agree to <span>terms and conditions</span>
              </label>
            </div>
          )}

          <button className="continue" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
              ? "Continue"
              : "Login"}
          </button>
        </form>

        {mode === "signup" ? (
          <p className="abc">
            Already have an account?{" "}
            <span onClick={switchToLogin} style={{ cursor: "pointer" }}>
              Login here
            </span>
          </p>
        ) : (
          <p className="abc">
            New here?{" "}
            <span onClick={switchToSignup} style={{ cursor: "pointer" }}>
              Create an account
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;

