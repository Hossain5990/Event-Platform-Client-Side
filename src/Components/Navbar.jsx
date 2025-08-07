import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { PiRocketLaunch, PiSignOutBold } from "react-icons/pi";
import Swal from 'sweetalert2';
import useAdmin from '../hooks/useAdmin';


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();


    const handleSignOut = () => {
        signOutUser()
            .then((result) => {
                console.log("user Logout Succesfully")
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User SignOut Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

            })
            .catch((error) => {
                console.log("Error", error.message)

            });

    }

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'text-base font-bold text-yellow-500 border-b-2 border-yellow-500 pb-1'
            : 'text-base font-bold text-gray-500';


    const links = <>

        <li><NavLink className={navLinkClass} to='/'>Home</NavLink></li>
        <li><NavLink className={navLinkClass} to='/alltours'>All Tours</NavLink></li>
        {
            user && !isAdminLoading && (
                isAdmin ? (
                    <>
                        <li><NavLink className={navLinkClass} to='/addevents'>Add Events</NavLink></li>
                        <li><NavLink className={navLinkClass} to='/myevents'>My Events</NavLink></li>
                        <li><NavLink className={navLinkClass} to='/users'>All Users</NavLink></li>
                        <li><NavLink className={navLinkClass} to='/admindashboard'>Dashboard</NavLink></li>
                    </>
                ) : (
                    <>
                        <li><NavLink className={navLinkClass} to='/mytickets'>My Tickets</NavLink></li>
                        <li><NavLink className={navLinkClass} to='/dashboard'>Dashboard</NavLink></li>
                        <li><NavLink className={navLinkClass} to='/paymenthistory'>Payment History</NavLink></li>
                    </>
                )
            )
        }


    </>

    return (

        <div className="navbar bg-base-100 shadow-sm py-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow md:gap-2">
                        {
                            links
                        }

                    </ul>
                </div>
                <div className='flex items-center'>
                    <a className="text-2xl md:text-5xl font-bold text-black">Quick<span className='text-yellow-500'>Event</span></a>
                    <a className="text-2xl md:text-5xl font-bold text-yellow-500"><PiRocketLaunch /></a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 md:gap-2">
                    {
                        links
                    }

                </ul>
            </div>
            <div className="navbar-end gap-2">
                {
                    user ?
                        <>
                            {/* <a className="hidden md:flex btn bg-yellow-500 text-white font-semibold md:text-lg">{user?.email}</a> */}
                            <button onClick={handleSignOut} className="btn bg-yellow-500 text-white font-semibold md:text-lg items-center">Sign Out <PiSignOutBold /></button>
                        </>
                        :
                        <>
                            <button className="btn bg-yellow-500 text-white font-semibold md:text-lg"><Link to='/login'>Login</Link></button>
                            <button className="btn bg-yellow-500 text-white font-semibold md:text-lg"><Link to='/register'>Sign Up</Link></button>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;