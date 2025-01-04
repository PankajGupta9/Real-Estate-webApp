// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/bundle';
// import { Navigation } from 'swiper/modules';
// import SwiperCore from 'swiper';
// import ListingItem from '../components/ListingItem';
// import banner from '../assets/banner.avif'

// const Home = () => {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   SwiperCore.use([Navigation]);
//   console.log(saleListings);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const offerRes = await fetch('/api/listing/get?offer=true&limit=4');
//         const offerData = await offerRes.json();
//         console.log('Offer Data:', offerData);
//         setOfferListings(offerData);

//         const rentRes = await fetch('/api/listing/get?type=rent&limit=4');
//         const rentData = await rentRes.json();
//         setRentListings(rentData);

//         const saleRes = await fetch('/api/listing/get?type=sale&limit=4');
//         const saleData = await saleRes.json();
//         setSaleListings(saleData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* Top Section */}
//       <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
//       <img src={banner} alt=""  className='absolute top-0 left-0 w-full h-full  object-cover'/>
//         <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
//           Find your next <span className="text-slate-500">perfect</span>
//           <br />
//           place with ease
//         </h1>
//         <div className="text-gray-400 text-xs sm:text-sm">
//           Pankaj Estate is the best place to find your next perfect place to live.
//           <br />
//           We have a wide range of properties for you to choose from.
//         </div>
//         <Link to={'/search'} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
//           Let's get started...
//         </Link>
//       </div>

//       {/* Swiper Section */}
//       <Swiper navigation>
//         {offerListings &&
//           offerListings.length > 0 &&
//           offerListings.map((listing) => (
//             <SwiperSlide key={listing._id}>
//               <div
//                 style={{
//                   background: `url(${listing.imageUrls[0]}) center no-repeat`,
//                   backgroundSize: 'cover',
//                 }}
//                 className="h-[500px]"
//               ></div>
//             </SwiperSlide>
//           ))}
//       </Swiper>

//       {/* Listing Results for Sale, Rent, Offer */}
//       <div  className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
//         {offerListings && offerListings.length > 0 && (
//           <div>
//           <div className='my-3'>
//             <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
//             <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}> 
//               Show more Offers
//             </Link>
//           </div>
//           <div className='flex flex-wrap gap-4'>
//             {
//               offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id}/>
//               ))
//             }
//           </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div>
//           <div className='my-3'>
//             <h2 className='text-2xl font-semibold text-slate-600'>These Places are available for Rent</h2>
//             <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}> 
//               Show more rented places
//             </Link>
//           </div>
//           <div className='flex flex-wrap gap-4'>
//             {
//               rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id}/>
//               ))
//             }
//           </div>
            
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div>
//           <div className='my-3'>
//             <h2 className='text-2xl font-semibold text-slate-600'>These places are available for sale</h2>
//             <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}> 
//               Show more selling properties
//             </Link>
//           </div>
//           <div className='flex flex-wrap gap-4'>
//             {
//               saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id}/>
//               ))
//             }
//           </div>
            
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;









import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';
import banner from '../assets/banner.avif';
import { IoArrowForwardOutline } from "react-icons/io5";
import {FaSearch} from 'react-icons/fa'



const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const {currentUser} = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offerRes = await fetch('/api/listing/get?offer=true&limit=4');
        const offerData = await offerRes.json();
        setOfferListings(offerData);

        const rentRes = await fetch('/api/listing/get?type=rent&limit=4');
        const rentData = await rentRes.json();
        setRentListings(rentData);

        const saleRes = await fetch('/api/listing/get?type=sale&limit=4');
        const saleData = await saleRes.json();
        setSaleListings(saleData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);




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


  return (
    <div className=''>
      {/* Banner Section */}
      <div className="relative h-[700px] w-full">
        {/* Background Image */}
        <img
          src={banner}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Find your next <span className="text-blue-400 hover:text-blue-300">perfect</span> place
          </h1>
          <p className="text-lg lg:text-xl max-w-2xl mb-6">
          We are a real estate agency that will help you find the best residence you dream of, 
                               let’s discuss for your dream house?
          </p>
          <Link
            to={'/search'}
            className="flex items-center  px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-700"
          >
            Let's Get Started
            <IoArrowForwardOutline className="w-[30px] h-[30px" />
            </Link>

            <form
                 onSubmit={handleSubmit}
                 className="bg-white p-3 w-full max-w-4xl h-16 my-10 rounded-lg flex items-center">
                 <input
                   type="text"
                   placeholder="Search..."
                   className="flex-grow bg-transparent text-blue-900  rounded-l-lg focus:outline-none px-4 py-2"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <button
                   type="submit"
                   className="bg-transparent text-blue-600 py-4 h-10 w-10 rounded-r-lg hover:text-slate-700">
                   <FaSearch />
                 </button>
             </form>
        </div>
      </div>

      {/* Swiper Section */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper> */}

      {/* Listing Results Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
      <h4 className='text-2xl lg:text-4xl text-slate-950 font-bold text-center my-7'>Recommended For You</h4>

        {rentListings && rentListings.length > 0 && (
          <div className='mb-10 lg:mb-20'>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-900">
               Properties For Rent
              </h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=rent'}>
                Show More Rented Places
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className='mb-10 lg:mb-20'>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-900">
                Properties For Sale
              </h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=sale'}>
                Show More Selling Properties
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {offerListings && offerListings.length > 0 && (
          <div className='mb-10 lg:mb-20'>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-900">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'}>
                Show More Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.slice(0, 3).map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default Home
