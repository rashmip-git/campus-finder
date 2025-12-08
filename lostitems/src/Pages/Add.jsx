
import React, { useState, useContext, useRef } from "react";
import "./Add.css";
import { ItemContext } from "../Context/ItemContext";

const Add = () => {
  const { handleadd, itemcon } = useContext(ItemContext);
  const fileInputRef = useRef(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    location: "",
    contact: "",
    email: "",
    date: "",
    image: "",
    status: "Lost",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("❌ You must be logged in to add an item.");
      return;
    }

    const payload = {
      ...newItem,
      status: newItem.status,
      contact: newItem.contact,
      image: newItem.image || "/default.jpg",
    };

    const success = await handleadd(payload);

    if (success) {
      alert("✔ Item added successfully!");

      setNewItem({
        name: "",
        category: "",
        location: "",
        contact: "",
        email: "",
        date: "",
        image: "",
        status: "Lost",
      });
    } else {
      alert("❌ Something went wrong.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setNewItem({ ...newItem, image: preview });
  };

  const fallbackCategories = [
    { category: "Laptop" },
    { category: "Phone" },
    { category: "Electronics" },
    { category: "Wallet" },
    { category: "Valuables" },
    { category: "Others" },
  ];

  const finalCategories = itemcon.length > 0 ? itemcon : fallbackCategories;

  return (
    <div className="addpage">
      <h1>Add New Item</h1>

      <div className="radiobox">
        <label className="radiobtn">
          <input
            type="radio"
            name="status"
            value="Lost"
            checked={newItem.status === "Lost"}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
          />
          <span>Lost</span>
        </label>

        <label className="radiobtn">
          <input
            type="radio"
            name="status"
            value="Found"
            checked={newItem.status === "Found"}
            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
          />
          <span>Found</span>
        </label>
      </div>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          required
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />

        <select
          required
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        >
          <option value="">Select Category</option>
          {finalCategories.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Location"
          value={newItem.location}
          onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
        />

        <input
          type="text"
          placeholder="Contact Number"
          required
          value={newItem.contact}
          onChange={(e) => setNewItem({ ...newItem, contact: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={newItem.email}
          onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
        />

        <input
          type="date"
          value={newItem.date}
          onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
        />

        <div className="image-upload">
          <button type="button" onClick={() => fileInputRef.current.click()}>
            Upload Image
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          {newItem.image && (
            <img src={newItem.image} alt="preview" className="preview" />
          )}
        </div>

        <button type="submit" className="submit-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
