import React from 'react';

const Choose = () => {
    return (
        <div >
            <section className="bg-gray-100 py-16">
                <div className="max-w-5xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8">
                        <div>
                            <h4 className="text-xl font-semibold mb-2">✅ Trusted Organizers</h4>
                            <p className="text-gray-700">All tours are verified by experienced and rated organizers.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">💳 Secure Payment</h4>
                            <p className="text-gray-700">Pay safely using Stripe, PayPal or bKash sandbox gateways.</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mb-2">📍 Map Integration</h4>
                            <p className="text-gray-700">View exact tour locations via Google Maps integration.</p>
                        </div>
                    </div>
                </div>
                </section>

        </div>
    );
};

export default Choose;