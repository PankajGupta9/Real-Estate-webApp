import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
import Contact from './pages/Contact';
import DashboardLayout from './pages/DashboardLayout';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Practice from './pages/Practice';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const location = useLocation();

  // Check if the current path starts with "/dashboard"
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
      </Routes>
      {/* Conditionally render footer */}
      {!isDashboard && <Footer />}
    </>
  );
};

const WrappedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default WrappedApp;
