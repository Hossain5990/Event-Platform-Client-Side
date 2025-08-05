// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Provider/AuthProvider";

// const MyTickets = () => {
//   const { user } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/bookTickets?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => setBookings(data));
//   }, [user.email]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">🎫 My Tickets</h2>
//       <p className="mb-4 text-gray-600 text-xl font-semibold text-center">Total Booked: {bookings.length}</p>


//       <div className="space-y-4">
//         {bookings.map((booking, index) => (
//           <div key={booking._id} className="bg-white shadow p-4 rounded-lg md:flex gap-4 items-center">
//             <div>
//               <img
//                 src={booking.image}
//                 alt=""
//                 className="w-full h-60 object-cover rounded-lg shadow mb-2"
//               />
//             </div>

//             <div>
//               <h3 className="text-xl font-bold mb-2">
//                 {index + 1}. {booking.tourTitle}
//               </h3>
//               <p><strong>Location:</strong> {booking.location}</p>
//               <p><strong>Tour Date:</strong> {booking.tourDate}</p>
//               <p><strong>Tickets:</strong> {booking.quantity}</p>
//               <p><strong>Price:</strong> {booking.totalPrice} BDT</p>
//               <p><strong>Booked By:</strong> {booking.email}</p>
//               <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
//               <div className="flex gap-2 mt-2">

//               <button
//                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold"
//                 onClick={() => handleUpdate(booking)}
//               >
//                 Update
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold"
//                 onClick={() => handleCancel(booking._id)}
//               >
//                 Cancel
//               </button>
//             </div>
//             </div>

//             {/* <div className="flex flex-col gap-2 ml-4">

//               <button
//                 className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold"
//                 onClick={() => handleUpdate(booking)}
//               >
//                 Update
//               </button>
//               <button
//                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold"
//                 onClick={() => handleCancel(booking._id)}
//               >
//                 Cancel
//               </button>
//             </div> */}
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default MyTickets;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyTickets = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/bookTickets?email=${user.email}`)
      .then(res => res.json())
      .then(data => setBookings(data));
  }, [user.email]);

  // ✅ Cancel Booking
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No"
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookTickets/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(() => {
            setBookings(prev => prev.filter(b => b._id !== id));
            Swal.fire("Cancelled!", "Your booking has been deleted.", "success");
          });
      }
    });
  };

  // ✅ Enable edit form
  const handleUpdate = (booking) => {
    setEditingId(booking._id);
    setEditedQuantity(booking.quantity);
  };

  // ✅ Save update
  const handleSave = (booking) => {
    const unitPrice = booking.totalPrice / booking.quantity;

    fetch(`http://localhost:5000/bookTickets/${booking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: editedQuantity,
        price: unitPrice
      }),
    })
      .then(res => res.json())
      .then(updated => {
        setBookings(prev =>
          prev.map(b =>
            b._id === booking._id
              ? {
                ...b,
                quantity: editedQuantity,
                totalPrice: editedQuantity * unitPrice
              }
              : b
          )
        );
        setEditingId(null);
        Swal.fire("Updated!", "Ticket quantity and price updated.", "success");
      });
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <p className="mb-4 md:mb-6 text-gray-600 text-2xl font-bold text-center">Total Booked: {bookings.length}</p>

      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div key={booking._id} className="bg-white shadow p-4 rounded-lg md:flex gap-4 items-center">
            <div className="md:w-1/3">
              <img src={booking.image} alt="" className="w-full h-60 object-cover rounded-lg shadow mb-2" />
            </div>

            <div className="md:w-2/3 space-y-1">
              <h3 className="text-xl font-bold">{index + 1}. {booking.tourTitle}</h3>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Tour Date:</strong> {booking.tourDate}</p>
              <p><strong>Unit Price:</strong> {booking.price} BDT</p>
              <p><strong>Booked By:</strong> {booking.email}</p>
              <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
              <p><strong>Tickets:</strong> {booking.quantity}</p>
              <p><strong>Total:</strong> {booking.totalPrice} BDT</p>
              <div>
                {editingId === booking._id ? (
                  <>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="number"
                        min={1}
                        value={editedQuantity}
                        onChange={e => setEditedQuantity(e.target.value)}
                        className="border p-1 rounded w-24"
                      />
                      <button
                        onClick={() => handleSave(booking)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2 mt-2">

                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded font-bold"
                      onClick={() => handleUpdate(booking)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-bold"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;

