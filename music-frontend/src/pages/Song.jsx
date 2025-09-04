import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MainSongCard from "../components/MainSongCard";
import { fetchSongById } from "../actions/songActions";

const Song = () => {
    const { id } = useParams();
    const [song, setSong] = useState();

    useEffect(() => {
        if (id) {
            const fetchSong = async () => {
                const response = await fetchSongById(id);
                if (response) {
                    setSong(response?.data?.song);
                }
            }
            fetchSong();
        }
    }, [id]);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {song &&
                (
                    <MainSongCard
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

