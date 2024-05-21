import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Login = () => {
  const queryClient = useQueryClient();
  const [loggedIn, setIsLoggedIn] = useOutletContext();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (formData) => {
      return axios.post('https://rent-app-be.vercel.app/api/users/login', formData, {
        withCredentials: true, // Ensure credentials are included
      });
    },
    onSuccess: (response) => {
      // Extract data from the response
      const userData = response.data.data;
      // const token = response.data.token; // Assuming token is in response.data.token

      // Store token in localStorage
      // localStorage.setItem('authToken', token);

      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User logged in successfully');
  
      // Redirect based on role
      if (userData.role === 'buyer') {
        navigate('/properties');
      } else if (userData.role === 'seller') {
        navigate('/sellerpage');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Login failed');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutateAsync(formData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <form
        className='bg-gray-200 w-[30rem] h-[19rem] mt-10 rounded-md p-6'
        onSubmit={handleSubmit}
      >
        <h2 className='text-3xl mb-4'>Log In</h2>
        <div className='flex items-center justify-between gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='email' className='text-lg font-semibold'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex items-center justify-between gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='password' className='text-lg font-semibold'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        
        <button
          type='submit'
          className='bg-black rounded-md px-5 py-2 text-white font-semibold disabled:bg-slate-500'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default Login;
