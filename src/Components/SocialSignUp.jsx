import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const SocialSignUp = ({title}) => {
  
    const navigate = useNavigate();
    const {signInWithGoogle} = useContext(AuthContext);

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
            <div>
                <div className="divider text-base font-semibold text-gray-500 my-4">OR</div>
                <div className=" px-6 text-center">
                    <button onClick={handleGoogleLogin} className="btn btn-soft w-full"><FcGoogle />{title}</button>
                </div>

            </div>
        );
    };

    export default SocialSignUp;