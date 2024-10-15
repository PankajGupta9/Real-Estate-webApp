import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Practice = () => {
 const [formData, setFormData] = useState({});
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
       [e.target.id]: e.target.value,
    })
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch('api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JOSN.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/sgin-in');
    }catch(error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
<div className='max-w-lg mx-auto'>
  <h1 className='text-center font=semibold my-5'>pracrice sign up</h1>
  <form className='flex flex-col gap-3'>
    <input type="text" placeholder='username' id='username' className='border rounded-lg p-3'/>
    <input type="email" placeholder='email' id='email' className='border rounded-lg p-3'/>
    <input type="password" placeholder='password' id='password' className='border rounded-lg p-3'/>
    <button className='bg-slate-700 text-white border rounded-lg p-3'>Sign Up</button>
  </form>
  <div className='flex gap-3 mt-5'>
    <p>You have account ?</p>
    <Link>
      <span className='text-blue-700'>Sign In</span>
    </Link>
  </div>
</div>    
  )
}

export default Practice
