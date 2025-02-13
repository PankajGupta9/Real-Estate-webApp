import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
    const handleGoogleClick = async () => {
        try{
          const provider = new GoogleAuthProvider()
          const auth = getAuth(app)

          const  result = await signInWithPopup(auth, provider)

          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
              name: result.user.displayName, 
              email: result.user.email, 
              photo: result.user.photoURL
            }),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
          navigate('/');
        }catch (error){
            console.log('could not sign in with google', error);
        }
    }
    // make sure you have atlaeat two gmail account then you can see google pop up interface if you onlu one then you can not see that
  return (
    <button 
    onClick={handleGoogleClick}
    type='button' 
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      Continue with google
    </button>
  )
}

export default OAuth
