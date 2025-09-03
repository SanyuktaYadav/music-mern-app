import SongCard from "../components/SongCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Song = () => {
    const { id } = useParams();
    const [song, setSong] = useState();

    useEffect(() => {
        if (id) {
            const fetchSong = async () => {
                const response = await axios.get(BASE_URL + '/myMusic/song/getById/' + id, { withCredentials: true })
                setSong(response?.data?.song);
            }
            fetchSong();
        }
    }, [id]);

    return (
        <div className="flex justify-center w-full">
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

