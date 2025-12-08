/*import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import { Link,useLocation} from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
 // ADD THIS
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false); //hambuger state
  const navRef = useRef(null);

  const location=useLocation();
   const handleLogout = () => {
    logout();
    setMenu("home");
    navigate("/");
  };

//route change upon clicking any btn with hr props that i have written
  useEffect(()=>{
    if(location.state?.activeMenu){
      setMenu(location.state.activeMenu);
      return;
    }

    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");

  }, [location.pathname, location.state]); //this dependency re reruns whenever path or state chnages


  // Entrance animation for navbar
  useEffect(() => {
    const nav = navRef.current; //gets dom elements from navbar
    const items = nav.querySelectorAll(".nav-menu li");

    gsap.from(nav, {
      y:-80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(items, {
      opacity: 0,
      y: -20,
      stagger: 0.15,
      delay: 0.4,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="navbar" ref={navRef}> 


     
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>



    
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}> 
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>


     
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("home")}>
          <Link to="/">HOME</Link>
          {menu === "home" && <hr />} 
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("category")}>
          <Link to="/category">CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("add")}>
          <Link to="/add">ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("contact-us")}>
          <Link to="/contact-us">CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("about")}>
          <Link to="/about">ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>




       
        <li className="mobile-login">
          <Link to="/loginsignup">
            <button className="login">SIGN UP</button>
          </Link>
        </li>
      </ul>

      
      <div className="nav-loginbox">
        <Link to="/loginsignup">
          <button className="login">SIGN UP</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
*/


/*

import React, { useEffect, useRef, useState, useContext } from "react"; // ADD useContext
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ADD useNavigate
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate(); // NOW WORKS
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const location = useLocation();

  // ADD LOGOUT HANDLER
  const handleLogout = () => {
    logout();
    setMenu("home");
    navigate("/");
  };

  //route change upon clicking any btn with hr props that i have written
  useEffect(() => {
    if (location.state?.activeMenu) {
      setMenu(location.state.activeMenu);
      return;
    }

    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");
  }, [location.pathname, location.state]);

  // Entrance animation for navbar
  useEffect(() => {
    const nav = navRef.current;
    const items = nav.querySelectorAll(".nav-menu li");

    gsap.from(nav, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(items, {
      opacity: 1,
      y: -20,
      stagger: 0.15,
      delay: 0.4,
      duration: 0.6,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="navbar" ref={navRef}>
     
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>

      
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

     
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>
        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("home")}>
          <Link to="/">HOME</Link>
          {menu === "home" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("category")}>
          <Link to="/category">CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

        <motion.li 
          whileHover={{ scale: 1.1, y: -3 }} 
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/loginsignup");
              return;
            }
            setMenu("add");
          }}
        >
          <Link to="/add">ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("contact-us")}>
          <Link to="/contact-us">CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("about")}>
          <Link to="/about">ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>

        
        {isAuthenticated ? (
          <li className="mobile-login">
            <div className="user-info">
              <span>Hello, {user?.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </li>
        ) : (
          <li className="mobile-login">
            <Link to="/loginsignup">
              <button className="login">SIGN UP</button>
            </Link>
          </li>
        )}
      </ul>

      
      {isAuthenticated ? (
        <div className="nav-loginbox">
          <div className="user-info-desktop">
            <span>{user?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="nav-loginbox">
          <Link to="/loginsignup">
            <button className="login">SIGN UP</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
*/
/*
import React, { useEffect, useRef, useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const hasAnimated = useRef(false);

  // Logout handler
  const handleLogout = () => {
    logout();
    setMenu("home");
    navigate("/");
  };

  // Set active menu based on route
  useEffect(() => {
    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");
  }, [location.pathname]);

  // GSAP INITIAL navbar entrance animation (Runs only once)
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".navbar", {
        y: -60,
        opacity: 0,
        duration: 0.8,
      });

      tl.from(
        ".nav-menu li",
        {
          opacity: 0,
          y: -15,
          duration: 0.4,
          stagger: 0.12,
        },
        "-=0.3"
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // GSAP animation when mobile menu toggles
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".nav-menu.open li",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }
      );
    }
  }, [isOpen]);

  return (
    <div className="navbar" ref={navRef}>
    
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>

      
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("home")}>
          <Link to="/">HOME</Link>
          {menu === "home" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("category")}>
          <Link to="/category">CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

       
        <motion.li
          whileHover={{ scale: 1.1, y: -3 }}
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/loginsignup");
              return;
            }
            setMenu("add");
          }}
        >
          <Link to="/add">ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("contact-us")}>
          <Link to="/contact-us">CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }} onClick={() => setMenu("about")}>
          <Link to="/about">ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>

    
        {isAuthenticated ? (
          <li className="mobile-login user-info">
            <span>Hello, {user?.username}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li className="mobile-login">
            <Link to="/loginsignup">
              <button className="login">SIGN UP</button>
            </Link>
          </li>
        )}
      </ul>

     
      {isAuthenticated ? (
        <div className="nav-loginbox user-info-desktop">
          <span>{user?.username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-loginbox">
          <Link to="/loginsignup">
            <button className="login">SIGN UP</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
*/

import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const hasAnimated = useRef(false);

  // Highlight active route
  useEffect(() => {
    if (location.pathname === "/") setMenu("home");
    else if (location.pathname === "/category") setMenu("category");
    else if (location.pathname === "/add") setMenu("add");
    else if (location.pathname === "/contact-us") setMenu("contact-us");
    else if (location.pathname === "/about") setMenu("about");

    setIsOpen(false); // auto-close mobile menu on navigation
  }, [location.pathname]);

  // GSAP animation — runs only once
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".navbar", {
        y: -60,
        opacity: 0,
        duration: 0.8,
      });

      tl.from(
        ".nav-menu li",
        {
          opacity: 0,
          y: -15,
          duration: 0.4,
          stagger: 0.12,
        },
        "-=0.3"
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile open animation
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".nav-menu.open li",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.08 }
      );
    }
  }, [isOpen]);

  return (
    <div className="navbar" ref={navRef}>
      
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="logo" height="70px" />
        <p>
          CAMPUS <span>FINDER</span>
        </p>
      </div>

      {/* Hamburger (mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </div>

      {/* Menu */}
      <ul className={`nav-menu ${isOpen ? "open" : ""}`}>

        <motion.li whileHover={{ scale: 1.1, y: -3 }}>
          <Link to="/" onClick={() => setMenu("home")}>HOME</Link>
          {menu === "home" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }}>
          <Link to="/category" onClick={() => setMenu("category")}>CATEGORY</Link>
          {menu === "category" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }}>
          <Link to="/add" onClick={() => setMenu("add")}>ADD</Link>
          {menu === "add" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }}>
          <Link to="/contact-us" onClick={() => setMenu("contact-us")}>CONTACT US</Link>
          {menu === "contact-us" && <hr />}
        </motion.li>

        <motion.li whileHover={{ scale: 1.1, y: -3 }}>
          <Link to="/about" onClick={() => setMenu("about")}>ABOUT</Link>
          {menu === "about" && <hr />}
        </motion.li>

        {/* MOBILE SIGN UP BUTTON */}
        <li className="mobile-login">
          <button className="login" onClick={() => navigate("/loginsignup")}>
            SIGN UP
          </button>
        </li>
      </ul>

      {/* DESKTOP SIGN UP BUTTON */}
      <div className="nav-loginbox">
        <button className="login" onClick={() => navigate("/loginsignup")}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Navbar;

