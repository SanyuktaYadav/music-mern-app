import { Link } from "react-router";

const NavBar = () => {
    return (
        <nav className="flex bg-slate-800 justify-between">
            <div className="flex gap-2">
                <Link to="/" className="p-4 text-gray-300 cursor-pointer">Home</Link>
                <Link to="/AddSong" className="p-4 text-gray-300 cursor-pointer">Add Song</Link>
            </div>
            <div className="flex items-center px-2 cursor-pointer text-xl">
                👤
            </div>
        </nav>
    )
}

export default NavBar;