import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import OAuth from '../components/OAuth';
import sign from '../assets/sign.png';


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
     setFormData({
      ...formData,
      [e.target.id]: e.target.value,
     });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if(data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);  
      setError(null);
      navigate('/sign-in');
    } catch (error) {
       setLoading(false);
       setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col lg:flex-row items-center bg-white rounded-2xl max-w-4xl w-full p-6">

        <div className='w-full lg:w-2/5 h-full mb-6 lg:mb-0'>
        <img src={sign} alt="signUp-in-image" className="w-full h-full object-cover rounded-xl" />
        </div>

        <div className="w-full lg:w-3/5 p-6">
          <h1 className="text-3xl text-slate-700 text-center font-bold my-7">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
              type="username"
              placeholder="username"
              className="border p-3 rounded-lg"
              id="username"
              onChange={handleChange}
            />
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
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-700">Sign In</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default SignUp
