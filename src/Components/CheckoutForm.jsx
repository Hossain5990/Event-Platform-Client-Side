import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ bookingData, tourId, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            // Step 1: Create Payment Intent
            const res = await fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: bookingData.totalPrice }),
            });

            if (!res.ok) {
                const text = await res.text();
                console.error("Payment intent response not OK:", text);
                throw new Error("Failed to create payment intent");
            }

            const paymentData = await res.json();

            if (!paymentData.clientSecret) {
                throw new Error("No clientSecret received from server");
            }

            const clientSecret = paymentData.clientSecret;

            // Step 2: Confirm payment with Stripe
            const card = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (paymentResult.error) {
                throw new Error(paymentResult.error.message);
            }

            if (paymentResult.paymentIntent?.status === "succeeded") {
                // Step 3: Save booking in database
                const saveRes = await fetch("http://localhost:5000/bookTickets", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bookingData),
                });

                const result = await saveRes.json();
                if (result.insertedId) {
                    Swal.fire("Success", "Ticket booked successfully!", "success");
                    onSuccess(); // Callback for redirect or refresh
                } else {
                    throw new Error("Booking save failed");
                }
            }
        } catch (err) {
            console.error("Error during checkout:", err.message);
            Swal.fire("Error", err.message, "error");
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="border p-3 rounded" />
            <button
                type="submit"
                disabled={!stripe || processing}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 text-xl rounded"
            >
                {processing ? "Processing..." : "Pay & Confirm Booking"}
            </button>
        </form>
    );
};

export default CheckoutForm;
