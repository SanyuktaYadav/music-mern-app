import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";
import flowerImg from "../assets/images/flower-1.jpg";
import ConfirmationModal from "../components/ConfirmationModal";
import SongCard from "../components/SongCard";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import PreviewSongs from '../components/PreviewSongs';

const SongsList = () => {
    const arr = new Array(20).fill(0);
    const navigate = useNavigate();
    const isAdmin = true;
    const isLoggedIn = true;

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [selectedSong, setSelectedSong] = useState();

    const handleOpenConfirmationModal = (e, songData) => {
        e.stopPropagation();
        setOpenConfirmationModal(true);
        setSelectedSong(songData);
    }
    const handleCloseConfirmationModal = () => {
        setOpenConfirmationModal(false);
    }

    const handleEditSong = (e) => {
        e.stopPropagation();
        navigate("/EditSong/1");
    }
    return (
        <div>
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
                    {arr.map((item) => (
                        <div
                            className="w-[45%] mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-white flex justify-between"
                            onClick={() => { navigate("/Song"); }}
                        >
                            <SongCard
                                title={"Zindagi Na Milegi Dobara"}
                                from={"Zindagi Na Milegi Dobara"}
                                image={flowerImg}
                                small
                            />
                            {isAdmin &&
                                <div className="text-lg mt-2 mr-2 self-start">
                                    <FontAwesomeIcon icon={faPen}
                                        onClick={(e) => handleEditSong(e)}
                                    />
                                    <FontAwesomeIcon icon={faTrash}
                                        onClick={(e) => handleOpenConfirmationModal(e, { songName: "znmd", _id: "1" })}
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

