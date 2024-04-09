// import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import React, { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/profile.png";
const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]); 
  const [selectedTrainer, setSelectedTrainer] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const handleTrainerClick = (trainer) => {
    console.log('Selected trainer:', trainer);
    setSelectedTrainer(trainer);
  };

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getAllTrainer');
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error('Error fetching trainers:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerData();
  }, []);
  return (
    <div className="flex h-screen gap-10" style={{ gridTemplateColumns: "1fr 4fr", gap: "2rem", backgroundColor: "rgb(246, 246, 246)", overflowX: "clip", overflowY: "clip", grid: "unset", display: "flex", height: "100Vh" }}>
    <AdminSidebar />
    <main className="dashboard" >
    <div className="header" >
        <div className="text-lg">
          <BsSearch />
        </div>
        <input
          type="text"
          placeholder="Search for data,user,docs"
          className="w-screen px-0 py-4 mr-auto bg-transparent border-none outline-none"
        />
        <FaRegBell style={{ fontSize: "18px" }} />
        <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
      </div>

    
    <div>
    <h2 className='text-white'>Trainers</h2>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {Array.isArray(trainers) && trainers.length > 0 ? (
          <table>
            <thead>
              <tr className='text-white'>
                <th>Name</th>
                <th>Skills</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              {trainers.map((trainer, index) => (
                <tr key={index} onClick={() => handleTrainerClick(trainer)}>
                  <td>{trainer.name}</td>
                  <td>{trainer.Skills}</td>
                  <td>{trainer.Phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-white'>No trainers found</p>
        )}
        {selectedTrainer && (
          <div className='text-white'>
            <h3>Trainer Details</h3>
            <p>Name: {selectedTrainer.name}</p>
            <p>Skills: {selectedTrainer.Skills}</p>
            <p>Phone: {selectedTrainer.Phone}</p>
          </div>
        )}
      </div>
    )}
  </div>
  </main>
    </div>
  
  )
}

export default AllTrainers
