

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";
import { useRef, useState, useEffect } from 'react';
import { 
  updateUserStart, 
  updateUserFailure, 
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,

} from '../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

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
      const res = await axios.put(`http://localhost:3000/api/user/update/${currentUser?.rest?._id}`, userUpdateData, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
        
      });
      // console.log(res);
      dispatch(updateUserSuccess(res.data));
      toast.success("Profile updated successfully!", { theme: "dark" });
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.error("Update Error:", error);
      toast.error("Failed to update profile.", { theme: "dark" });
    }
  };
  const userId = currentUser._id; // Replace 'currentUser.id' with how you're getting the user's ID
  // console.log('User ID:', userId); // Check if this outputs the correct ID

  const handleDeleteUser = async () => {
    try{
     dispatch(deleteUserStart());
     const res = await fetch(`http://localhost:3000/api/user/delete/${userId}`,{
      method: 'DELETE',

    });
     const data = await res.json();
     if(data.success === false){
      dispatch(deleteUserFailure(data.message));
      return;
     }
     dispatch(deleteUserSuccess(data))
    }catch(error){
     dispatch(deleteUserFailure(error.message));
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully!", { theme: "dark" });
    window.location.href = "/login";
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto">
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
          src={previewImage || 'https://via.placeholder.com/150'}
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
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
        >
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleLogout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};


export default Profile;

