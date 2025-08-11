import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider'; 

const Call = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className='my-5'>
            <section className="bg-yellow-500 py-12 text-center text-black">
                <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
                <p className="mb-6 text-lg">Register now and start your adventure today!</p>

                <Link
                    to={user ? "/alltours" : "/register"}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                >
                    Get Started
                </Link>
            </section>
        </div>
    );
};

export default Call;
