
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ItemContext = createContext();
//const API_BASE = "http://localhost:5000/api";
//const API_BASE = `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api`;
//const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api`;


export const ItemContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [itemcon, setItemcon] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items`);
      const data = await res.json();

      const categories = ["Laptop", "Phone", "Electronics", "Wallet", "Valuables", "Others"];

      const grouped = categories.map(cat => ({
        category: cat,
        items: data.filter(item => item.category && item.category.toLowerCase() === cat.toLowerCase())
      }));

      setItemcon(grouped);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleadd = async (newItem) => {
    if (!token) {
      alert("Please login to add item");
      return false;
    }

    try {
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("category", newItem.category);
      formData.append("location", newItem.location);
      formData.append("contact", newItem.contact);
      formData.append("email", newItem.email);
      formData.append("date", newItem.date);
      formData.append("status", newItem.status);

      // Attach image file if selected
      if (newItem.imageFile) {
        formData.append("image", newItem.imageFile);
      }
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      await fetchItems();
      return true;

    } catch (err) {
      console.log(err);
      alert("Error adding item");
      return false;
    }
  };

  const handleResolve = async (id) => {
    if (!token) return alert("Login required!");

    try {
      const res = await fetch(`${API_BASE}/items/${id}/resolve`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      alert("✔ Marked as Resolved");
      await fetchItems();

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <ItemContext.Provider value={{ itemcon, handleadd, handleResolve, loading }}>
      {children}
    </ItemContext.Provider>
  );
};

