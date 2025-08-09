import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/payments?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setPayments(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch payment history:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return <p className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">Loading payment history...</p>;

    if (payments.length === 0) return <p className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">No payment history found.</p>;

    return (
        <div className="p-6">
            {/* <h2 className="mb-4 md:mb-6 text-gray-600 text-3xl font-bold text-center">My Payment History</h2> */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-yellow-500 text-white">
                            <th className="border px-4 py-2">Tour</th>
                            <th className="border px-4 py-2">Booking Date</th>
                            <th className="border px-4 py-2">Quantity</th>
                            <th className="border px-4 py-2">Amount Paid (BDT)</th>
                            <th className="border px-4 py-2">Transaction ID</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p) => (
                            <tr key={p._id} className="text-center">
                                <td className="border px-4 py-2">{p.tourTitle}</td>
                                <td className="border px-4 py-2">{new Date(p.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{p.quantity}</td>
                                <td className="border px-4 py-2">{p.totalPrice}</td>
                                <td className="border px-4 py-2">{p.transactionId}</td>
                                <td className="border px-4 py-2">{p.status === "cancel" ? (
                                    <span className="text-red-500 font-semibold">Cancelled -<span className="text-blue-500 font-semibold"> Refunded</span></span>
                                ) : (
                                    <span className="text-green-600 font-semibold">Paid</span>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;




