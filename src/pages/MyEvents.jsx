import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyEvents = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    // Fetch events for logged-in organizer
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:5000/tours?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                console.log("Fetched events:", data);
            });
    }, [user?.email]);

    // Delete handler
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this event permanently?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tours/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        setEvents((prev) => prev.filter((ev) => ev._id !== id));
                        Swal.fire("Deleted!", "Your event has been removed.", "success");
                    });
            }
        });
    };

    // Set event for editing
    const handleEdit = (event) => {
        setEditingId(event._id);
        const formattedDate = event.date?.slice(0, 16); 
        setEditForm({ ...event, date: formattedDate });
    };

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: name === "price" || name === "ticketQuantity" ? parseInt(value) : value,
        }));
    };

    // Update handler
    const handleUpdate = () => {
        const { _id, ...updatedData } = editForm; 
        fetch(`http://localhost:5000/tours/${editingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Update Response:", data);
                if (data.modifiedCount > 0) {
                    setEvents((prev) =>
                        prev.map((ev) =>
                            ev._id === editingId ? { ...ev, ...updatedData } : ev
                        )
                    );
                    Swal.fire("Updated!", "Your event has been updated.", "success");
                     
                } else {
                    Swal.fire("No changes!", "Nothing was updated.", "info");
                }
                setEditingId(null);
            })
            .catch((err) => {
                console.error("Update error:", err);
                Swal.fire("Error!", "Failed to update event.", "error");
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
             
            <div className="space-y-6">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-white shadow p-4 rounded-lg md:flex gap-6 items-start"
                    >
                        <div className="md:w-1/3">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="rounded-lg w-full h-48 object-cover"
                            />
                        </div>

                        {editingId === event._id ? (
                            <div className="md:w-2/3 space-y-2 mt-4 md:mt-0">
                                <input
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                                <textarea
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full"
                                />
                                <input
                                    name="price"
                                    type="number"
                                    value={editForm.price}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    name="location"
                                    value={editForm.location}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    name="date"
                                    type="datetime-local"
                                    value={editForm.date}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />
                                <input
                                    name="ticketQuantity"
                                    type="number"
                                    value={editForm.ticketQuantity}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                />

                                <div className="flex gap-2 mt-2">
                                    <button className="btn btn-success" onClick={handleUpdate}>
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-ghost"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="md:w-2/3 space-y-1 mt-4 md:mt-0">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p>{event.description}</p>
                                <p><strong>Price:</strong> {event.price} BDT</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Tickets:</strong> {event.ticketQuantity}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-semibold"
                                        onClick={() => handleEdit(event)}
                                    >
                                        Update
                                    </button>
                                    <button
                                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold"
                                        onClick={() => handleDelete(event._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEvents;
