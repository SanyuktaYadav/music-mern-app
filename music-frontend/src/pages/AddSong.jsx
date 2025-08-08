import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const initialFormFields = {
    songName: "",
    albumName: "",
    photo: "",
    audioFile: ""
}

const AddSong = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formFields, setFormFields] = useState({
        ...initialFormFields
    });

    const handleInputChange = (e) => {
        setFormFields(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const handleFileChange = (e) => {
        console.log("file e = ", e)
    }

    const handleSubmit = (e) => {
        const payload = formFields;
        console.log("submitting form with payload = ", payload);
    }

    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-10">
            <div className="sm:col-span-4">
                <h1 className="text-3xl font-semibold">{isEdit ? "Edit Song" : "Add Song"}</h1>
            </div>
            <div className="sm:col-span-4">
                <label
                    for="songName"
                    className=" font-medium text-gray-900 mr-4">
                    Song Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="songName"
                    name="songName"
                    type="text"
                    placeholder="Enter a Song Name"
                    className="min-w-0 py-2 px-2 text-gray-900 bg-white w-[60%] rounded"
                    value={formFields.songName}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>

            <div className="sm:col-span-4">
                <label
                    for="albumName"
                    className=" font-medium text-gray-900 mr-4">
                    Album Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="albumName"
                    name="albumName"
                    type="text"
                    placeholder="Enter an Album Name"
                    className="min-w-0 py-2 px-2 text-gray-900 bg-white w-[60%] rounded"
                    value={formFields.albumName}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>

            <div className="sm:col-span-4">
                <label className="font-medium text-gray-900 mr-4">
                    Audio file
                </label>
                <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    className="cursor-pointer rounded-md bg-white px-2 py-1 font-semibold text-gray-900 shadow-xs"
                />
            </div>

            <div className="sm:col-span-4">
                <label className="font-medium text-gray-900 mr-4">Song Image</label>
                <input
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                    className="cursor-pointer rounded-md bg-white px-2 py-1 font-semibold text-gray-900 shadow-xs"
                />
            </div>

            <div className="sm:col-span-4">
                <button
                    onClick={() => navigate("/")}
                    className="cursor-pointer rounded-md bg-red-600 px-2 py-1 mx-1 text-xl font-semibold text-white shadow-xs">
                    Cancel
                </button>
                <button
                    onClick={(e) => { handleSubmit(e) }}
                    className="cursor-pointer rounded-md bg-white px-2 py-1 mx-1 text-xl font-semibold text-gray-900 shadow-xs">
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddSong;

