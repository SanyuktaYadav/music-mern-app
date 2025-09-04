import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router";
import { addSong, fetchSongById } from "../actions/songActions";
import { toast } from "react-toastify";

const initialFormFields = {
    songName: "",
    albumName: "",
}

const AddSong = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const currentUser = useSelector(state => state.currentUser.user);
    const isEdit = !!id;
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.type === "admin";
    const [editData, setEditData] = useState({});

    const [isUploading, setIsUploading] = useState(false);

    const [formFields, setFormFields] = useState({
        ...initialFormFields
    });
    const [songAudioFile, setSongAudioFile] = useState(null);
    const [songPoster, setSongPoster] = useState(null);
    const [existingLinks, setExistingLinks] = useState([{
        songPosterLink: "", songAudioLink: ""
    }])

    useEffect(() => {
        if (id) {
            const fetchSong = async () => {
                const response = await fetchSongById(id);
                if (response) {
                    setEditData(response?.data?.song);
                }
            }
            fetchSong();
        }
    }, [id]);

    useEffect(() => {
        if (editData?._id) {
            setFormFields(prevState => ({
                ...prevState,
                songName: editData.songName,
                albumName: editData.albumName
            }))
            setExistingLinks(prevState => ({
                ...prevState,
                songPosterLink: editData.songPoster,
                songAudioLink: editData.songAudioFile
            }))
        }
    }, [editData?._id]);

    useEffect(() => {
        return () => {
            setEditData("")
        }
    }, [])

    const handleInputChange = (e) => {
        setFormFields(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async () => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('songName', formFields.songName);
        formData.append('albumName', formFields.albumName);
        if (songPoster) formData.append('songPoster', songPoster);
        if (songAudioFile) formData.append('songAudioFile', songAudioFile);
        const response = await addSong(formData);
        if (response.status === 200) {
            toast.success(response.data.message);
            navigate("/");
        }
        setIsUploading(false);
    }

    if (!isAdmin || !isLoggedIn) {
        return <Navigate to="/" />
    }

    return (
        <>
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
                        onChange={(e) => { setSongAudioFile(e.target.files[0]) }}
                        className="cursor-pointer rounded-md bg-white px-2 py-1 font-semibold text-gray-900 shadow-xs"
                    />
                    {existingLinks?.songAudioLink && <a
                        href={existingLinks?.songAudioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 m-4"
                    >
                        View Uploaded Audio
                    </a>}
                </div>

                <div className="sm:col-span-4">
                    <label className="font-medium text-gray-900 mr-4">Song Image</label>
                    <input
                        type="file"
                        onChange={(e) => { setSongPoster(e.target.files[0]) }}
                        className="cursor-pointer rounded-md bg-white px-2 py-1 font-semibold text-gray-900 shadow-xs"
                    />
                    {existingLinks?.songPosterLink && <a
                        href={existingLinks?.songPosterLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 m-4"
                    >
                        View Uploaded Poster
                    </a>}
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
            {isUploading && <h1 className="m-8">Uploading...</h1>}
        </>
    )
}

export default AddSong;

