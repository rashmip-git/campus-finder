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

