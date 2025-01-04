import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";
import { useRef, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { 
  updateUserStart, 
  updateUserFailure, 
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,

} from '../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listings, setListings] = useState([]);
  const [showListings, setShowListings] = useState(false);




  // Initialize state with currentUser data
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser?.rest.username || '');
      setEmail(currentUser?.rest?.email || '');
      setPreviewImage(currentUser?.rest.avatar || '');
      setAvatarUrl(currentUser?.rest.avatar || '');
    }
  }, [currentUser]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type!", { theme: "dark" });
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const uploadPreset = "IBM_Project";
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      toast.info("Uploading image, please wait...", { theme: "dark" });
      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedFileUrl = res.data.secure_url;

      setAvatarUrl(uploadedFileUrl);
      setPreviewImage(uploadedFileUrl);

      toast.success("File uploaded successfully!", { theme: "dark" });
    } catch (error) {
      toast.error("File upload failed. Please try again.", { theme: "dark" });
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userUpdateData = {
      username,
      email,
      avatar: avatarUrl,
      ...(password && { password }), // Add password only if provided
    };

    try {
      dispatch(updateUserStart());
      const res = await axios.put(`/api/user/update/${currentUser?.rest?._id}`, userUpdateData, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
        
      });
      dispatch(updateUserSuccess(res.data));
      setUpdateSuccess(true)
      toast.success("Profile updated successfully!", { theme: "dark" });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Failed to update profile.", { theme: "dark" });
    }
  };


  const userId = currentUser?.rest._id; // Replace 'currentUser.id' with how you're getting the user's ID
  // console.log('User ID:', userId); // Check if this outputs the correct ID

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
  
      const res = await axios.delete(`/api/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        },
      });
  
      const data = res.data; // Axios stores the response data in 'data'
  
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
  
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(
        error.response ? error.response.data.message : error.message
      ));
    }
  };
  

  //this way code suggestion by chatGPT and bhai
  // const handleLogout = () => {
  //   localStorage.clear();
  //   toast.info("Logged out successfully!", { theme: "dark" });
  //   window.location.href = "/login";    
  // };

   
  const handleLogout = async () => {
    try{
  dispatch(signOutUserStart());
  const res = await  fetch('/api/auth/signout');
  const data = await res.json();
  if(data.success === false){
    dispatch(signOutUserFailure(data.message));
    return;
  }
  dispatch(signOutUserSuccess(data));
  }catch(error){
    dispatch(signOutUserFailure(data.message));    
  }
}



const fetchListings = async () => {
  try {
    const res = await axios.get(`/api/user/listings/${currentUser?.rest._id}`, {
      headers: { Authorization: `Bearer ${currentUser?.token}` },
    });
    setListings(res.data);
    setShowListings(true);
  } catch (error) {
    setShowListingsError(true);
    alert("Failed to fetch listings. Please try again.");
  }
};



const handleListingDelete = async (listingId) => {
  try{
   const res = await axios.delete(`/api/listing/delete/${listingId}`,{
    headers: { Authorization: `Bearer ${currentUser?.token}` },
   });
   setListings((prev) => prev.filter((listing) => listing._id !== listingId));
  }catch(error){
    console.log(error.message  )
  }
}


  return (
      <div className="p-3 max-w-lg mx-auto bg-white rounded-lg mx-15  overflow-y-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={previewImage || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
          >
            Update
          </button>

          <Link
            className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
            to={"/create-listing"}
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleLogout} className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p>{updateSuccess ? "User is updated successfully!" : ""}</p>
        <button
          onClick={fetchListings}
          className="p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-75 w-full"
        >
          Show Listings
        </button>
        <p className="text-red-700 mt-5">
          {showListingsError ? "Error to showing listing !" : ""}
        </p>

        {showListings && (
          <div className="flex flex-col gap-4">
            <h2 className="text-center mt-7 text-2xl font-semibold">
              Listings
            </h2>
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="border  p-3 rounded-lg flex justify-between items-center gap-8"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col items-center ">
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase hover:opacity-85"
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase hover:opacity-85">
                      Edit
                    </button>
                  </Link>
                </div>

                {/* <p>{listing.description}</p> */}
                {/* <p>Type: {listing.type}</p>
          <p>Bedrooms: {listing.bedrooms}</p>
          <p>Bathrooms: {listing.bathrooms}</p>
          <p>Price: ${listing.regularPrice}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
  );
};


export default Profile;











