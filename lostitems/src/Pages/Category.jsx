import React, { useState, useContext } from 'react';
import './Category.css';
import { motion } from 'framer-motion';
import CategoryItems from './CategoryItems';
import { ItemContext } from "../Context/ItemContext";
import { useParams } from "react-router-dom";

const Category = () => {
   const { category: urlCategory } = useParams();
  const [selected, setSelected] = useState(urlCategory || null);
  const { itemcon } = useContext(ItemContext);

  /*const categories = [...new Set(itemcon.map((prod) => prod.category))].map(
    (cat) => {
      const sample = itemcon.find((i) => i.category === cat);
      return { category: cat, image: sample.image || "/default.jpg" };
    }
  );*/

  // ✅ Parent container controls stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // delay between boxes
        delayChildren: 0.2,   // delay before starting first
      },
    },
  };

  // ✅ Each box animation
  const boxVariants = {
    hidden: (i) => ({
      x: i % 2 === 0 ? -200 : 200,
      opacity: 0,
      scale: 0.8,
    }),
    show: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="category-container">
      {!selected ? (
        <>
          <motion.h1
            className="category-title"
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          >
            Select a Category
          </motion.h1>

          {/* ✅ Apply variants and motion to the parent container */}
          <motion.div
            className="category-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {itemcon.map((cat, id) => (
              <motion.div
                className="category-box"
                key={cat.category}
                variants={boxVariants}
                custom={id} // ✅ allows each box to know its index
              >
                <img src={cat.items[0]?.image || "/default.jpg"} alt={cat.category} className="category-img" />
                <h2>{cat.category}</h2>
                <button
                  className="view-btn"
                  onClick={() => setSelected(cat.category)}
                >
                  View
                </button>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <CategoryItems
          category={selected}
          goBack={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default Category;
