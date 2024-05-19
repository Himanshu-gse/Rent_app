import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchPropertyWithSellerDetails = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/properties/${id}`
  );
  return data;
};

const fetchFilteredProperties = async (filters) => {
  const validFilters = Object.keys(filters)
    .filter((key) => filters[key] !== '')
    .reduce((obj, key) => {
      obj[key] = filters[key];
      return obj;
    }, {});

  const params = new URLSearchParams(validFilters).toString();
  const { data } = await axios.get(
    `http://localhost:3000/api/properties/filter?${params}`
  );
  return data;
};

const Properties = () => {
  const [sellerDetails, setSellerDetails] = useState({});
  const [revealedSellers, setRevealedSellers] = useState({});

  const handleSellerDetails = async (propertyId) => {
    const data = await fetchPropertyWithSellerDetails(propertyId);
    const seller = data.data.seller;
    setSellerDetails((prevDetails) => ({
      ...prevDetails,
      [propertyId]: seller,
    }));
    setRevealedSellers((prevRevealed) => ({
      ...prevRevealed,
      [propertyId]: true,
    }));
  };

  const [filters, setFilters] = useState({
    minBhk: '',
    minArea: '',
    location: '',
    minBathrooms: '',
    minPrice: '',
    maxPrice: '',
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['filteredProperties', filters],
    queryFn: () => fetchFilteredProperties(filters),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading properties</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev }));
  };

  return (
    <div className='flex items-center'>
      <form
        onSubmit={handleSubmit}
        className='border-2 border-black/10 w-[400px] h-[90vh] p-4'
      >
        <h2 className='text-xl font-bold mb-4'>Filter Properties</h2>
        <div className='mb-4'>
          <label className='block text-Black mb-1'>BHK</label>
          <input
            type='number'
            name='minBhk'
            value={filters.minBhk}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded bg-gray-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black mb-1'>Min Area (sq ft)</label>
          <input
            type='number'
            name='minArea'
            value={filters.minArea}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded bg-gray-200'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-black mb-1'>Location</label>
          <input
            type='text'
            name='location'
            value={filters.location}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded bg-gray-200'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-black mb-1'>Bathrooms</label>
          <input
            type='number'
            name='minBathrooms'
            value={filters.minBathrooms}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded bg-gray-200'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-black py-2 rounded text-white font-semibold'
        >
          Apply Filters
        </button>
      </form>
      <div className='h-[90vh] flex-grow bg-slate-200 p-[3rem] overflow-y-auto grid-cols-3'>
        {!isFetching &&
          data.data.map((property) => (
            <div
              key={property._id}
              className='mb-4 p-4 bg-white rounded shadow flex items-center gap-[200px]'
            >
              <div>
                <p className='text-xl font-bold'>{property.title}</p>
                <p className='text-sm'>{property.description}</p>
                <p className='text-sm'>BHK: {property.bhk}</p>
                <p className='text-sm'>Area: {property.area} sq ft</p>
                <p className='text-sm'>Bathrooms: {property.bathrooms}</p>
                <p className='text-sm'>
                  Hospitals nearby: {property.hospitalsNearby}
                </p>
                <p className='text-sm'>
                  Colleges nearby: {property.collegesNearby}
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='text-xl font-bold'>Seller Details</p>
                <p>Name: {revealedSellers[property._id] ? sellerDetails[property._id]?.name : 'xxxxxxxx'}</p>
                <p>Email: {revealedSellers[property._id] ? sellerDetails[property._id]?.email : 'xxxxxxxx'}</p>
                <p>Phone Number: {revealedSellers[property._id] ? sellerDetails[property._id]?.phoneNumber : 'xxxxxxxx'}</p>
                <button
                  className='bg-red-500 mt-4 text-white rounded-md p-1'
                  onClick={() => handleSellerDetails(property._id)}
                >
                  See Seller Details*
                </button>
              <button
                  className='bg-green-500 mt-4 text-white rounded-md p-1'
                  onClick={() => handleSellerDetails(property._id)}
                >
                  Like
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Properties;
