/*import React, { useState, useContext } from "react";
import "./CategoryItem.css";
import { ItemContext } from "../Context/ItemContext";

const CategoryItems = ({ category, goBack }) => {
  const { itemcon,handleResolve } = useContext(ItemContext);

  // ✅ Find the selected category’s items
  const selectedCat = itemcon.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const [statusFilter, setStatusFilter] = useState("All");


 /* const [itemStatuses, setItemStatuses] = useState(() => {
    const allItems = selectedCat?.items || [];
    return allItems.reduce((acc, item) => {
      acc[item.id] = item.status || "Lost";
      return acc;                             
    }, {});                                   dont write this part
  });*/

  // ✅ Filter items by status
// ✅ Sort: newest first, then filter by status

/*
const filteredItems = (selectedCat?.items || [])
  .sort((a, b) =>new Date(b.createdAt) - new Date(a.createdAt)) // ✅ Newest items show first
  .filter(
    (item) =>
      statusFilter === "All" || item.status === statusFilter
  );*/


  // ✅ Handle status change (Lost → Found → Resolved)
 /* const handleStatusChange = (id) => {
    setItemStatuses((prev) => {
      const current = prev[id];
      let nextStatus =                       dont write this part
        current === "Lost"
          ? "Found"
          : current === "Found"
          ? "Resolved"
          : "Resolved";
      return { ...prev, [id]: nextStatus };
    });
  };
*/

/*
  return (
    <div className="category-items-page">
      <button className="back-btn" onClick={goBack}>
        ← Back to Categories
      </button>

      <h2 className="cat-items-title">{category}</h2>
      <p className="cat-items-count">
        {filteredItems.length} items in this category
      </p>

     
      <div className="filters">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Items</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="category-items-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((p) => {
            const currentStatus = itemStatuses[p.id];
            const isDisabled = currentStatus === "Resolved";

            return (
              <div
                className={`item-row ${isDisabled ? "disabled" : ""}`}
                key={p.id}
              >
                <div className="item-header">
                  <span className={`status-tag ${currentStatus.toLowerCase()}`}>
                    {currentStatus}
                  </span>
                  <button
                    className="mark-btn"
                    onClick={() => handleStatusChange(p.id)}
                    disabled={isDisabled}
                  >
                    {currentStatus === "Lost"
                      ? "Mark as Found"
                      : currentStatus === "Found"
                      ? "Mark as Resolved"
                      : "Resolved"}
                  </button>
                </div>

                <div className="item-body">
                  <img src={p.image} alt={p.name} />
                  <div className="item-details">
                    <h3>{p.name}</h3>
                    <p className="item-desc">
                      Found/lost at {p.location}.
                    </p>
                    <p className="item-location">{p.location}</p>
                    <p className="item-time">{p.date}</p>

                    <div className="contact-info">
                      <p>
                        <strong>Contact:</strong> {p.contact}
                      </p>
                      <p>
                        <strong>Email:</strong> {p.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="empty-text">No items in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;*/

/*
import React, { useState, useContext } from "react";
import "./CategoryItem.css";
import { ItemContext } from "../Context/ItemContext";
import { AuthContext } from "../Context/AuthContext";

const CategoryItems = ({ category, goBack }) => {
  const { itemcon, handleResolve } = useContext(ItemContext);
  const { user } = useContext(AuthContext);

   /*const normalize = (val) => {
    if (!val) return "";
    if (typeof val === "string") return val.trim();
    if (val._id) return val._id.trim();                   dont write this part
    if (val.$oid) return val.$oid.trim();
    return String(val).trim();
  };*/
