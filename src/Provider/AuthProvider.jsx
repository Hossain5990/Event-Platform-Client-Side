import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';
import axios from 'axios';



export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider;


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    const signInWithGoogle = () => {
        setLoading(true);

        return signInWithPopup(auth, googleProvider);
    }

   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email };

                axios.post("http://localhost:5000/jwt", userInfo, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => {
                        localStorage.setItem("access-token", res.data.token);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("JWT fetch error:", error);
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);



    const authInfo = {
        createUser,
        signInUser,
        user,
        signOutUser,
        loading,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;