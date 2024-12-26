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











import React, { useState,useRef } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
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

























































