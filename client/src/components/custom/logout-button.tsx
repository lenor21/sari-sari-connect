import { useDispatch } from 'react-redux'; // Keep these imports
import { useNavigate } from 'react-router';
import { clearCredentials } from '@/features/auth/authSlice';
import { useLogoutMutation } from '@/features/auth/usersApiSlice';
import Swal from 'sweetalert2';

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isLoading }]: any = useLogoutMutation(); // eslint.config.js for activation any type

  const logOutHandler = async () => {
    try {
      Swal.fire({
        color: '#0a0a0a',
        title: 'Are you sure you want to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0a0a0a',
        cancelButtonColor: '#ddd',
        confirmButtonText: 'Logout',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            color: '#0a0a0a',
            title: 'Logout!',
            text: 'Your account has been logged out.',
            icon: 'success',
            confirmButtonColor: '#0a0a0a',
          });

          await logout().unwrap();
          dispatch(clearCredentials());
          navigate('/sign-in');
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={logOutHandler}
      disabled={isLoading}
      className='w-full text-left'>
      Sign Out
    </button>
  );
};

export default LogOutButton;
