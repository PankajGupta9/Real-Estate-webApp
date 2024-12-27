import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] =useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await axios.get(`/api/user/${listing.userRef}`, {
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        setLandlord(res.data); // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching landlord:", error.response?.data || error.message);
      }
    };

    if (listing.userRef && currentUser?.token) {
      fetchLandlord();
    }
  }, [listing.userRef, currentUser?.token]); // Add token as a dependency

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>Contact <span className='font-semibold gap-2'>
          {landlord.username}</span> for
            <span className='font-semibold mx-2'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea 
          name='message' 
          id='message' 
          rows='2' 
          value={message}
          onChange={onChange}
          placeholder='Enter Your message here...'
          className='w-full border p-3 rounded-lg '
          >
          </textarea>
          <Link 
          to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-85'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
