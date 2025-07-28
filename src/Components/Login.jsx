import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const navigate = useNavigate();

    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        signInUser(email, password)
            .then((result) => {
                console.log(result.user)
                e.target.reset();
                navigate("/")
            })
            .catch((error) => {
                console.log("Error", error.message)

            });

    }
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                 navigate("/")

            })
            .catch((error) => {
                console.log("Error", error.message)

            });


    }
    return (
        <div className="hero">
            <div className="hero-content flex-col ">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Login now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" autoComplete="off"  required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" autoComplete="new-password"   required />
                        </div>
                        <div className="form-control mt-4 text-center">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>

                    </form>
                    <div className=" px-6 text-center">
                        <button onClick={handleGoogleLogin} className="btn btn-soft w-full"><FcGoogle />Continue With Google</button>
                    </div>
                    <p className='text-center text-slate-500 text-sm my-5'>Create an account plz <span className='text-blue-700 font-bold text-base'><Link to="/register">Sign Up</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;