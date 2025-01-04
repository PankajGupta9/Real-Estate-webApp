import React from 'react';
import { Link } from 'react-router-dom';
import {MdLocationOn} from 'react-icons/md';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
  

const ListingItem = ({listing}) => {
  return (
<div className="bg-white border border-gray-500 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
<Link to={`/listing/${listing._id}`}>
       <img 
         src={listing.imageUrls[0]} 
         alt='listing cover' 
         className=' h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'   
         />
         <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600 truncate w-full'>
                    {listing.address}
                </p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2 '>
            {listing.description}
            </p>
            <span className='border-b border-gray-300 my-3'></span>
            <div className='flex justify-between'>
            <ul className='text-slate-600 font-semibold text-sm flex flex-wrap items-center sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `Beds ${listing.bedrooms}`
                  : `Bed ${listing.bedrooms}`}
              </li>
              <li className='flex items-center gap-1  whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `Baths ${listing.bathrooms}`
                  : `Bath ${listing.bathrooms}`}
              </li>
             </ul> 

             <p className='text-red-700 mt-2 font-semibold'>
            $
            {listing.offer ? listing.discountPrice.
              toLocaleString('en-US') : listing.regularPrice.
              toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>


            </div>



         </div>
      </Link>
    </div>
  )
}

export default ListingItem
