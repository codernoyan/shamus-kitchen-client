import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Service = ({ service }) => {
  const { _id, name, imageUrl, price, ratings, description } = service;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/services/${_id}`);
  }

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
      {/* <img
        src={imageUrl}
        className="object-cover w-full h-64"
        alt=""
      /> */}
      <PhotoProvider>
      <PhotoView src={imageUrl}>
      <img
        src={imageUrl}
        className="object-cover w-full h-64 cursor-pointer"
        alt=""
      />
      </PhotoView>
    </PhotoProvider>
      <div className="p-5 border border-t-0">
        <h2
          className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
        >
          {name}
        </h2>
        <p className="mb-2 text-gray-700 text-sm text-justify">
          {description.slice(0, 100)}...
        </p>

        <div className="my-2">
          <p className="text-xl font-semibold text-gray-700">Price: <span className="text-orange-500 font-bold">{price}$</span></p>
          <p className="text-xl font-medium text-gray-700">Ratings: {ratings}</p>
        </div>

        <button onClick={handleNavigate} className="w-full bg-orange-500 text-white py-2 px-2 font-semibold rounded-md hover:bg-orange-600">
          Details
        </button>
      </div>
    </div>
  );
};

export default Service;