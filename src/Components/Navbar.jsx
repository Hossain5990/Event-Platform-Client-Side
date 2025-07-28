import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then((result) => {
                console.log("user Logout Succesfully")
            })
            .catch((error) => {
                console.log("Error", error.message)

            });

    }

    const links = <>

        <li className='text-base font-bold'><NavLink to='/'>Home</NavLink></li>
        <li className='text-base font-bold'><NavLink to='/login'>Login</NavLink></li>
        <li className='text-base font-bold'><NavLink to='/register'>Register</NavLink></li>
        {
            user  &&
            <>
              <li className='text-base font-bold'><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
            
        }

    </>

    return (

        <div className="navbar bg-base-100 shadow-sm mt-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow md:gap-10">
                        {
                            links
                        }

                    </ul>
                </div>
                <a className=" text-2xl font-bold text-black">Quick<span className='text-red-600'>Event</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 md:gap-10">
                    {
                        links
                    }

                </ul>
            </div>
            <div className="navbar-end gap-2">
                {
                    user ?
                        <>
                            <a className="btn">{user?.email}</a>
                            <button onClick={handleSignOut} className="btn">Sign Out</button>
                        </>
                        : <button className="btn rounded-full"></button>
                }
            </div>
        </div>
    );
};

export default Navbar;