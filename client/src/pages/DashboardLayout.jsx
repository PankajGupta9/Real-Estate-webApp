import React from 'react';
import Sidebar from '../components/SideBar';
import Profile from './Profile';
import CreateListing from './CreateListing';
import { Routes, Route } from 'react-router-dom';
import ShowListing from './ShowListing';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full lg:w-1/5 bg-white shadow-md lg:shadow-none">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-full lg:w-4/5 p-4 sm:p-6 lg:p-8 bg-gray-100 border-t lg:border-t-0 lg:border-l border-gray-300">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/show-listing" element={<ShowListing />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
