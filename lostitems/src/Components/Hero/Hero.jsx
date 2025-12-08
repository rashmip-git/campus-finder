import React from "react";
import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">

        {/* FIND YOUR LOST ITEMS — side by side animation */}
        <div className="title-row">


          <motion.h1
            className="left-text"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            FIND YOUR
          </motion.h1>

          <motion.h1
            className="right-text"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          >
            LOST ITEMS
          </motion.h1>
        </div>


        {/* INSTANTLY */}
        <motion.h1
          className="instantly"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        >
          <span className="typing">INSTANTLY</span>
        </motion.h1>

        <p>
          Connect with your campus community to recover lost belongings. Post what you’ve lost or found and help reunite items with their owners.
        </p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <Link to="/category">
            <button className="browse">Browse Items</button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
