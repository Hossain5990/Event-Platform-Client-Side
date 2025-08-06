import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:5000/tours")
      .then((res) => res.json())
      .then((data) => setTours(data));
  }, [refreshKey]); 

  
    useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey(prev => prev + 1);
    }
  }, [location.state]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={tour.image}
              alt={tour.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
              <p className="text-gray-600 mb-2 text-sm flex-grow">
                {tour.description.length > 80
                  ? tour.description.slice(0, 80) + "..."
                  : tour.description}
              </p>
              <div className="text-sm text-gray-700 mb-2">
                <p><strong>Location:</strong> {tour.location}</p>
                <p><strong>Date:</strong> {tour.date}</p>
                <p><strong>Tickets:</strong> {tour.ticketQuantity}</p>
                <p><strong>Price:</strong> {tour.price} BDT</p>
              </div>

              {tour.ticketQuantity <= 0 ? (
                <button className="bg-gray-400 text-white font-semibold py-2 text-center rounded cursor-not-allowed" disabled>
                  Sold Out
                </button>
              ) : (
                <Link
                  to={`/tours/${tour._id}`}
                  className="mt-2 bg-yellow-500 text-black font-semibold py-2 text-center rounded hover:bg-yellow-600"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTours;
