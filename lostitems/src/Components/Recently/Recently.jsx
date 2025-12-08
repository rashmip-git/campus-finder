import React, {useContext} from 'react'
import './Recently.css'
import {ItemContext} from '../../Context/ItemContext';
import { Link } from 'react-router-dom';

const Recently = () => {

    const {itemcon,loading}=useContext(ItemContext);
    if(loading) return <p>Loading items.. Please wait a while..</p>//extract all stored category-data n items from global Context
    const allitems=itemcon.flatMap(cat=>cat.items);//goes through every category and pulls out every item.
    const sorted=[...allitems].sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));
    const recent3 = sorted.slice(0, 3);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };

    
  return (
   <>
   <div className="recentlyposted">
    <div className="recentlytop">
    <div className="recentlyleft">
    <h1>Recently Posted</h1>
    <p>help reunite these items with their owners</p>
    </div>
    <Link to='/category'>
    <button className='viewmore'>view more</button></Link>
    </div>


    <div className="recentlybottom">
        
        {recent3.length>0 ?(
        recent3.map((p)=>(
            
            <div className="itemcard" key={p._id }> {/*|| p.id || Math.random()}> */}
        
                <img src={p.image || 'https://via.placeholder.com/200x150'} alt=""/>
                <div className="imginfo">
                <h3>{p.name}</h3>
                <p className='category'>{p.category}</p>
                <p className='location'>{p.location}</p>
                <p className='contact'>Contact: {p.contact}</p>
                <p className='email'>Email: {p.email}</p>
                <p className='date'>Date: {formatDate(p.createdAt)}</p>
                 <Link to={`/category/${encodeURIComponent(p.category)}`}>
                <button>VIEW DETAILS</button></Link>
            </div></div>
        ))
    ):(<p className='noitems'>no recent items</p>

        )}
    </div>

   </div>

   </>
  )
}

export default Recently