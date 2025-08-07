
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51RtNMZQK2yqXqqAkTpN5GQtPReERO8uGeFgp4yDGApcrhcpuA50zechsAFF9wdIw6Fe9FKCX1SeOnO1aqGtJo6rG00VzGNmuGO");

const BookTickets = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [tour, setTour] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", quantity: 1 });
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/tours/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTour(data);
                if (user) {
                    setForm((prev) => ({
                        ...prev,
                        name: user.displayName || "",
                        email: user.email || "",
                    }));
                }
            });
    }, [id, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookingStart = async (e) => {
        e.preventDefault();
        const requestedQty = parseInt(form.quantity);
        const availableQty = parseInt(tour.ticketQuantity);

        if (requestedQty > availableQty) {
            Swal.fire({
                icon: "error",
                title: "Not Enough Tickets!",
                text: `Only ${availableQty} tickets left.`,
            });
            return;
        }

        // Check if user already booked
        const checkRes = await fetch(`http://localhost:5000/bookTickets/check?email=${form.email}&tourId=${tour._id}`);
        const checkData = await checkRes.json();

        if (checkData.exists) {
            Swal.fire({
                icon: "warning",
                title: "Already Booked!",
                text: "You’ve already booked this tour.",
                confirmButtonText: "Go to All Tours",
            }).then(() => navigate("/alltours"));
            return;
        }

        // Prepare booking data for payment
        const totalPrice = requestedQty * parseInt(tour.price);
        const booking = {
            ...form,
            tourId: tour._id,
            image: tour.image,
            tourTitle: tour.title,
            location: tour.location,
            totalPrice, 
            quantity: requestedQty,
            tourDate: tour.date,
            bookingDate: new Date().toISOString(),
            organizerEmail: tour.organizerEmail,
            
        };

        setBookingData(booking);
    };

    if (!tour) return <p className="text-center p-10">Loading tour info...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-8 rounded">
            <h2 className="text-5xl text-yellow-500 font-bold mb-4 text-center">Book Tour</h2>
            <h2 className="text-2xl font-bold mb-4 text-center">{tour.title}</h2>

            {!bookingData ? (
                <form onSubmit={handleBookingStart} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        readOnly
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        readOnly
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={form.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <p className="text-lg font-medium">
                        Total Price: {form.quantity * tour.price} BDT
                    </p>
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 text-xl rounded"
                    >
                        Proceed to Payment
                    </button>
                </form>
            ) : (
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        bookingData={bookingData}
                        tourId={tour._id}
                        onSuccess={() => navigate("/alltours", { state: { refresh: true } })}
                    />
                </Elements>
            )}
        </div>
    );
};

export default BookTickets;
