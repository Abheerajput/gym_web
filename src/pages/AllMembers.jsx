// import React from 'react'
import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/profile.png";


import React, { useState, useEffect } from 'react';
const AllMembers = () => {
  const [members, setMembers] = useState([]); // Users ki information state mein store karega
  const [selectedUser, setSelectedUser] = useState(null); // Selected user ki information state mein store karega
  const [selectedMember, setSelectedMember] = useState(null); // Selected user ki information state mein store karega
  const [loading, setLoading] = useState(true); // Loading state jisse pata chale ki data fetch ho raha hai ya nahi



  const handleMemberClick = (member) => {
    console.log('Selected Member:', member);
    setSelectedMember(member);
  };

  // Function to handle click on "Edit" button
  const handleEditClick = (user) => {
    // Set the selected user when "Edit" button is clicked
    setSelectedUser(user);
  };


  // Function to handle click on "Back" button
  const handleBackClick = () => {
    // Reset the selected user when "Back" button is clicked
    setSelectedUser(null);
  };


  const handleRemoveClick = async (memberId) => {
    try {
      const response = await fetch(`/api/members/${memberId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete member');
      }

      const data = await response.json();
      console.log(data.message); // Member deleted successfully

      // Refresh the member list after deletion
      fetchMemberData();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  }; 
  const fetchMemberData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/getMember');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberData();
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
            className="w-full px-0 py-4 mr-auto bg-transparent border-none outline-none"
          />
          <FaRegBell style={{ fontSize: "18px" }} />
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
        </div>
        <div>
          {selectedUser ? (
            <div className=' UserDetails'>
              <h1>User Details</h1>
              <div className='UserInfo'>
                <div className="elements">  
                <p>Name: {selectedUser.firstname} </p>
                  <p>Email: {selectedUser.email}</p>
                </div>
                <div className="elements">
                  <p>Phone: {selectedUser.phone}</p>
                  <p>Membership: {selectedUser.Membership}</p>
                </div>

                <button onClick={() => setSelectedUser(null)}>Back</button>
                <button onClick={() => handleRemoveClick(selectedUser._id)}>Remove</button>
                <button>Update</button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className='text-white'>Member</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <table className="table">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Phone Numbers</th>
                      <th scope="col">Email</th>
                      <th scope="col">Date Of Admission</th>
                      <th scope="col">Address</th>
                      <th scope="col">MembershipType</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody className='tbody'>
                    {members.map((member, index) => (
                      <tr key={index} className="tablerow" onClick={() => handleEditClick(member)}>
                        <td>{member.firstname}</td>
                        <td>{member.phone}</td>
                        <td>{member.email}</td>
                        <td>{member?.DateofAddmission}</td>
                        <td>{member.Address}</td>
                        <td>{member.Membership}</td>
                        <td>
                          <button>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default AllMembers
