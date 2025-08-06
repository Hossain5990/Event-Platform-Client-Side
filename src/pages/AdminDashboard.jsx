import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalTickets: 0, totalRevenue: 0 });

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/adminTicketStats?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setStats(data))
                .catch(err => console.error("Stats fetch error:", err));
        }
    }, [user?.email]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">🧑‍💼 Admin Dashboard</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
                <img
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="Admin Avatar"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                    {user?.displayName || "Admin User"}
                </h2>
                <p className="text-gray-600 mt-1">{user?.email}</p>

                <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
                    ✏️ Edit Profile
                </button>

                <div className="mt-8 w-full text-left">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">📊 Event Ticket Sales Stats</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-100 rounded">
                            <p className="text-lg font-semibold text-indigo-700">🎫 Total Tickets Sold</p>
                            <p className="text-2xl font-bold">{stats.totalTickets}</p>
                        </div>
                        <div className="p-4 bg-green-100 rounded">
                            <p className="text-lg font-semibold text-green-700">💰 Total Revenue</p>
                            <p className="text-2xl font-bold">{stats.totalRevenue} BDT</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
