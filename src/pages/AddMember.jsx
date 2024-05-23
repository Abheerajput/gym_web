import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import AdminSidebar from '../components/AdminSidebar';
import { FaRegBell } from 'react-icons/fa';
import userImg from '../assets/profile.png';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import pic2 from "../assets/pic2.jpg";
const AddMember = () => {
  const [members, setMembers] = useState({
    firstname: '',
    lastname: '',
    email: '',
    DateofAddmission: '',
    Address: '',
    phone: '',
    Membership: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMembers({ ...members, [name]: value });
  };
  const handleAddMember = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, DateofAddmission, Address, phone, Membership } = members;

    if (!firstname || !lastname || !email || !DateofAddmission || !Address || !phone || !Membership) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/AddMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstname, lastname, email, DateofAddmission, Address, phone, Membership })
      });

      const data = await res.json();

      if (data.status === 422 || !data) {
        window.alert('Invalid registration');
        console.log('Invalid registration');
      } else {
        window.alert('Member added successfully!');
        setMembers({
          firstname: '',
          lastname: '',
          email: '',
          DateofAddmission: '',
          Address: '',
          phone: '',
          Membership: ''
        });
      }
    } catch (error) {
      console.log('Error:', error);
      window.alert('Failed to add member');
    }
  };

  return (
    <div className="flex h-screen gap-10" style={{ gridTemplateColumns: '1fr 4fr', backgroundColor: 'rgb(246, 246, 246)', overflowX: 'clip', overflowY: 'clip', grid: 'unset', display: 'flex', height: '100Vh' }}>
      <AdminSidebar />

      <main className="dashboard "  >
        <div className="header" >
          <div className="text-lg">
            <BsSearch />
          </div>

          <input type="text" placeholder="Search for data,user,docs" />

<FaRegBell style={{ fontSize: '18px' }} />

<img src={userImg} alt="User" style={{ height: '2rem', width: '2rem', borderRadius: '50%' }} />

</div>

<div className="gap-2">

          <section className="widgetContainer">
            <WidgetItem
              percent={40}
              amount={true}
              value={340000}
              heading="Revenue"
              color="rgb(0,115,255)"
            />
            <WidgetItem
              percent={-14}
              value={400}
              heading="Users"
              color="rgb(0,198,202)"
            />
            <WidgetItem
              percent={80}
              amount={true}
              value={340000}
              heading="Transaction"
              color="rgb(255,196,0)"
            />
          </section>

          


    
          <form method="POST">
            <h1>REGISTRATION </h1>

            <div className="Name">
              <div className="inputForm">
                <input
                  type="text"
                  name="firstname"
                  id="floating_first_name"
                  placeholder="  First name "
                  value={members.firstname}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="inputForm">
                <input
                  type="text"
                  name="lastname"
                  id="floating_last_name"
                  placeholder="  Last name "
                  value={members.lastname}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className="inputForm">
              <input
                type="text"
                name="email"
                id="floating_email"
                placeholder=" Enter your email address"
                value={members.email}
                onChange={handleInput}
                required
              />
            </div>

            <div className="inputForm">
              <input
                style={{
                  color:'grey'
                }}
                type="date"
                name="DateofAddmission"
                id="floating_password"
                placeholder="DateofAddmission"
                value={members.DateofAddmission}
                onChange={handleInput}
                required
              />
            </div>

            <div className="inputForm">
              <input
                type="text"
                name="Address"
                id="floating_repeat_password"
                placeholder="Address of client"
                value={members.Address}
                onChange={handleInput}
                required
              />
             
            </div>

            <div className="Name">
              <div className="inputForm">
                <input
                  type="Number"
                  name="phone"
                  id="floating_Phone"
                  className=""
                  placeholder="Phone Number  "
                  value={members.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="inputForm">
                <select
                  style={{color:'gray'}}
                  name="Membership"
                  className="Membership"
                  value={members.Membership}
                  onChange={handleInput}
                  required
                >
                  <option value=""> Membership Type</option>
                  <option value="1-Month -Rs. 1000">One Month - Rs. 1000</option>
                  <option value="3-Months -Rs.2500">Three Months - Rs. 2500</option>
                  <option value="6-Months - Rs.4500">Six-Months - Rs. 4500</option>
                  <option value="12-Months - Rs.9000"> 1 year - Rs.9000</option>
                </select>
                <label
                  htmlFor="membershipType"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                ></label>
              </div>
            </div>

            <button
              type="submit"
              name="signup"
              id="signup"
              autoComplete="off"
              onClick={handleAddMember}
            >
              Add Member
            </button>

            <div className="pb-12 mt-4  rounded contents w-28 bg-stone-600">
              <ul className="-mt-32 ml-96 contents">
                {Object.entries(members).map(([key, value], index) => (
                  <li key={index} className="py-2" style={{display:'none'}}>
                    {value}
                  </li>
                ))}
              </ul>
            </div>

          </form>
     


        </div>
      </main>
    </div>
  );
};

