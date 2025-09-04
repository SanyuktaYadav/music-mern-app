import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { storeCurrentUserDetails } from "../redux/slices/currentUserDetailsSlice";
import { logout } from "../actions/userActions";

const NavBar = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser.user);
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.type === "admin";
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
                <Link to="/" className="flex items-center space-x-3 text-gray-300 hover:text-white pr-1">
                    <div className="bg-gray-400 text-black rounded-xl flex items-center justify-center text-xl font-bold">
                        🎵
                    </div>
                    <span className="text-white text-lg font-semibold">MyMusic</span>
                </Link>
                {isAdmin && <Link to="/AddSong" className="px-1 text-gray-300 cursor-pointer font-bold">Add Song</Link>}
                {isAdmin && <Link to="/Users" className="px-1 text-gray-300 cursor-pointer font-bold">Users</Link>}
            </div>

            <div ref={dropdownRef} className="relative inline-block text-left">
                {!isLoggedIn && <Link to="/Login" className="px-1 text-gray-300 cursor-pointer font-bold">Login</Link>}

                {/* Trigger Button */}
                <button
                    onClick={isLoggedIn ? toggleDropdown : null}
                    className={`bg-white text-white px-2 py-2 m-2 rounded-full hover:bg-gray-100 focus:outline-none ${isLoggedIn ? 'cursor-pointer' : ''}`}
                >
                    👤
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute mt-2 right-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                        <ul className="py-1 text-gray-700">
                            {isLoggedIn && <li
                                onClick={async () => {
                                    const success = await logout();
                                    if (success) {
                                        dispatch(storeCurrentUserDetails({ user: null }));
                                        navigate("/Login");
                                        setIsOpen(false);
                                    }
                                }}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Logout
                            </li>
                            }
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar;