
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import SocialSignUp from './SocialSignUp';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const image = e.target.image.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Password Too Short",
                text: "Password must be at least 6 characters long."
            });
            return;
        }

        createUser(email, password)
            .then((result) => {
                const currentUser = result.user;

                //Update profile in Firebase
                updateProfile(currentUser, {
                    displayName: name,
                    photoURL: image || "https://i.ibb.co/4pDNDk1/avatar.png"
                })
                    .then(() => {
                        //Send user data to your backend
                        const savedUser = {
                            name: name,
                            email: email,
                            image: image || "https://i.ibb.co/4pDNDk1/avatar.png"
                        };

                        fetch("http://localhost:5000/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId || data.message === 'user already exists') {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "User Registered Successfully!",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    e.target.reset();
                                    navigate("/");
                                }
                            });
                    })
                    .catch(err => {
                        console.error("Profile update error:", err);
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error.message);
                Swal.fire("Error", error.message, "error");
            });
    }


    return (
        <div className="hero">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Sign Up</h1>
                </div>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleRegister} className="px-8 pt-6 space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Your full name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL (Optional)</span>
                            </label>
                            <input type="text" name="image" placeholder="Paste image URL" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required autoComplete="off" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required autoComplete="new-password" />
                        </div>

                        <div className="form-control mt-2 text-center">
                            <button className="btn btn-primary w-full">Sign Up</button>
                        </div>
                    </form>

                    <SocialSignUp title="Sign Up with Google" />

                    <p className='text-center text-slate-500 text-sm my-5'>
                        Have an account? Please{" "}
                        <Link to="/login" className='text-blue-700 font-bold text-base'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
