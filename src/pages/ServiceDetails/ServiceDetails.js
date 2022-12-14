import { Textarea } from 'flowbite-react';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../Hooks/useTitle';
import Reviews from '../Reviews/Reviews';

const ServiceDetails = () => {
  const details = useLoaderData();
  const { _id, name, imageUrl, price, ratings, description } = details.data;
  // console.log(details.data);

  const { user } = useContext(AuthContext);
  const location = useLocation();

  // update page title
  useTitle('Food Service Details');

  // post review
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const customerReview = {
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorImage: user?.photoURL,
      serviceId: _id,
      reviewText: form.reviewText.value,
      postedOn: new Date()
    }

    fetch('https://cloud-kitchen-assignment-server.vercel.app/reviews', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(customerReview)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        form.reset();
        toast.success('Posted');
      })
  }
  return (
    <div>
      {/* details start */}
      <div className="text-center mt-4">
        <h1 className="text-4xl font-semibold">{name} Details</h1>
      </div>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8">
        <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2">
            <img src={imageUrl}
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <h5 className="mb-3 text-2xl font-extrabold leading-none sm:text-2xl">
              Dish Name: {name}
            </h5>
            <p className="mb-5 text-gray-800 text-justify">
              {description}
            </p>
            <h4 className="text-2xl font-bold">Price: <span className="text-orange-500">{price}$</span></h4>
            <h4 className="text-2xl font-bold">Average Ratings: <span className="text-orange-500">{ratings}</span></h4>
          </div>
        </div>
      </div>
      {/* details end */}

      <div className="text-center mt-4">
        <h1 className="text-4xl font-semibold">Customer <span className="text-orange-500 font-bold">Reviews</span></h1>
      </div>
      {/* all reviews */}
      <div className="w-3/4 mx-auto">
        <h2 className="text-2xl font-semibold">All <span className="text-orange-500 font-bold">Reviews:</span></h2>
      </div>
      <hr className="my-4" />
      <div className="w-full p-2 lg:p-0 lg:w-3/4 mx-auto">
        <Reviews id={_id}></Reviews>
      </div>
      {/* review section start */}
      <hr className="mt-4" />
      {
        user?.uid ?
          <>
            <div className="w-3/4 mx-auto">
              <h2 className="text-2xl font-semibold">Post a <span className="text-orange-500 font-bold">Review:</span></h2>
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 my-3">
                <div>
                  <Textarea
                    name="reviewText"
                    placeholder="Leave a review text..."
                    required={true}
                    rows={4}
                  />
                </div>
                <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md" type="submit">
                  Post
                </button>
              </form>
            </div>
          </>
          :
          <>
            <h2 className="text-2xl font-semibold text-center my-2">Please <span className="text-orange-500 font-bold"><Link to="/login" state={{ from: location }}>Login</Link></span> to post review</h2>
          </>
      }
    </div>
  );
};

export default ServiceDetails;