const WidgetItem = ({ heading, value, color, percent, amount = false }) => (
  <article className="widget">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> + {percent}%{''}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{''}
        </span>
      )}
    </div>
    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient(${color}${
          (Math.abs(percent) / 100) * 360
        }deg,rgb(255,255,255) 0 )`,
      }}
    >
      <span style={{ color }}>{percent}%</span>
    </div>
  </article>
);


export default AddMember;













































// // import React from 'react'

// import { BsSearch } from "react-icons/bs";
// import AdminSidebar from "../components/AdminSidebar";
// import { FaRegBell } from "react-icons/fa";
// import userImg from "../assets/profile.png";
// import React, { useState } from "react";
// // import pic from "../assets/gymtrainer.png"
// import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
// const AddMember = () => {

//   const [members, setMembers] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     DateofAddmisson: "",
//     Address: "",
//     phone: "",
//     Membership: "",
//   });

//   // Event handlers
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setMembers({ ...members, [name]: value });
//   };

//   const handleAddMember = async (e) => {
//     e.preventDefault();

//     // Destructure fields from members state
//     const { firstname, lastname, email, DateofAddmisson, Address, phone, Membership } = members;

//     // Check if any field is empty
//     if (!firstname || !lastname || !email || !DateofAddmisson || !Address || !phone || !Membership) {
//       alert("Please fill in all fields");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/AddMember", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ firstname, lastname, email, DateofAddmisson, Address, phone, Membership })
//       });

//       const data = await res.json();

//       if (data.status === 422 || !data) {
//         window.alert("Invalid registration");
//         console.log("Invalid registration");
//       } else {
//         window.alert("Member added successfully!");
//         setMembers({
//           firstname: "",
//           lastname: "",
//           email: "",
//           DateofAddmisson: "",
//           Address: "",
//           phone: "",
//           Membership: ""
//         });
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       window.alert("Failed to add member");
//     }
//   };



//   return (
//     <div className="flex h-screen gap-10" style={{ gridTemplateColumns: "1fr 4fr", gap: "2rem", backgroundColor: "rgb(246, 246, 246)", overflowX: "clip", overflowY: "clip", grid: "unset", display: "flex", height: "100Vh" }}>
//       <AdminSidebar />

//       <main className="dashboard " >
//         <div className="header" >
//           <div className="text-lg">
//             <BsSearch />
//           </div>
//   <section className="widgetContainer">
//           <WidgetItem
//             percent={40}
//             amount={true}
//             value={340000}
//             heading="Revenue"
//             color="rgb(0,115,255)"
//           />
//           <WidgetItem
//             percent={-14}
//             value={400}
//             heading="Users"
//             color="rgb(0,198,202)"
//           />

//           <WidgetItem
//             percent={80}
//             amount={true}
//             value={340000}
//             heading="Transaction"
//             color="rgb(255,196,0)"
//           />
//           <WidgetItem
//             percent={30}
//             value={1000}
//             heading="Products"
//             color="rgb(76 0 255)"
//           />
//         </section>
        

//           <input
//             type="text"
//             placeholder="Search for data,user,docs" />

//           <FaRegBell style={{ fontSize: "18px" }} />

//           <img src={userImg} alt="User"
//           style={{ height: "2rem",width:"2rem",borderRadius:"50%"}}
//           >


//           </img>
        
//         </div>
 
//         <div className="gap-2 " style={{ marginTop: "50px", display:"" }}>

//  {/* <div className="image">
//  <img src={pic} alt="" />
// </div> */}
//           <form
//             method="POST">
//             <h1>REGISTERION </h1>

//             <div className="Name">
//               <div className="inputForm">
//                 <input
//                   type="text"
//                   name="firstname"
//                   id="floating_first_name"
//                   placeholder="  First name "
                  
//                   value={members.firstname}
//                   onChange={handleInput}
//                   required
//                 />

//               </div>
//               <div className="inputForm">
//                 <input
//                   type="text"
//                   name="lastname"
//                   id="floating_last_name"
//                   placeholder="  Last name "
//                   value={members.lastname}
//                   onChange={handleInput}
//                   required
//                 />

//               </div>

//             </div>


//             <div className="inputForm">
//               <input
//                 type="text"
//                 name="email"
//                 id="floating_email"
//                 className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" Enter your email address"
//                 value={members.email}
//                 onChange={handleInput}
//                 required
//               />

//             </div>


//             <div className="inputForm">
//               <input
//                 type="date"
//                 name="DateofAddmisson"
//                 id="floating_password"

//                 placeholder="DateofAddmisson"
//                 value={members.DateofAddmisson}
//                 onChange={handleInput}
//                 required
//               />

//             </div>

//             <div className="inputForm">
//               <input
//                 type="text"
//                 name="Address"
//                 id="floating_repeat_password"

//                 placeholder="  Address Of Client "
//                 value={members.Address}
//                 onChange={handleInput}
//                 required
//               />

//             </div>



//             <div className="Name">
//               <div className="inputForm">
//                 <input
//                   type="Number"
//                   name="phone"
//                   id="floating_Phone"
//                   className=""
//                   placeholder="     Phone number (123-456-7890) "
//                   value={members.phone}
//                   onChange={handleInput}
//                   required
//                 />

//               </div>


//               <div className="relative z-0 w-full mb-5 group">
//                 <select
//                   name="Membership"
//                   className=""
//                   value={members.Membership}
//                   onChange={handleInput}
//                   required
//                 >
//                   <option value="">Select Membership Type</option>
//                   <option value="1-Month -Rs. 1000">One Month - Rs. 1000</option>
//                   <option value="3-Months -Rs.2500">Three Months - Rs. 2500</option>
//                   <option value="6-Months - Rs.4500">Six-Months - Rs. 4500</option>
//                   <option value="12-Months - Rs.9000"> 1 year - Rs.9000</option>
//                   {/* Add more options as needed */}
//                 </select>
//                 <label
//                   htmlFor="membershipType"
//                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                 >
//                 </label>
//               </div>




//             </div>

//             <button
//               type="submit"
//               name="signup"
//               id="signup"
//               autoComplete="off"
//               onClick={handleAddMember}
//               className=""
//             >
//               Add Member
//             </button>




//             <div className="pb-12 mt-4 text-white rounded contents w-28 bg-stone-600">
//               <ul className="-mt-32 ml-96 contents">
//                 {Object.entries(members).map(([key, value], index) => (
//                   <li key={index} className="py-2">
//                     {/* {key}: */}
//                     {value}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//           </form>


//         </div>



//       </main>
//     </div>



//   );
// };

// interface WidgetItemProps {
//   heading: string;
//   value: number;
//   percent: number;
//   color: string;
//   amount?: boolean;
// }

// const WidgetItem = ({
//   heading,
//   value,
//   color,
//   percent,
//   amount = false,
// }: WidgetItemProps) => (
//   <article className="widget">
//     <div className="widgetInfo">
//       <p>{heading}</p>
//       <h4>{amount ? `$${value}` : value}</h4>
//       {percent > 0 ? (
//         <span className="green">
//           <HiTrendingUp /> + {percent}%{""}
//         </span>
//       ) : (
//         <span className="red">
//           <HiTrendingDown /> {percent}%{""}
//         </span>
//       )}
//     </div>
//     <div
//       className="widgetCircle"
//       style={{
//         background: `conic-gradient(${color}${
//           (Math.abs(percent) / 100) * 360
//         }deg,rgb(255,255,255) 0 )`,
//       }}
//     >
//       <span style={{ color }}>{percent}%</span>
//     </div>
//   </article>
// );



// export default AddMember;