/*
  const selectedCat = itemcon.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredItems = (selectedCat?.items || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter(
      (item) => statusFilter === "All" || item.status === statusFilter
    );


 //console.log("Logged User:", user);
//console.log("Logged User ID:", user?._id);
//console.log("Item uploadedBy values:", filteredItems.map(i => i.uploadedBy));
const normalizeId = (id) => {
    if (!id) return "";
    return id.toString().replace(/[^a-zA-Z0-9]/g, "");
  };
   const loggedUserId = normalizeId(user?._id);
   
   const handleClick = async (item) => {
    const itemOwnerId = normalizeId(item.uploadedBy);

    if (itemOwnerId !== loggedUserId) {
      alert("⚠ Only the uploader can resolve this item.");
      return;
    }

    await handleResolve(item._id);
  };


  return (
    <div className="category-items-page">
      <button className="back-btn" onClick={goBack}>← Back to Categories</button>
      <h2 className="cat-items-title">{category}</h2>
      <p className="cat-items-count">{filteredItems.length} items</p>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="category-items-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className={`item-row ${item.status === "Resolved" ? "disabled" : ""}`} key={item._id}>
              <div className="item-header">
                <span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span>
            

           {normalize(item.uploadedBy) === normalize(user?._id) ? (                <button
                  className="mark-btn"
                  disabled={item.status === "Resolved"}
                  onClick={() => handleResolve(item._id)}
                >
                  {item.status === "Resolved" ? "Resolved" : "Mark Resolved"}
                  
                </button>
            ):(item.status !== "Resolved" && (
                    <span className="not-owner">Only uploader can resolve</span>))}
              </div>

              <div className="item-body">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString("en-IN")}</p>
                  <p><strong>Contact:</strong> {item.contact}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
*/
import React, { useState, useContext } from "react";
import "./CategoryItem.css";
import { ItemContext } from "../Context/ItemContext";
import { AuthContext } from "../Context/AuthContext";

const CategoryItems = ({ category, goBack }) => {
  const { itemcon, handleResolve } = useContext(ItemContext);
  const { user } = useContext(AuthContext);

  const selectedCat = itemcon.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const [statusFilter, setStatusFilter] = useState("All");

  const filteredItems = (selectedCat?.items || [])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((item) => statusFilter === "All" || item.status === statusFilter);
  


  // Normalize Mongo ID so comparison works
  const normalizeId = (val) => {
    if (!val) return "";
    return val.toString().replace(/[^a-zA-Z0-9]/g, "");
  };

  const loggedUserId = normalizeId(user?._id || user?.id);

  const handleClick = async (item) => {
    const ownerId = normalizeId(item.uploadedBy._id || item.uploadedBy);          //dont

    if (ownerId !== loggedUserId) {
      alert("⚠ Only the uploader can resolve this item.");
      return;
    }

    await handleResolve(item._id);
  };
  /*
  const handleClick = async (item) => {
    if (!user) return alert("Please login to resolve!");

    if (item.uploadedBy?._id !== user._id) {
      return alert("❌ Only the person who uploaded this item can resolve it!");
    }

    await handleResolve(item._id);
  };*/




  return (
    <div className="category-items-page">
      <button className="back-btn" onClick={goBack}>← Back to Categories</button>
      <h2 className="cat-items-title">{category}</h2>
      {/*<p className="cat-items-count">{filteredItems.length} items</p>*/}

      {/* FILTER DROPDOWN */}
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* LIST ITEMS */}
      <div className="category-items-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => {
            console.log("ITEM DEBUG:", item.uploadedBy, "logged:", user);

            //const ownerId = normalizeId(item.uploadedBy);
            //const isOwner = ownerId === loggedUserId;
            //const isOwner = user && item.uploadedBy._id === user._id;
            const ownerId = normalizeId(item.uploadedBy._id || item.uploadedBy);
            const isOwner = ownerId === loggedUserId;
            const isResolved = item.status === "Resolved";
            //const isOwner = user && String(item.uploadedBy) === String(user._id);

            //const isResolved = item.status === "Resolved";

            return (
              <div
                className={`item-row ${isResolved ? "disabled" : ""}`}
                key={item._id}
              >
                <div className="item-header">
                  <span className={`status-tag ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                  

                  {isOwner ? (
                  <button
                    className="mark-btn"
                    disabled={isResolved}
                    onClick={() => handleClick(item)}
                  >
                    {isResolved ? "Resolved" : "Resolve"}
                  </button>
                  ):

                   !isResolved && (<span className="not-owner">Only uploader can resolve</span>
           
            )}
                </div>

                <div className="item-body">
                  <img src={item.image || "/default.jpg"} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleDateString("en-IN")}</p>
                    <p><strong>Contact:</strong> {item.contact}</p>
                    <p><strong>Email:</strong> {item.email}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
