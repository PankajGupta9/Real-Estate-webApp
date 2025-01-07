// import React, { useState } from 'react'
// import axios from 'axios';
// import { toast } from 'react-toastify';


// this code practice for signin 
// const Practice = () => {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.id]: e.target.value,
//   })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Axios automatically stringifies the data and sets headers
//       const res = await axios.post('/api/auth/signup', formData);
  
//       const data = res.data; // Axios stores the response data under 'data'
  
//       if (data.success === false) {
//         setLoading(false);
//         setError(data.message);
//         return;
//       }
//       setLoading(false);
//       setError(null);
//     } catch (error) {
//       setLoading(false);
//       // Axios error handling is different; use error.response for server errors
//       setError(
//         error.response ? error.response.data.message : error.message
//       );
//     }
//   };
  





//   return (
//     <div className='max-w-lg m-auto'>
//       <h1 className='text-center my-6 text-lg'>sign up</h1>
      
//       <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
//         <input onChange={handleChange} className='p-3 rounded-lg' type="text" id='username' placeholder='Enter your username'/>
//         <input onChange={handleChange} className='p-3 rounded-lg' type="text" id='email' placeholder='Enter your email'/>
//         <input onChange={handleChange} className='p-3 rounded-lg' type="text" id='password' placeholder='Enter your password'/>
//         <button className='p-3 rounded-lg bg-slate-600 text-white hover:opacity-80'>Sign Up</button>
//       </form>
//       <div className='flex justify-between my-5 '>
//         <p >Already have an account ?</p>
//         <span className='text-blue-600'>Sign In</span>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}


//       </div>
    
//   )
// }

// export default Practice;











import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';






const Practice = () => {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [formData, setFormData] = useState({});

  const handleFileChange = (e) => {
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Axios automatically stringifies the data and sets headers
      const res = await axios.post('/api/auth/signup', formData);
  
      const data = res.data; // Axios stores the response data under 'data'
  
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      // Axios error handling is different; use error.response for server errors
      setError(
        error.response ? error.response.data.message : error.message
      );
    }
  };
  





  return (
    <div className='max-w-lg m-auto'>
      <h1 className='text-center my-6 text-lg'>sign up</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input type="file"
        ref={fileRef}
        hidden
        accept='image/*'
        onChange={{handleFileChange}}
         />
         
         <img
        onClick={() => fileRef.current.click()}
        src={previewImage || 'https://via.placeholder.com/150'}
        alt='profile'
        className='rounded-full h-24 w-24 object-cover curser-pointer self-center mt-2'
        />
        <input 
        className='p-3 rounded-lg' 
        type="text" 
        id='username'
        value={username} 
        onChange = {(e) => setUsername(e.target.value)}
        />

        <input 
        className='p-3 rounded-lg' 
        type="text" 
        id='email'
        value={email} 
        onChange = {(e) => setEmail(e.target.value)}
 
        />

        <input 
        className='p-3 rounded-lg' 
        type="text" 
        id='password' 
        value={password} 
        onChange = {(e) => setPassword(e.target.value)}          
        />

        <button 
        className='p-3 rounded-lg bg-slate-600 text-white hover:opacity-80'>
        Update
        </button>
      </form>

      <div className='flex justify-between my-5 '>
      <button className='text-red-700'>
        Delete
      </button>
      <button className='text-red-700'>
        SignOut
      </button>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}


      </div>
    
  )
}

export default Practice;


















// import React, { useState, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import newLogo from '../assets/newLogo.png';
// import { CiUser } from "react-icons/ci";

// const Header = () => {
//   const { currentUser } = useSelector(state => state.user);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set('searchTerm', searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFromUrl = urlParams.get('searchTerm');
//     if (searchTermFromUrl) {
//       setSearchTerm(searchTermFromUrl);
//     }
//   }, [location.search]);

//   const handleProfileClick = () => {
//     setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
//   };

//   const handleProfileRedirect = () => {
//     navigate('/profile'); // Redirect to profile page
//   };

//   return (
//     <header className='bg-white shadow-md top-0 z-20 sticky'>
//       <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
//         <Link to='/'>
//           <img className='w-[150px] h-[55px] md:w-15' src={newLogo} alt="logoDark" />
//         </Link>
//         <ul className='flex gap-4 items-center'>
//           <Link to='/'>
//             <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
//               HOME
//             </li>
//           </Link>
//           <Link to='/about'>
//             <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
//               ABOUT
//             </li>
//           </Link>
//           <Link to='/contact'>
//             <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
//               CONTACT
//             </li>
//           </Link>
//           <div className="relative">
//             <div onClick={handleProfileClick} className="cursor-pointer">
//               {currentUser ? (
//                 <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="Profile" />
//               ) : (
//                 <li className="flex gap-1 items-center bg-white px-6 py-3 border border-blue-700 rounded-3xl 
//                   text-slate-700 font-semibold hover:bg-blue-600 hover:text-white hover:opacity-75 
//                    cursor-pointer transition duration-300">
//                   <CiUser className='h-6 w-6' />
//                   Sign in
//                 </li>
//               )}
//             </div>
//             {dropdownVisible && (
//               <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
//                 <ul>
//                   <li onClick={handleProfileRedirect} className="text-slate-700 py-2 hover:bg-blue-100 cursor-pointer">Your Profile</li>
//                   <li className="text-slate-700 py-2 hover:bg-blue-100 cursor-pointer">Favorites</li>
//                   <li className="text-slate-700 py-2 hover:bg-blue-100 cursor-pointer">List Property</li>
//                   <li className="text-slate-700 py-2 hover:bg-blue-100 cursor-pointer">Dashboard</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Header;



























































