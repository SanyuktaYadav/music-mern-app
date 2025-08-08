import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const NavBar = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

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
        <nav className="flex bg-slate-800 justify-between">
            <div className="flex gap-2">
                <Link to="/" className="p-4 text-gray-300 cursor-pointer">Home</Link>
                <Link to="/AddSong" className="p-4 text-gray-300 cursor-pointer">Add Song</Link>
            </div>
            <div className="flex items-center px-2 cursor-pointer text-xl">
            </div>

            <div ref={dropdownRef} className="relative inline-block text-left">
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
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li
                                onClick={() => {
                                    navigate("/")
                                    setIsOpen(false);
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