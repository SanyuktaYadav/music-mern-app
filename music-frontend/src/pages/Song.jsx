import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import SongCard from "../components/SongCard";
import { BASE_URL } from "../utils/constants";

const Song = () => {
    const { id } = useParams();
    const [song, setSong] = useState();

    useEffect(() => {
        if (id) {
            try {
                const fetchSong = async () => {
                    const response = await axios.get(BASE_URL + '/myMusic/song/getById/' + id, { withCredentials: true })
                    setSong(response?.data?.song);
                }
                fetchSong();
            } catch (err) {
                toast.error(err.response?.data?.ERROR || "Something went wrong");
            }
        }
    }, [id]);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {song &&
                (
                    <SongCard
                        title={song.songName}
                        from={song.albumName}
                        image={song.songPoster}
                        audioSrc={song.songAudioFile}
                    />
                )}
        </div>
    )
}

export default Song;

