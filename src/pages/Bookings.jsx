
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/admin/bookings?email=${user.email}`)
                .then(res => setBookings(res.data))
                .catch(err => console.error("Error fetching admin bookings:", err));
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">
                View Bookings for My Organized Events
            </h2>

            {bookings.length === 0 ? (
                <p className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead className="bg-yellow-500 text-white">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Tour Title</th>
                                <th className="border px-4 py-2">Booked By</th>
                                <th className="border px-4 py-2">Tickets</th>
                                <th className="border px-4 py-2">Total Price (BDT)</th>
                                <th className="border px-4 py-2">Booking Date</th>
                                <th className="border px-4 py-2">Transaction ID</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{booking.tourTitle}</td>
                                    <td className="border px-4 py-2">{booking.bookedBy}</td>
                                    <td className="border px-4 py-2">{booking.quantity}</td>
                                    <td className="border px-4 py-2">{booking.totalPrice}</td>
                                    <td className="border px-4 py-2">{new Date(booking.bookingdate).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{booking.transactionId}</td>
                                    <td className="border px-4 py-2">{booking.paymentStatus === "cancel" ? (
                                        <span className="text-red-500 font-semibold">Cancel</span>
                                    ) : (
                                        <span className="text-green-600 font-semibold">Paid</span>
                                    )}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Bookings;
