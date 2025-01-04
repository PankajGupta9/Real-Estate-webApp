// import React from 'react';
// import newLogo from '../assets/newLogo.png';
// import paymentLogo from '../assets/paymentLogo.png';
// import {ImGithub} from 'react-icons/im';
// import {
//     FaFacebook,
//     FaTwitter,
//     FaInstagram,
//     FaYoutube,
//     FaHome,
// } from 'react-icons/fa';
// import {MdLocationOn} from "react-icons/md";
// import {BsPersonFill, BsPaypal} from "react-icons/bs";
// // import {logo} from "../assets";

// const Footer = () => {
//   return (
//     <div className='bg-black text-[#949494] py-20 px-20 font-titleFont'>
//     <div className='max-w-screen-xl mx-auto md:grid grid-cols-4 py-100'>

//     <div className='flex  flex-col gap-6'>
//         <img className='w-20 h-82 md:w-28' src={newLogo} alt="logoDark" />
//         <img  className='w-56' src={paymentLogo} alt="paymentLogo" />
//         <div className='flex gap-3 text-lg text-gray-400'>
//            <ImGithub className='hover:text-white duration-300 cursor-pointer '/>
//            <FaYoutube className='hover:text-white duration-300 cursor-pointer '/>
//            <FaFacebook className='hover:text-white duration-300 cursor-pointer '/>
//            <FaTwitter className='hover:text-white duration-300 cursor-pointer '/>
//            <FaInstagram className='hover:text-white duration-300 cursor-pointer '/>
//         </div>
//     </div>

//     <div>
//     <h2 className='text-2xl font-semibold text-white my-4'>Locate us</h2>
//       <div className='text-base flex flex-col gap-2 '>
//         <p>Old-Faridabad, Haryana</p>
//         <p>Mobile: 920514353568</p>
//         <p>Phone: 7987 7979077</p>
//         <p>E-mail: shop@gmail.com</p>
//       </div>
//     </div>

//     <div>
        
//     <h2 className='text-2xl font-semibold text-white mt-4'>Profile</h2>

// <div className='flex flex-col lg:flex-row gap-2 text-base'>
// <div>
//     <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
//        <span>
//         <BsPersonFill/>
//        </span>
//        My Account
//        </p>
    
//        <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
//        <span>
//         <BsPaypal/>
//        </span>
//        Checkout
//        </p>
    
    
//        <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
//        <span>
//         <FaHome/>
//        </span>
//        Order tracking
//        </p>
    
//        <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
//        <span>
//         <MdLocationOn/>
//        </span>
//        Help & Support
//        </p>
// </div>
//        <div className='flex flex-col justify-center mt-7'>
//           <input className='bg-transparent border px-4 py-2 text-sm' placeholder='e-mail'
//            type="text" />
//           <button className='text-sm border text-white border-t-0 hover:bg-gray-900
//           active:bg-white active:text-black'>
//           Subscribe
//           </button>
//        </div>

// </div>
// </div>
// <div>

// </div>


// </div>
// </div>
    
//   )
// }

// export default Footer;















import React from 'react';
import newLogo from '../assets/newLogo.png';
import paymentLogo from '../assets/paymentLogo.png';
import { ImGithub } from 'react-icons/im';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsPersonFill, BsPaypal } from 'react-icons/bs';

const Footer = () => {
  return (
    <div className='bg-black text-[#949494] py-10 px-6 md:px-20 font-titleFont'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 py-10'>
        {/* Logo and Social Icons */}
        <div className='flex flex-col items-start gap-6'>
          <img className='w-20 h-20 md:w-[120px] md:h-[85px]' src={newLogo} alt="logoDark" />
          <img className='w-56' src={paymentLogo} alt="paymentLogo" />
          <div className='flex gap-3 text-lg text-gray-400'>
            <ImGithub className='hover:text-white duration-300 cursor-pointer' />
            <FaYoutube className='hover:text-white duration-300 cursor-pointer' />
            <FaFacebook className='hover:text-white duration-300 cursor-pointer' />
            <FaTwitter className='hover:text-white duration-300 cursor-pointer' />
            <FaInstagram className='hover:text-white duration-300 cursor-pointer' />
          </div>
        </div>

        {/* Locate Us Section */}
        <div>
          <h2 className='text-2xl font-semibold text-white my-4'>Locate us</h2>
          <div className='text-base flex flex-col gap-2'>
            <p>Old-Faridabad, Haryana</p>
            <p>Mobile: 920514353568</p>
            <p>Phone: 7987 7979077</p>
            <p>E-mail: shop@gmail.com</p>
          </div>
        </div>

        {/* Profile and Subscription Section */}
        <div className='flex flex-col  gap-2'>

            <h2 className='text-2xl font-semibold text-white my-2'>Profile</h2>
                   <div className='flex fles-row gap-3'>
                   <BsPersonFill />
                     <p className='flex  items-center gap-3 hover:text-white duration-300 cursor-pointer'>
                       My Account
                     </p>
                   </div>
     
                   <div className='flex fles-row gap-3'>
                   <BsPaypal />
                   <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
                       Checkout
                     </p>
                   </div>  
                    
                    <div className='flex fles-row gap-3'>
                    <FaHome />
                    <p className='flex items-center  hover:text-white duration-300 cursor-pointer'>
                       Order tracking
                     </p>
                    </div>
     
                    <div className='flex fles-row gap-3'>
                    <MdLocationOn />
                    <p className='flex items-center gap-3 hover:text-white duration-300 cursor-pointer'>
                       Help & Support
                     </p>
                    </div>
              </div>
                          {/* forth div */}
            <div className='flex flex-col justify-center mt-7'>
                <input
                  className='bg-transparent border px-4 py-2 text-sm'
                  placeholder='e-mail'
                  type="text"
                />
                <button className='text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black'>
                  Subscribe
                </button>
              </div>

            </div>


        </div>

  );
};

export default Footer;
