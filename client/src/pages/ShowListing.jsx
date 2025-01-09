import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ShowListing = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const [showListingsError, setShowListingsError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // Fetch listings when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/listings/${currentUser?.rest._id}`,
          {
            headers: { Authorization: `Bearer ${currentUser?.token}` },
          }
        );
        setListings(res.data);
      } catch (error) {
        setShowListingsError(true);
        console.error("Error fetching listings:", error);
      }
    };

    if (currentUser?.rest._id) {
      fetchListings();
    }
  }, [currentUser]);

  // Handle listing deletion
  const handleListingDelete = async (listingId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/listing/delete/${listingId}`, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      setListings((prev) => prev.filter((listing) => listing._id !== listingId));
      alert("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting listing:", error.message);
    }
  };

  const handleEdit = (listingId) => {
    navigate(`/update-listing/${listingId}`);
  };

  return (
    <div className="p-6 bg-gray-50 m-auto">
      {showListingsError && (
        <p className="text-red-600 text-center mb-4">
          Error fetching listings! Please try again.
        </p>
      )}

      <h2 className="text-2xl font-bold text-blue-800 mb-4">Manage Listings</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 border-b">
              <th className="p-3 font-semibold text-gray-700">Image</th>
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Type</th>
              <th className="p-3 font-semibold text-gray-700">Bedrooms</th>
              <th className="p-3 font-semibold text-gray-700">Bathrooms</th>
              <th className="p-3 font-semibold text-gray-700">Price</th>
              <th className="p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing._id} className="hover:bg-blue-50 border-b">
                <td className="p-3">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-3 truncate">{listing.name}</td>
                <td className="p-3">{listing.type}</td>
                <td className="p-3">{listing.bedrooms}</td>
                <td className="p-3">{listing.bathrooms}</td>
                <td className="p-3 font-medium">${listing.regularPrice}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(listing._id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listings.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No listings available.</p>
        )}
      </div>
    </div>
  );
};

export default ShowListing;
