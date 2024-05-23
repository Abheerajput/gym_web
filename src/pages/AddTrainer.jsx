// import React from 'react'

import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/profile.png";
import React, { useState } from "react";
import pic from "../assets/gymtrainer.png"




const AddTrainer = () => {
  const [trainers, setTrainers] = useState({
    name: "",
    Phone: "",
    DateOfJoining: "",
    Address: "",
    Skills: ""
  });
  // const [totalTrainers, setTotalTrainers] = useState(0);


  let name, value
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setTrainers({ ...trainers, [name]: value });
  };




  const handleDateChange = (e) => {
    const { name, value } = e.target;
    // Convert date to ISO format
    const isoDate = new Date(value).toISOString().split('T')[0];
    setTrainers({ ...trainers, [name]: isoDate });
  };


  const postTrainerData = async (e) => {
    e.preventDefault();
    const { name, DateOfJoining, Address, Phone, Skills } = trainers;

    if (!name || !DateOfJoining || !Address || !Phone || !Skills) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/addTrainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, DateOfJoining, Address, Phone, Skills })
      });

      const data = await response.json();



      if (data.status === 422 || !data) {
        window.alert("Invalid registration");
        console.log("Invalid registration");
      } else {
        window.alert("Trainer has added successfully!");
      }
      if (response.ok) {
        window.alert("trainer added successfully!");
        setTrainers([...trainers, data.trainer]);
        // Clear the form fields
        setTrainers({
          name: "",
          Phone: "",
          DateOfJoining: "",
          Address: "",
          Skills: ""
        });
      }

      else {
        window.alert("Failed to add trainer");
        console.log("Failed to add trainer:", data.error);
      }
    } catch (error) {
      console.log("Error:", error);
    }

  };


  return (
    <div className="flex h-screen gap-10" style={{ gridTemplateColumns: "1fr 4fr",  backgroundColor: "rgb(246, 246, 246)", overflowX: "clip", overflowY: "clip", grid: "unset", display: "flex", height: "100Vh" }}>
      <AdminSidebar />

      <main className="dashboard " >
        <div className="header" >
          <div className="text-lg">
            <BsSearch />
          </div>


          <input
            type="text"
            placeholder="Search for data,user,docs" />

          <FaRegBell style={{ fontSize: "18px" }} />

          <img src={userImg} alt="User"
          // style={{ height: "2rem",width:"2rem",borderRadius:"50%"}}
          >


          </img>
        
        </div>
 
        <div className="gap-2 " style={{ marginTop: "50px", display:"flex" }}>

 
          <form
            method="POST">
            <h1>REGISTERION </h1>

            <div className="Name">
              <div className="inputForm">
                <input
                  type="text"
                  name="firstname"
                  id="floating_first_name"

                  placeholder="  First name"
                  value={trainers.firstname}
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
                  value={trainers.lastname}
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
                value={trainers.email}
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
                name="DateofAddmisson"
                id="floating_password"

                placeholder="DateofAddmisson"
                value={trainers.DateofAddmisson}
                onChange={handleInput}
                required
              />

            </div>

            <div className="inputForm">
              <input
                type="text"
                name="Address"
                id="floating_repeat_password"

                placeholder="  Address Of Client "
                value={trainers.Address}
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
                  placeholder="Phone number (123-456-7890) "
                  value={trainers.phone}
                  onChange={handleInput}
                  required
                />

              </div>


              <div className="relative z-0 w-full mb-5 group">
                <select
                  style={{opacity:'0.8',borderRadius:'10px 100px / 120px',borderBottom:'1px solid grey',color:'gray'}}
                  name="Trainership"
                  className="Membership"              
                  value={trainers.Trainership}
                  onChange={handleInput}
                  required
                >
                  <option value="">Trainership Type</option>
                  <option value="OneMonth">One Month - Rs. 1000</option>
                  <option value="three-months">Three Months - Rs. 2500</option>
                  {/* Add more options as needed */}
                </select>
                <label
                  htmlFor="trainershipType"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                </label>
              </div>




            </div>

            <button
              type="submit"
              name="signup"
              id="signup"
              autoComplete="off"
              onClick={postTrainerData}
              className=""
            >
              Add Member
            </button>




            <div className="pb-12 mt-4  rounded contents w-28 bg-stone-600">
              <ul className="-mt-32 ml-96 contents">
                {Object.entries(trainers).map(([key, value], index) => (
                  <li key={index} className="py-2">
                    {/* {key}: */}
                    {value}
                  </li>
                ))}
              </ul>
            </div>

          </form>


        </div>



      </main>
    </div>
  )
}

export default AddTrainer
