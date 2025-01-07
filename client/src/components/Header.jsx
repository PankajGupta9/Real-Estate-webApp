import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import newLogo from '../assets/newLogo.png';
import { CiUser } from "react-icons/ci";



const Header = () => {
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);     
  };

  useEffect(() => {
    const  urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleProfileClick = () =>{
    setDropdownVisible(!dropdownVisible); // toggl dropdown visible
  }


  return (
    <header className='bg-white shadow-md top-0 z-20 sticky'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
                <img className='w-[150px] h-[55px] md:w-15' src={newLogo} alt="logoDark" />
        </Link>    
        {/* <form onSubmit={handleSubmit} className='bg-slate-200 p-3 rounded-lg flex items-center'>
            <input 
             type="text" 
             placeholder='search...' 
             className='bg-transparent text-blue-900 border-black focus:outline-none w-24 h-4 sm:w-64'
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             />
             <button>
             <FaSearch className='text-slate-600'/> 
             </button>
        </form> */}
        <ul className='flex gap-4  items-center'>
             <Link to='/'>
            <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
            HOME
            </li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
            ABOUT
            </li>
            </Link>
            <Link to='/contact'>
            <li className='hidden sm:inline text-slate-700 font-semibold hover:opacity-75'>
            CONTACT
            </li>
            </Link>


            <div className='relative'>
              <div  className='cursor-pointer'>
                   <li >
                   {currentUser ? ( 
                     <img 
                     onClick={handleProfileClick} 
                     className='rounded-full  border border-slate-900 h-[40px] w-[40px]  hover:opacity-75
                     object-cover' 
                     src={currentUser.avatar|| "https://via.placeholder.com/150"}
                     alt="Profile" />
                   ) : (
                     <Link to={'/sign-in'} className="flex  gap-1 items-center bg-white px-6 py-3 border border-blue-700 rounded-3xl 
                     text-slate-700 font-semibold hover:bg-blue-600 hover:text-white hover:opacity-75 cursor-pointer transition duration-300">
                     <CiUser className='h-6 w-6'/>
                      Sign in
                    </Link>
                   )}
                   </li>
                    </div>
                    {dropdownVisible && (
                    <div className='absolute right-0 mt-2 w-[200px] bg-slate-900 text-white  shadow-lg rounded-md p-2'>
                        <ul className='flex flex-col gap-2'>
                          {/* <Link to={'/profile'}>Profile</Link> */}
                          <Link to='/profile'>
                          <div className='flex flex-col items-center gap-2'>
                          {currentUser ? (
                             <img className='rounded-full border border-slate-100 h-[60px] w-[60px] hover:opacity-75
                             object-cover' src={currentUser.avatar} 
                             alt="" />
                           ) : (''
                           )}
                           <span className='text-blue-500 font-semibold hover:opacity-75'>Profile</span>

                          </div> 

                           </Link>
                          <Link className='text-slate-300 py-2 hover:text-white cursor-pointer'>List Property</Link>
                          <Link to={'/dashboard'} className='text-slate-300 py-2 hover:text-white cursor-pointer'>Dashboard</Link>
                          <Link className='text-slate-300 py-2 hover:text-white cursor-pointer'>Listed Property</Link>
                        </ul>
                    </div>

              )

              }
            </div>
        </ul>
    </div>
    </header>
  )
}

export default Header





























