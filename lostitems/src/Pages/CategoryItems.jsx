
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

            
            const ownerId = normalizeId(item.uploadedBy._id || item.uploadedBy);
            const isOwner = ownerId === loggedUserId;
            const isResolved = item.status === "Resolved";
          

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
