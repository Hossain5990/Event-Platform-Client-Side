

import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from "../Provider/AuthProvider";

const AddEvents = () => {
    const { user } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const eventData = {
            title: form.title.value,
            image: form.image.value,
            description: form.description.value,
            price: parseInt(form.price.value),
            location: form.location.value,
            date: form.date.value,
            organizer: form.organizer.value,
            ticketQuantity: parseInt(form.ticketQuantity.value),
            category: form.category.value,
            organizerEmail: user.email,
        };

        const res = await fetch("http://localhost:5000/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(eventData),
        });

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Event Added!",
                text: "Your event has been successfully added.",
                timer: 2000,
                showConfirmButton: false
            });
            form.reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to add the event. Please try again."
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input name="title" placeholder="Event Title" className="input input-bordered w-full" required />
                <input name="image" placeholder="Image URL" className="input input-bordered w-full" required />
                <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
                <input name="price" type="number" placeholder="Base Ticket Price" className="input input-bordered w-full" required />
                <input name="location" placeholder="Location" className="input input-bordered w-full" required />
                <input name="date" type="datetime-local" className="input input-bordered w-full" required />
                <input name="organizer" placeholder="Organizer Name" className="input input-bordered w-full" required />
                <input name="ticketQuantity" type="number" placeholder="Total Tickets" className="input input-bordered w-full" required />
                <input name="category" placeholder="Category (Popular, Sports, etc)" className="input input-bordered w-full" required />        
                <button className="btn btn-primary w-full mt-4">Submit Event</button>
            </form>
        </div>
    );
};

export default AddEvents;


