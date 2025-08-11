
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckoutForm = ({ bookingData, tourId, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            // Create Payment Intent
            const { data: paymentData } = await axiosSecure.post("/create-payment-intent", {
                price: bookingData.totalPrice
            });

            if (!paymentData.clientSecret) {
                throw new Error("Payment creation failed");
            }

            const card = elements.getElement(CardElement);

            // Confirm payment with Stripe
            const paymentResult = await stripe.confirmCardPayment(paymentData.clientSecret, {
                payment_method: { card },
            });

            if (paymentResult.error) throw new Error(paymentResult.error.message);

            const paymentIntent = paymentResult.paymentIntent;

            if (paymentIntent?.status === "succeeded") {
                // Save booking
                const { data: result } = await axiosSecure.post("/bookTickets", {
                    ...bookingData,
                    paymentIntentId: paymentIntent.id,
                    stripeAmount: paymentIntent.amount,
                    currency: paymentIntent.currency
                });

                if (result.insertedId) {
                    // Save payment record
                    await axiosSecure.post("/payments", {
                        email: bookingData.email,
                        tourTitle: bookingData.tourTitle,
                        tourId: bookingData.tourId,
                        quantity: bookingData.quantity,
                        totalPrice: bookingData.totalPrice,
                        transactionId: paymentIntent.id,
                        organizerEmail: bookingData.organizerEmail,
                        bookingId: result.insertedId,
                        status: "paid",
                        date: new Date()
                    });

                    Swal.fire("Success", "Ticket booked successfully!", "success");
                    onSuccess();
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
