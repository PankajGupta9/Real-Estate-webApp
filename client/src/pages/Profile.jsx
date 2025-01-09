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
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Toggle state

  // Initialize state with currentUser data
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser?.rest?.username || '');
      setEmail(currentUser?.rest?.email || '');
      setPreviewImage(currentUser?.rest?.avatar || '');
      setAvatarUrl(currentUser?.rest?.avatar || '');
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
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/update/${currentUser?.rest?._id}`, userUpdateData, {
        headers: { Authorization: `Bearer ${currentUser?.token}` },
      });
      dispatch(updateUserSuccess(res.data));
      toast.success("Profile updated successfully!", { theme: "dark" });
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      toast.error("Failed to update profile.", { theme: "dark" });
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));    
    }
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
  
    if (!confirmDelete) {
      return; // Exit if the user cancels
    }
  
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${currentUser?.rest?._id}`,
        {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      dispatch(deleteUserSuccess(res.data));
      toast.success("Your account has been successfully deleted.", { theme: "dark" });
    } catch (error) {
      dispatch(
        deleteUserFailure(
          error.response ? error.response.data.message : error.message
        )
      );
      toast.error("Failed to delete your account. Please try again.", { theme: "dark" });
    }
  };
  
  return (
    <div className="p-3 max-w-lg mx-auto bg-white rounded-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      {isEditing ? (
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
  <div className="flex flex-col items-center gap-4">
    <img
      src={previewImage || "https://via.placeholder.com/150"}
      alt="profile"
      className="rounded-full h-32 w-32 object-cover border-4 border-blue-500"
    />
    <div className="text-center">
      <label className="block text-gray-500 text-sm font-medium">Username</label>
      <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
    </div>
    <div className="text-center">
      <label className="block text-gray-500 text-sm font-medium">Email</label>
      <p className="text-gray-600">{email}</p>
    </div>
  </div>

  <div className="mt-6 space-y-4">
    <button
      onClick={() => setIsEditing(true)}
      className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
    >
      Edit Profile
    </button>
    <button
      onClick={handleDeleteUser}
      className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
    >
      Delete Account
    </button>
    <button
      onClick={handleLogout}
      className="w-full bg-gray-500 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
    >
      Log Out
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default Profile;
