import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaChartBar, FaChartPie, FaChartLine } from "react-icons/fa";
import { useLocation,  } from "react-router-dom";
import sidebar_img from '../assets/sidebar_expand_toggle_nav_icon_145935.png'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const Li = ({ url, text, location, Icon }) => (
    
    <li
      style={{
        backgroundColor: location.pathname.includes(url) ? "#fe7b57" : "white",borderRadius:"20px",paddingRight:"29px"
      }}
    >
      <Link 
        to={url}
        style={{
          color: location.pathname.includes(url) ? "white" : "black",
          display:"flex",
          flexDirection:"row",justifyContent:"unset",alignItems:"center",
          textDecoration:"none"
        }}>
          <p style={{paddingLeft:"20px"}}><Icon/></p>
        

        {text}
        
      </Link>
    </li>
    
  
  );
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); 
  };
  return (
    <div>
      <div className="adminContainer">
       <aside className={`aside ${isOpen? '' : 'isOpen'}`} style={{ overflowY: 'clip',msOverflowY:"auto",padding:"1.5rem",height:"300vh" }}>
       <img className='toggel_button' onClick={handleToggleSidebar} src={sidebar_img} alt="Toggle Sidebar" />
      <h2 className='shop_text' >Shop</h2>
      <div >
        <h5 className='center'>Dashboard</h5>

 

        <ul>

          <Li
         

            url="/AddMember"

            text="AddMember"

            Icon={IoPersonAddSharp}

            location={location}

          />

          <Li

            url="/AddTrainer"

            text="Add Trainer"

            Icon={IoPersonAddSharp}

            location={location}

          />

          <Li

            url="/AllMembers"

            text="Members"

            Icon={FaEye}

            location={location}

          />

          <Li

            url="/AllTrainers"

            text="Trainers"

            Icon={FaEye}

            location={location}

          />

        </ul>

      </div>


      <div>
        <h5>Charts</h5>
        <ul>
          <Li
            url="/admin/charts/bar"
            text="Bar"
            Icon={FaChartBar}
            location={location}
          />
          <Li
            url="/admin/Pie"
            text="Pie"
            Icon={FaChartPie}
            location={location}
          />
          <Li
            url="/admin/Line"
            text="Line"
            Icon={FaChartLine}
            location={location}
          />
        </ul>
      </div>
      
    </aside>
      </div>
    </div>
     
   
  );
};

export default AdminSidebar;
