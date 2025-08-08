import { useEffect, useState } from "react";
// import useAxiosSecure from "../hooks/useAxiosSecure"; 
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Bookings = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosSecure.get(`/admin/bookings?email=${user?.email}`);
                setBookings(res.data);
            } catch (error) {
                console.error("Error fetching admin bookings:", error);
            }
        };

        if (user?.email) {
            fetchBookings();
        }
    }, [user, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">View Bookings for My Organized Events</h2>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full  border-collapse border">
                        <thead className="bg-yellow-500 text-white">
                            <tr>
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Tour Title</th>
                                <th className="border px-4 py-2">Booked By</th>
                                <th className="border px-4 py-2">Tickets</th>
                                <th className="border px-4 py-2">Total Price (BDT)</th>
                                <th className="border px-4 py-2">Transaction ID</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{booking.tourTitle}</td>
                                    <td className="border px-4 py-2">{booking.bookedBy}</td>
                                    <td className="border px-4 py-2">{booking.quantity}</td>
                                    <td className="border px-4 py-2">{booking.totalPrice}</td>
                                    <td className="border px-4 py-2">{booking.transactionId || "N/A"}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${booking.paymentStatus === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : booking.paymentStatus.includes("cancel")
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {booking.paymentStatus}
                                        </span>
                                    </td>

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
