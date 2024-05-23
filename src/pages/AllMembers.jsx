import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/profile.png";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalItems = members.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = members.slice(startIndex, endIndex);

  useEffect(() => {
    fetchMemberData();
  }, [currentPage]);

  const handleMemberClick = (member) => {
    console.log('Selected Member:', member);
    setSelectedMember(member);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
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

  return (
    <div className="flex h-screen gap-10" style={{ gridTemplateColumns: "1fr 4fr", backgroundColor: "rgb(246, 246, 246)", overflowX: "clip", overflowY: "clip", grid: "unset", display: "flex", height: "100Vh" }}>
      <AdminSidebar />
      <main className="dashboard" >
        {selectedUser? (
          <div className=' UserDetails'>
            <h1>User Details</h1>
            <div className='UserInfo'>
              <div className="elements">
                <p>Name: {selectedUser.firstname} </p>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Membership: {selectedUser.Membership}</p>
              </div>
              <div className="element_button">
                <button onClick={() => setSelectedUser(null)}>Back</button>
                <button onClick={() => handleRemoveClick(selectedUser._id)}>Remove</button>
                <button>Update</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='member'>
            <div className="header">
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
            <div className='memberContainer' style={{maxHeight: "500px", overflowY: "scroll"}}>
              <h2 className='text-white'>Members</h2>
              {loading? (
                <p className='text-white' >Loading...</p>
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
                  <tbody>
                    {currentItems.map((member,index) => (
                     <tr key={index} className="tablerow" onClick={() => handleEditClick(member)}>
                      <td>{member.firstname}</td>
                       <td>{member.phone}</td>
                       <td>{member.email}</td>
                       <td>{member?.DateofAddmission}</td>
                       <td>{member.Address}</td>
                       <td>{member.Membership}</td>
                       <td >
                         <button style={{marginLeft:'-8px', width:'100%' ,opacity:'1'}}>Edit</button>
                       </td>
                   </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
              <div className='pagination'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={5}
                  onChange={setCurrentPage}
                />
              </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllMembers;