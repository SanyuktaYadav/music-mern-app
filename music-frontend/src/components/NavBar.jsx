import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { storeCurrentUserDetails } from "../redux/slices/currentUserDetailsSlice";

const NavBar = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const isLoggedIn = true;
    const isAdmin = false;
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full flex bg-slate-800 justify-between z-50">
            <div className="flex gap-2 p-4 items-center">
                <Link to="/" className="flex items-center space-x-3 text-gray-300 hover:text-white">
                    <div className="bg-gray-400 text-black rounded-xl flex items-center justify-center text-xl font-bold">
                        🎵
                    </div>
                    <span className="text-white text-lg font-semibold">MyMusic</span>
                </Link>
                {isAdmin && <Link to="/AddSong" className="p-4 text-gray-300 cursor-pointer">Add Song</Link>}
            </div>

            <div ref={dropdownRef} className="relative inline-block text-left">
                {!isLoggedIn && <Link to="/Login" className="p-4 text-gray-300 cursor-pointer">Log In</Link>}
                {/* Trigger Button */}
                <button
                    onClick={toggleDropdown}
                    className="cursor-pointer bg-white text-white px-2 py-2 m-2 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                    👤
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute mt-2 right-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <ul className="py-1 text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li
                                onClick={async () => {
                                    try {
                                        const response = await axios.post(BASE_URL + "/myMusic/auth/logout", {}, { withCredentials: true });
                                        if (response.status === 200) {
                                            toast.success(response.data.message);
                                            navigate("/Login");
                                            dispatch(storeCurrentUserDetails({ user: null }));
                                            setIsOpen(false);
                                        }
                                    } catch (err) {
                                        toast.error(err.response?.data?.ERROR || "Something went wrong");
                                    }
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar;