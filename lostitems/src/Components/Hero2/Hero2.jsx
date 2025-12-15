import React from 'react'
import './Hero2.css'
import logocrowd from '../../assets/crowd.png'
import fast from '../../assets/fast.png'
import safe from '../../assets/safe.png'
import { Link } from "react-router-dom";


const Hero2 = () => {
  return (
    <>
    <div className="hero2box">
    <div className="heading2">
    <h1>REUNITING STUDENTS WITH THEIR</h1>
    <div className="heading22">
    <h1><span>BELONGINGS</span></h1>
    </div>
    </div>
    <div className='texts2'>
    <p>We believe that losing something shouldn't ruin your day.
         Our platform makes it easy for college students to find lost
          items and help others in their community..</p>
    </div>
    <div className="twobuttons">
        <button className='btn1'>JOIN OUR COMMUNITY</button>
        <Link to="/category">
        <button className='btn2'>BROWSE LOST ITEMS</button>
        </Link>
    </div>
    </div>

    <div className="heroboxdown">
        <div className="divfortop">
            <h1>our mission</h1>
            <p>To create a supportive campus community
                 where students help each other 
                recover lost belongings quickly and safely.</p>
        </div>
        <div className="divforbottom">
            <div className="divbottom1">
                <div className="divforimg">
                <img src={logocrowd} alt="" height="70px"/></div>
                <h2>COMMUNITY DRIVEN</h2>
                <p>Built by students, for students. Our
                 platform connects the campus community 
                 to help each other.</p>
            </div>
            <div className="divbottom1">
                <div className="divforimg">
                <img src={fast} alt="" height="70px"/></div>
                <h2>SAFE AND SECURE</h2>
                <p>Your privacy and safety are our top priorities
                    . All interactions are monitored and secure.</p>
            </div>
            <div className="divbottom1">
                <div className="divforimg">
                <img src={safe} alt="" height="70px"/></div>
                <h2>FAST AND EASY</h2>
                <p>Post lost or found items in seconds. Our intuitive interface makes recovery simple.</p>
            </div>
            
        </div>

    </div>

    <div className="us">
        <div className="toptexts">
            <h1>MEET OUR TEAM</h1>
            <p>The students behind the platform</p>
        </div>
        <div className="meher">
            <div className="me">
                <div className="meimg">
                    <h1>RP</h1>
                </div>
                {/*<h2>Prabhu</h2>*/}
                {/*<p>COMPUTER SCIENCE</p>*/}
                <p>Computer Science student who decided to build something helpful</p>
            </div>

            <div className="her">
                <div className="meimg">
                    <h1>AP</h1>
                </div>
                {/*<h2>Pai</h2>*/}
                {/*<p>Backend</p>*/}
                <p>Information Science student passionate about backend development</p>
            </div>

        </div>
    </div>

    </>
  )
}

export default Hero2