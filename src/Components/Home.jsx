import React from 'react';
import Banner from './Banner';
import Choose from './Choose';
import Call from './Call';
import Footer from './Footer';
import PopularTours from './PopularTours';



const Home = () => {
    return (
        <div>

           
            <Banner></Banner>
            <PopularTours></PopularTours>
            <Call></Call>
            <Choose></Choose>
            <Footer></Footer>

        </div>
    );
};

export default Home;