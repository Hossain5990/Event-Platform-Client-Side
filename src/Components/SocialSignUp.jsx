import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";


const SocialSignUp = ({ title }) => {

    const navigate = useNavigate();
    const { signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const loggedInUser = result.user;
                console.log("Google user:", loggedInUser);
                
                const savedUser = {
                    name: loggedInUser.displayName,
                    email: loggedInUser.email,
                    image: loggedInUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                };

                // Send to database
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "User Login Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    });
            })
            .catch((error) => {
                console.log("Error", error.message)
                Swal.fire("Error", error.message, "error");

            });

    }

    return (
        <div>
            <div className="divider text-base font-semibold text-gray-500 my-4">OR</div>
            <div className=" px-6 text-center">
                <button onClick={handleGoogleLogin} className="btn btn-soft w-full"><FcGoogle />{title}</button>
            </div>

        </div>
    );
};

export default SocialSignUp;