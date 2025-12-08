/*import React, { useState, useContext, useRef } from "react";
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
    status:"Lost",
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      name: newItem.name,
      category: newItem.category,
      location: newItem.location,
      contact: newItem.contact,
      email: newItem.email,
      date: newItem.date,
      image: newItem.image || "/default.jpg",
      status: newItem.status,
    };

    handleadd(newEntry);
    alert("✅ Item added successfully!");

    setNewItem({
      name: "",
      category: "",
      location: "",
      contact: "",
      email: "",
      date: "",
      image: "",
      status:"Lost"
    });
  };
*/

/*
import React, { useState, useContext, useRef } from "react";
import "./Add.css";
import { ItemContext } from "../Context/ItemContext";
//import { AuthContext } from "../Context/AuthContext";
//import { useNavigate } from "react-router-dom";

const Add = () => {
  const { handleadd ,itemcon} = useContext(ItemContext);
  //const { isAuthenticated } = useContext(AuthContext);
  //const navigate = useNavigate();
  const fileInputRef = useRef(null);
  //if (!isAuthenticated) {
  //  navigate("/loginsignup");
    //return null;
  //}

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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // for now just preview; backend upload can be added later
      const imageUrl = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      name: newItem.name,
      category: newItem.category,
      location: newItem.location,
      contact: newItem.contact,
      email: newItem.email,
      date: newItem.date,
      image: newItem.image || "/default.jpg",
      status: newItem.status,
    };
    try{
    await handleadd(newEntry); // now this calls backend
    alert("✅ Item added successfully!");
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
    //navigate("/items");
  }
  catch(err){
    alert("failed to add item!!");
    console.log(err);
  }
  };
  return (
    <div className="addpage">
      <h1>Add New Item</h1>
      <p className="subtitle">
        Please provide as much detail as possible to help with identification.
      </p>


<div className="radiobox">
          <label className="radiobtn">
          <input type="radio"
          name="status"
          value="Lost"
          checked={newItem.status==="Lost"}
          onChange={(e)=> setNewItem({...newItem,status:e.target.value})}
          />
          <span>LOST</span>
         </label>

          <label className="radiobtn">
          <input type="radio"
          name="status"
          value="Found"
          checked={newItem.status==="Found"}
          onChange={(e)=> setNewItem({...newItem,status:e.target.value})}
          />
          <span>FOUND</span>
         </label>
         </div>





      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />

        <select
  value={newItem.category}
  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
  required
>
  <option value="">Select Category</option>
  {itemcon.map((cat) => (
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
          <button type="button" onClick={handleImageClick}>
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
            <img src={newItem.image} alt="Preview" className="preview" />
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

*/


/*

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

    const payload = {
      ...newItem,
      status:newItem.status === "Found"? "Found":"Lost",
      contact: Number(newItem.contact),
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

   //const handleImageUpload = () => fileInputRef.current.click();

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

        <input type="text" placeholder="Item name" required
          value={newItem.name}
          onChange={(e)=>setNewItem({...newItem,name:e.target.value})}
        />

        <select required
          value={newItem.category}
          onChange={(e)=>setNewItem({...newItem,category:e.target.value})}
        >
          <option value="">Select Category</option>
          {finalCategories.map((cat)=>(
            <option key={cat.category} value={cat.category}>{cat.category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Location"
          value={newItem.location}
          onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
        />

        <input type="number" placeholder="Contact Number" required
          value={newItem.contact}
          onChange={(e)=>setNewItem({...newItem,contact:e.target.value})}
        />

        <input type="email" placeholder="Email"
          value={newItem.email}
          onChange={(e)=>setNewItem({...newItem,email:e.target.value})}
        />

        <input type="date"
          value={newItem.date}
          onChange={(e)=>setNewItem({...newItem,date:e.target.value})}
        />

        <div className="image-upload">
          <button type="button" onClick={()=>fileInputRef.current.click()}>
            Upload Image
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{display:"none"}} onChange={handleImageChange} />

          {newItem.image && (<img src={newItem.image} alt="preview" className="preview" />)} 
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>
    </div>
  );
};

export default Add;
*/


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
