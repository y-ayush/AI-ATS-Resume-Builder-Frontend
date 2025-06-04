import React, { useEffect } from "react";
import logo from "/logo.svg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";

function Header({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            console.log("Printing From Header User Found");
        } else {
            console.log("Printing From Header User Not Found");
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            if (response.statusCode == 200) {
                dispatch(addUserData(""));
                navigate("/");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div
            id="printHeader"
            className="flex justify-between px-10 py-5 shadow-md items-center bg-gray-900 border-b border-gray-800"
        >
            <img
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="filter invert(1)" // Add this if your logo is dark-colored
            />

            {user ? (
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/dashboard")}
                        className="border-gray-700 text-gray-900 hover:bg-gray-800 hover:text-white"
                    >
                        Dashboard
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="bg-red-600 text-white hover:opacity-90"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <Link to="/auth/sign-in">
                    <Button className="bg-blue-700 text-white hover:opacity-90">
                        Login
                    </Button>
                </Link>
            )}
        </div>
    );
}

export default Header;
