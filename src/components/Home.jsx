import React, { useState, useEffect } from 'react';
import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../assets/profile.png";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getMember');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  return (
    <div className="flex h-screen gap-10" style={{ gridTemplateColumns: "1fr 4fr", gap: "2rem", backgroundColor: "rgb(246, 246, 246)", overflowX: "clip", overflowY: "clip", grid: "unset", display: "flex", height: "100vh" }}>
      <AdminSidebar />
      <main className="dashboard">
        <div className="header">
          <div className="text-lg">
            <BsSearch />
          </div>
          <input
            type="text"
            placeholder="Search for data, user, docs"
            className="w-full px-0 py-4 mr-auto bg-transparent border-none outline-none"
          />
          <FaRegBell style={{ fontSize: "18px" }} />
          <img src={userImg} alt="User" className="w-8 h-8 rounded-full" />
        </div>

        <div>
          {selectedUser ? (
            <div className='text-white'>
              <h3>User Details</h3>
              <div className='gap-7'>
                <p>Name: {selectedUser.firstname}</p>
                <p>Email: {selectedUser.email}</p>
                <p>Phone: {selectedUser.phone}</p>
                <p>Membership: {selectedUser.Membership}</p>
                <button onClick={handleBackClick}>Back</button>
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
  );
}

export default AllMembers;
