import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import PreviewSongs from '../components/PreviewSongs';
import ListSongCard from "../components/ListSongCard.jsx";
import { storeSongList } from '../redux/slices/songListSlice.js';
import { fetchAllSongs } from '../actions/songActions.js';

const SongsList = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const songs = useSelector(state => state.songList.songs);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.type === "admin";

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState();

    useEffect(() => {
        const fetchSongs = async () => {
            if (isLoggedIn) {
                const response = await fetchAllSongs();
                dispatch(storeSongList(response?.data?.songs ?? []));
            }
        }
        fetchSongs();
    }, [isLoggedIn]);

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
        <div className='max-w-5xl mx-auto'>
            {openConfirmationModal &&
                <ConfirmationModal
                    open={openConfirmationModal}
                    handleCloseModal={handleCloseConfirmationModal}
                    data={selectedSong} />
            }

            <div className='mt-18 mb-4 w-full' >
                {isLoggedIn &&
                    <h1 className='m-4'>Welcome, {currentUser?.name} {isAdmin && "(Admin)"}</h1>
                }
                <div className="flex justify-center" >
                    <div className="text-4xl text-slate-700 font-semibold">
                        Explore Songs
                    </div>
                </div>
            </div>

            {!isLoggedIn ?
                <PreviewSongs /> :
                <div className="flex flex-wrap mt-8 justify-center w-full">
                    {songs.map((item) => (
                        <div
                            key={item._id}
                            className="mx-4 my-4 rounded-2xl border-slate-500 cursor-pointer bg-gradient-to-b from-slate-100 to-white/80 flex justify-between shadow-md"
                            onClick={() => { navigate("/Song/" + item._id); }}
                        >
                            <ListSongCard
                                title={item.songName}
                                from={item.albumName}
                                image={item.songPoster}
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

