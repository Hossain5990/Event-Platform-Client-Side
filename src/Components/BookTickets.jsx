
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const BookTickets = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [tour, setTour] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        quantity: 1,
    });

    useEffect(() => {
        fetch(`http://localhost:5000/tours/${id}`)
            .then(res => res.json())
            .then(data => {
                setTour(data);
                if (user) {
                    setForm(prev => ({
                        ...prev,
                        name: user.displayName || "",
                        email: user.email || "",
                    }));
                }
            });
    }, [id, user]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestedQty = parseInt(form.quantity);
        const availableQty = parseInt(tour.ticketQuantity);

        // Check if requested quantity is more than available
        if (requestedQty > availableQty) {
            Swal.fire({
                icon: "error",
                title: "Not Enough Tickets!",
                text: `Only ${availableQty} ticket${availableQty > 1 ? "s" : ""} are available.`,
                confirmButtonText: "OK"
            });
            return;
        }

        // Check if already booked
        const checkRes = await fetch(`http://localhost:5000/bookTickets/check?email=${form.email}&tourId=${tour._id}`);
        const checkData = await checkRes.json();

        if (checkData.exists) {
            Swal.fire({
                icon: "warning",
                title: "Already Booked!",
                text: "You have already booked this tour.",
                confirmButtonText: "Go to All Tours",
            }).then(() => {
                navigate("/alltours");
            });
            return;
        }

        // Proceed to book
        const bookingData = {
            ...form,
            tourId: tour._id,
            image: tour.image,
            tourTitle: tour.title,
            location: tour.location,
            totalPrice: requestedQty * parseInt(tour.price),
            tourDate: tour.date,
            bookingDate: new Date().toISOString(),
            organizerEmail: tour.organizerEmail,
        };

        fetch('http://localhost:5000/bookTickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Ticket Booked Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/alltours", { state: { refresh: true } });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };


    if (!tour) return <p className="text-center p-10">Loading tour info...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md mt-8 rounded">
            <h2 className="text-5xl text-yellow-500 font-bold mb-4 text-center">Book Tour</h2>
            <h2 className="text-2xl  font-bold mb-4 text-center">{tour.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    readOnly
                    className="w-full p-2 border rounded text-base font-medium"
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    readOnly
                    className="w-full p-2 border rounded text-base font-medium"
                />

                <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded text-base font-medium"
                    required
                />

                <p className="text-lg font-medium">
                    Total Price: {form.quantity * tour.price} BDT
                </p>

                <button type="submit" className="bg-yellow-500 hover:bg-yellow-600text-black font-semibold px-4 py-2 text-xl rounded" >Confirm Booking</button>

            </form>
        </div>
    );
};

export default BookTickets;
