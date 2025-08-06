import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PopularTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tours')
      .then(res => res.json())
      .then(data => {
        // Filter only tours where category is "Popular"
        const popularTours = data.filter(tour => tour.category === 'popular');
        setTours(popularTours);
      })
      .catch(err => console.error('Error loading tours:', err));
  }, []);

  return (
    <div>
      <section className="pt-16 bg-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
        <p className="text-gray-600 mb-6 md:mb-10">
          Discover thrilling touring sports across the most exciting locations in Bangladesh.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {tours.map(tour => (
            <div key={tour._id} className="shadow rounded-lg overflow-hidden bg-gray-50 text-left">
              <img src={tour.image} alt={tour.title} className="w-full h-60 lg:h-80 object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-xl md:text-2xl">{tour.title}</h3>
                <p className="text-gray-600">{tour.description}</p>
                <p><span className="font-medium">Location:</span> {tour.location}</p>
                <p><span className="font-medium">Date:</span> {tour.date}</p>
                <p><span className="font-medium">Price:</span> {tour.price} BDT</p>
                <Link
                  to={`/tours/${tour._id}`}
                  className="inline-block mt-2 bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularTours;
