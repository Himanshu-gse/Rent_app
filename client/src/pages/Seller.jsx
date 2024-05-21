import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Seller = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    bhk: '',
    bathrooms: '',
    area: '',
    hospitalsNearby: '',
    collegesNearby: '',
    nearby: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to get the token, this is just a placeholder
  const getToken = () => {
    // Replace this with your actual logic to get the token
    return localStorage.getItem('authToken');
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (formData) => {
      const token = getToken();
      return axios.post('https://rent-app-be.vercel.app/api/properties/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming a Bearer token, adjust as needed
        },
      });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'An error occurred');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await mutateAsync(formData);
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div className='flex items-center justify-center h-[90vh]'>
      <form
        className='bg-gray-200 w-[30rem] h-[40rem] mt-10 rounded-md p-6'
        onSubmit={handleSubmit}
      >
        <h2 className='text-3xl font-bold from-neutral-900 mb-4'>Property For Sale</h2>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='title' className='text-lg font-semibold'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='description' className='text-lg font-semibold'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='location' className='text-lg font-semibold'>Location</label>
          <input
            type='text'
            name='location'
            id='location'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='price' className='text-lg font-semibold'>Price</label>
          <input
            type='number'
            name='price'
            id='price'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            required
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='bhk' className='text-lg font-semibold'>BHK</label>
          <input
            type='number'
            name='bhk'
            id='bhk'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.bhk}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='bathrooms' className='text-lg font-semibold'>Bathrooms</label>
          <input
            type='number'
            name='bathrooms'
            id='bathrooms'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='area' className='text-lg font-semibold'>Area</label>
          <input
            type='text'
            name='area'
            id='area'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.area}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='hospitalsNearby' className='text-lg font-semibold'>Hospitals Nearby</label>
          <input
            type='text'
            name='hospitalsNearby'
            id='hospitalsNearby'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.hospitalsNearby}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='collegesNearby' className='text-lg font-semibold'>Colleges Nearby</label>
          <input
            type='text'
            name='collegesNearby'
            id='collegesNearby'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.collegesNearby}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex items-center justify-between rounded-md mb-4'>
          <label htmlFor='nearby' className='text-lg font-semibold'>Nearby</label>
          <input
            type='text'
            name='nearby'
            id='nearby'
            className='h-[30px] bg-white rounded-sm px-14 focus:outline-none'
            value={formData.nearby}
            onChange={handleInputChange}
          />
        </div>
        
        <button
          type='submit'
          className='bg-black rounded-md px-5 py-2 text-white font-semibold disabled:bg-slate-500'
          disabled={isLoading}
        >
          Create 
        </button>
      </form>
    </div>
  );
};

export default Seller;
