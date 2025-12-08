import React, { useState, useEffect } from 'react';
import './Stat.css'
import crowd from '../../assets/crowd.png'
import location from '../../assets/location.png'
import tick from '../../assets/tick.png'


const Stat = () => {
  const [userCount, setUserCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);

  const [displayUser, setDisplayUser] = useState(0);
  const [displayResolved, setDisplayResolved] = useState(0);

  // Fetch active users count
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/count")
      .then(res => res.json())
      .then(data => setUserCount(data.total || 0))
      .catch(err => console.log("User count error:", err));
  }, []);

  // Fetch resolved items count
  useEffect(() => {
    fetch("http://localhost:5000/api/items/stats/resolved")
      .then(res => res.json())
      .then(data => setResolvedCount(data.totalResolved || 0))
      .catch(err => console.log("Resolved count error:", err));
  }, []);

  // 🔥 Smooth animation function
  const animate = (finalValue, setter) => {
    let start = 0;
    const duration = 800;
    const increment = finalValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        clearInterval(timer);
        setter(finalValue);
      } else {
        setter(Math.floor(start));
      }
    }, 16);
  };

  useEffect(() => animate(userCount, setDisplayUser), [userCount]);
  useEffect(() => animate(resolvedCount, setDisplayResolved), [resolvedCount]);


  return (
    <>
    <div className="statbox">
        <div className="box1">
            <div className="imgdiv">
            <img src={crowd} height="60px" alt=""/>
            </div>
            <p>{displayUser}</p><p>ACTIVE STUDENTS</p>
        </div>
        <div className="box2">
            <div className="imgdiv">
            <img src={tick} height="60px" alt=""/>
            </div>
            <p>{displayResolved}</p><p>ITEMS RETURNED</p>
        
        </div>
        <div className="box3">
            <div className="imgdiv">
            <img src={location} height="60px" alt=""/>
            </div>
            <p>10</p><p>CAMPUS LOCATION</p>
        </div>
    </div>
    </>
  )
}

export default Stat