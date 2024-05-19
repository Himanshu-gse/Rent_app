import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const SignUp = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'buyer', // Initialize role state with 'buyer'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (formData) =>
      axios.post('http://localhost:3000/api/users/signup', formData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User signed up successfully');
    },
  }); // Define mutation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutateAsync(formData); // Call mutation with form data
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login Please');
      // Optionally handle error response from server
    }
  };

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <form
        className='bg-gray-200 w-[30rem] h-[40rem]  mt-10 rounded-md p-6'
        onSubmit={handleSubmit}
      >
        <h2 className='text-3xl font-bold from-neutral-900 mb-4'>Sign Up</h2>
        <div className='flex items-center justify-between gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='firstName' className='text-lg font-semibold'>
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='lastName' className='text-lg font-semibold'>
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
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
          <label htmlFor='phoneNumber' className='text-lg font-semibold'>
            Phone Number
          </label>
          <input
            type='tel'
            name='phoneNumber'
            id='phoneNumber'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.phoneNumber}
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
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between gap-4 rounded-md py-4 mb-4'>
          <label htmlFor='role' className='text-lg font-semibold'>
            Role
          </label>
          <select
            name='role'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            id='role'
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value='buyer'>Buyer</option>
            <option value='seller'>Seller</option>
          </select>
        </div>
        <button
          type='submit'
          className='bg-black rounded-md px-5 py-2 text-white font-semibold disabled:bg-slate-500'
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
