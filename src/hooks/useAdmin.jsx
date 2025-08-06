import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if (!loading && user?.email) {
            axiosSecure.get(`/users/admin/${user.email}`)
                .then(res => {
                    setIsAdmin(res.data?.admin === true);
                    setIsAdminLoading(false);
                })
                .catch(err => {
                    console.error("Admin check failed:", err);
                    setIsAdmin(false);
                    setIsAdminLoading(false);
                });
        }
    }, [user, loading, axiosSecure]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
