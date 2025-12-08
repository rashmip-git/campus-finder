/*import React,{ createContext, useState,useEffect } from "react";
import Category from "../Pages/Category";
export const ItemContext=createContext(null);//lets component access without passing props

export const ItemContextProvider=(props)=>{//wraps entire app ..everything inside can read/write items
    const defcat=[
        {category:"Laptop",items:[]},
        {category:"Phone",items:[]},
        {category:"Electronics",items:[]},
        {category:"Wallet",items:[]},
        {category:"Valuables",items:[]},
        {category:"Others",items:[]}
    ];

 const [itemcon, setItemcon] = useState(() => {//holds all cat and items
  const saved = localStorage.getItem("itemcon");

  if (saved) {
    const parseddone = JSON.parse(saved); //convert string to js array
    
    // If localStorage has data AND it’s not empty → use it
    if (Array.isArray(parseddone) && parseddone.length > 0) {
      return parseddone;
    }
  }
  // Otherwise  load default predefined categories
  return defcat;
});


    useEffect(() => {
    localStorage.setItem("itemcon", JSON.stringify(itemcon));
  }, [itemcon]);

    const handleadd=(newitem)=>{
        setItemcon((prev)=>
        prev.map((cat)=>
        cat.category.toLowerCase()===newitem.category.toLowerCase()?
    {...cat,items:[...cat.items,newitem]}:cat));
    };
    const contextValue={itemcon,handleadd};

    //now hero recently add etctetc can use this through below one
    return(
        <ItemContext.Provider value={contextValue}>
            {props.children}
        </ItemContext.Provider>
    )
}
export default ItemContextProvider;
*/
// src/Context/ItemContext.jsx
/*
import React, { createContext, useState, useEffect } from "react";

export const ItemContext = createContext(null);

const API_BASE = "http://localhost:5000/api"; // change if different

export const ItemContextProvider = (props) => {
  const [itemcon, setItemcon] = useState([]);     // will hold items from backend
  const [loading, setLoading] = useState(true);

  // 1) Load all items from backend on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/items`);
        const data = await res.json();
        // backend returns flat list → convert to category buckets
        const grouped = [
          "Laptop",
          "Phone",
          "Electronics",
          "Wallet",
          "Valuables",
          "Others",
        ].map((cat) => ({
          category: cat,
          items: data.filter(
            (item) =>
              item.category &&
              item.category.toLowerCase() === cat.toLowerCase()
          ),
        }));
        setItemcon(grouped);
      } catch (err) {
        console.error("Error fetching items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // 2) Add item → POST to backend, then update state
  const handleadd = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "Bearer " + token  // we'll wire this after auth
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Failed to add item");
        return;
      }

      const saved = await res.json(); // item returned from backend

      setItemcon((prev) =>
        prev.map((cat) =>
          cat.category.toLowerCase() === (saved.category || "").toLowerCase()
            ? { ...cat, items: [...cat.items, saved] }
            : cat
        )
      );
    } catch (err) {
      console.error("Error adding item", err);
      alert("Error adding item");
    }
  };

  const contextValue = { itemcon, handleadd, loading };
  return (
    <ItemContext.Provider value={contextValue}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;*/

// src/Context/ItemContext.jsx


/*
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ItemContext = createContext();

const API_BASE = "http://localhost:5000/api"; // your backend

export const ItemContextProvider = ({ children }) => {
  const [itemcon, setItemcon] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  // Load all items from backend and group by category
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/items`);
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        
        const categories = [
          "Laptop", "Phone", "Electronics", "Wallet", "Valuables", "Others"
        ];
        
        const grouped = categories.map(cat => ({
          category: cat,
          items: data.filter(item => 
            item.category?.toLowerCase() === cat.toLowerCase()
          )
        }));
        setItemcon(grouped);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add new item with auth token
  const handleadd = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add item");
      }

      const savedItem = await res.json();
      setItemcon(prev => 
        prev.map(cat => 
          cat.category.toLowerCase() === savedItem.category?.toLowerCase()
            ? { ...cat, items: [...cat.items, savedItem] }
            : cat
        )
      );
      return savedItem;
    } catch (err) {
      console.error("Error adding item:", err);
      throw err;
    }
  };

  const value = { itemcon, handleadd, loading };
  return (
    <ItemContext.Provider value={value}>{children}</ItemContext.Provider>
  );
};
*/





/*
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ItemContext = createContext();
const API_BASE = "http://localhost:5000/api";

export const ItemContextProvider = ({ children }) => {
  const [itemcon, setItemcon] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  //const categories = [
    //"Laptop", "Phone", "Electronics", "Wallet", "Valuables", "Others"
//  ];

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/items`);
      const data = await res.json();

      const categories = [
    "Laptop", "Phone", "Electronics", "Wallet", "Valuables", "Others"
  ];

      const grouped = categories.map((cat) => ({
        category: cat,
        items: data.filter((item) =>
          item.category?.trim().toLowerCase() === cat.toLowerCase()
        )
      }));

      setItemcon(grouped);
    } 
    catch (err) {
      console.log("Error fetching items:", err);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    //setLoading(false);
  }, []);

  const handleadd = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         // ...(token && { Authorization: `Bearer ${token}` })
         Authorization: token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(newItem),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Failed to add item");
        return false;
      }
       

      //await res.json();

      // IMPORTANT: refresh items from backend
      await fetchItems();
      return true;
    } 
    catch (err) {
      console.error("❌ Error adding item:", err);
      alert("Something went wrong while adding item");
      return false;
    }
  };

  const handleResolve = async (id) => {
     if (!token) return alert("Login required!");

    try {
      const res = await fetch(`${API_BASE}/items/${id}/resolve`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          //Authorization: token ? `Bearer ${token}` : ""

          //"Content-Type": "application/json",
          //...(token && { Authorization: `Bearer ${token}` })
        }
      });

      const result = await res.json();
      //if (!res.ok) throw new Error(result.message);
      if (!res.ok) {
        alert(result.message|| "u r not allowed to resolve item");
        return;
      }
  alert("✔ Marked as Resolved!");
      await fetchItems();
      //return true;
    } catch (err) {
     // alert(err.message);
     // return false;
      console.log("❌ Error resolving item:", err);
       alert("Something went wrong while resolving the item");
    }
  };

   const contextValue = {
    itemcon,
    handleadd,
    loading,
    handleResolve  // ← EXPORTED HERE
  };
/*
const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to resolve.");
        return;
      }

      alert("Item marked as resolved ✔");
      await fetchItems(); // refresh UI
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };*/

  /*
  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
*/

import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ItemContext = createContext();
const API_BASE = "http://localhost:5000/api";

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
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newItem)
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

