import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaList, FaChartBar } from 'react-icons/fa';
import { MdPlaylistAddCircle } from 'react-icons/md';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Menu button for small screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-26  left-0 z-50 p-1 text-white bg-gray-800 rounded-full shadow-md"
      >
        {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed  left-0 mr-10 w-[300px] bg-gray-800 text-white h-full transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-[300px] h-[500px]`}
      >
        <div className="p-4 text-lg font-bold border-b border-blue-700">Dashboard</div>
        <ul className="mt-4">
          <li className="p-4 hover:bg-blue-700 cursor-pointer">
            <Link to="/dashboard/profile" className="flex items-center">
              <FaUser className="mr-2" /> Profile
            </Link>
          </li>
          <li className="p-4 hover:bg-blue-700 cursor-pointer">
            <Link to="/dashboard/create-listing" className="flex items-center">
              <MdPlaylistAddCircle className="mr-2 w-5 h-5" /> List Property
            </Link>
          </li>
          <li className="p-4 hover:bg-blue-700 cursor-pointer">
            <Link to="/dashboard/show-listing" className="flex items-center">
              <FaList className="mr-2" /> Listed Properties
            </Link>
          </li>
          <li className="p-4 hover:bg-blue-700 cursor-pointer">
            <Link to="/dashboard/analytics" className="flex items-center">
              <FaChartBar className="mr-2" /> Analytics
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open on small screens */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
