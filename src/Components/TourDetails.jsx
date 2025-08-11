
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TourDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [tour, setTour] = useState(null);
    const [isAdmin] = useAdmin();


    useEffect(() => {
        if (!id) return;

        axiosSecure
            .get(`/tours/${id}`)
            .then(res => setTour(res.data))
            .catch(err => {
                console.error("Error loading tour:", err);
                setTour(null);
            });
    }, [id, axiosSecure]);

    if (!tour) return <p className="p-6 text-center">Loading tour details...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                <div>
                    <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-80 object-cover rounded-lg shadow"
                    />
                </div>


                <div>
                    <h2 className="text-3xl font-bold mb-2">{tour.title}</h2>
                    <p className="text-gray-700 mb-4">{tour.description}</p>
                    <div className="space-y-2 text-lg mb-6">
                        <p><strong>Location:</strong> {tour.location}</p>
                        <p><strong>Date:</strong> {tour.date}</p>
                        <p><strong>Price:</strong> {tour.price} BDT</p>
                        <p><strong>Organizer:</strong> {tour.organizer}</p>
                        <p><strong>Available Tickets:</strong> {tour.ticketQuantity}</p>
                        <p><strong>Category:</strong> {tour.category}</p>
                    </div>
                    {/* <Link to={`/bookticket/${tour._id}`}><button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded">
                        Book Now
                    </button></Link> */}
                    {
                    isAdmin ? 
                        <button
                            disabled
                            className="bg-gray-400 text-white font-semibold px-4 py-2 rounded cursor-not-allowed"
                            title="Admins cannot book tickets"
                        >
                            Admins cannot book tickets
                        </button>
                    : 
                        <Link to={`/bookticket/${tour._id}`}>
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded">
                                Book Now
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default TourDetails;