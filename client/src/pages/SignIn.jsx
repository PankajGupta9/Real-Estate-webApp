import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import sign from '../assets/sign.png';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-2xl max-w-4xl w-full p-6">

        <div className='w-full lg:w-2/5 h-full mb-6 lg:mb-0'>
        <img src={sign} alt="sign-in-image" className="w-full h-full object-cover rounded-xl" />
        </div>

        <div className="w-full lg:w-3/5 p-6">
          <h1 className="text-3xl text-slate-700  text-center font-bold my-7">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-blue-700">Sign Up</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
