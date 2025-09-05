import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router";
import { fetchAllUsers } from '../actions/userActions.js';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsersList = () => {
    const currentUser = useSelector(state => state.currentUser.user);

    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.type === "admin";

    const [users, setUsers] = useState([]);
    const [searchNameInput, setSearchNameInput] = useState("");

    // Initial data load, and data load when no search name
    useEffect(() => {
        if (!searchNameInput) {
            fetchData();
        }
    }, [searchNameInput]);

    const fetchData = async () => {
        if (isLoggedIn) {
            const response = await fetchAllUsers({ name: searchNameInput });
            setUsers(response?.data?.users);
        }
    }

    const onApplyFilter = async () => {
        await fetchData();
    }

    if (!isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className='mt-18 mb-4 w-full' >
                <div className="flex justify-center" >
                    <div className="text-4xl text-slate-700 font-semibold">
                        Users
                    </div>
                </div>
            </div>

            <div className="relative flex items-center w-80 mx-8">
                <input
                    type="text"
                    placeholder="Search user by name"
                    value={searchNameInput}
                    className="w-full pr-10 pl-4 py-2 bg-white text-black rounded border border-gray-300 focus:outline-none"
                    onChange={(e) => setSearchNameInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onApplyFilter();
                        }
                    }}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute right-3 text-black cursor-pointer"
                    onClick={() => {
                        onApplyFilter();
                    }}
                />
            </div>

            <div className="flex flex-wrap mt-8 justify-center w-full">
                {users.map((item) => (
                    <div
                        key={item._id}
                        // className="w-[45%] mx-4 my-4 border-2 rounded-2xl border-slate-500 bg-white flex justify-between p-4  flex-wrap"
                        className="w-[45%] mx-4 my-4 p-4 rounded-2xl border-slate-500 cursor-pointer bg-gradient-to-b from-slate-100 to-white/80 flex justify-between flex-wrap shadow-md"
                    // onClick={() => { }}
                    >
                        Name: {item.name} <br />
                        Email: {item.email} <br />
                        <div className="flex gap-2 flex-wrap mt-2">
                            {item.type === "admin" && (
                                <b>Admin</b>
                            )}
                            {currentUser._id === item._id && (
                                <b className="px-2" style={{ color: "green" }}>You</b>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default UsersList;

