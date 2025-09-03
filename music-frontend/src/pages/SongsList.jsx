import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import ConfirmationModal from "../components/ConfirmationModal";
import PreviewSongs from '../components/PreviewSongs';
import SongCard from "../components/SongCard";
import { BASE_URL } from '../utils/constants.js';

const SongsList = () => {
    const currentUser = useSelector(state => state.currentUser.user);

    const navigate = useNavigate();
    const isAdmin = true;
    const isLoggedIn = true;
    const [songs, setSongs] = useState([]);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(BASE_URL + '/myMusic/song/all', { withCredentials: true })
                setSongs(response?.data?.songs);
            } catch (err) {
                toast.error(err.response?.data?.ERROR || "Something went wrong");
            }
        }
        fetchSongs();
    }, [])

    const handleOpenConfirmationModal = (e, songData) => {
        e.stopPropagation();
        setOpenConfirmationModal(true);
        setSelectedSong(songData);
    }
    const handleCloseConfirmationModal = () => {
        setOpenConfirmationModal(false);
    }

    const handleEditSong = (e, songId) => {
        e.stopPropagation();
        navigate("/EditSong/" + songId);
    }

    return (
        <div>
            <h1>Welcome, {currentUser?.name}</h1>
            {openConfirmationModal &&
                <ConfirmationModal
                    open={openConfirmationModal}
                    handleCloseModal={handleCloseConfirmationModal}
                    data={selectedSong} />
            }

            <div className="flex justify-center w-full my-8" >
                <div className="text-4xl text-slate-700 font-semibold">
                    Explore Songs
                </div>
            </div>

            {!isLoggedIn ?
                <PreviewSongs /> :
                <div className="flex flex-wrap mt-8 justify-center">
                    {songs.map((item) => (
                        <div
                            key={item._id}
                            className="w-[45%] mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-white flex justify-between"
                            onClick={() => { navigate("/Song/" + item._id); }}
                        >
                            <SongCard
                                title={item.songName}
                                from={item.albumName}
                                image={item.songPoster}
                                small
                            />
                            {isAdmin &&
                                <div className="text-lg mt-2 mr-2 self-start">
                                    <FontAwesomeIcon icon={faPen}
                                        onClick={(e) => handleEditSong(e, item._id)}
                                    />
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={(e) => handleOpenConfirmationModal(e, { songName: item.songName, _id: item._id })}
                                    />
                                </div>
                            }
                        </div>
                    ))}
                </div>}
        </div>

    )
}

export default SongsList;

