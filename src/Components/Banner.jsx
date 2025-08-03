import { Link } from 'react-router-dom';
import img1 from '../assets/banner.jpg';

const Banner = () => {
    return (
        <div>
            <section
                className="bg-cover bg-center h-[60vh] text-white flex items-center justify-center"
                style={{ backgroundImage: `url(${img1})` }}
            >
                <div className="bg-black bg-opacity-50 p-8 rounded text-center max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
                    <p className="text-lg mb-6">Join exciting tours across the country, book your journey now!</p>
                    <Link to="/alltours" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded">
                        Explore Tours
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Banner;