import { faPen, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import PreviewSongs from '../components/PreviewSongs';
import ListSongCard from "../components/ListSongCard.jsx";
import { storeSongList } from '../redux/slices/songListSlice.js';
import { fetchAllSongs } from '../actions/songActions.js';
import Spinner from '../components/Spinner.jsx';

const SongsList = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const songs = useSelector(state => state.songList.songs);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = !!currentUser;
    const isAdmin = currentUser?.type === "admin";

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState();
    const [searchNameInput, setSearchNameInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Initial data load, and data load when no search name
    useEffect(() => {
        if (!searchNameInput) {
            fetchData();
        }
    }, [searchNameInput]);

    const onApplyFilter = async () => {
        await fetchData();
    }

    const fetchData = async () => {
        if (isLoggedIn) {
            setIsLoading(true);
            const response = await fetchAllSongs({ songName: searchNameInput });
            if (response) {
                dispatch(storeSongList(response?.data?.songs ?? []));
            }
            setIsLoading(false);
        }
    }

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

            {isLoggedIn && <div className="relative flex items-center w-80 mx-8">
                <input
                    type="text"
                    placeholder="Search song by name"
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
            }

            {!isLoggedIn ?
                <PreviewSongs /> :
                isLoading
                    ? <Spinner />
                    : <div className="flex flex-wrap mt-8 justify-center gap-6">
                        {songs.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-2xl border-slate-500 cursor-pointer bg-gradient-to-b from-slate-100 to-white/80 flex justify-between shadow-md"
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
                    </div>
            }
        </div>
    )
}

export default SongsList;

