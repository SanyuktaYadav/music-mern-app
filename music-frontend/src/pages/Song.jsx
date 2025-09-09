import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MainSongCard from "../components/MainSongCard";
import { fetchSongById } from "../actions/songActions";
import Spinner from "../components/Spinner";

const Song = () => {
    const { id } = useParams();
    const [song, setSong] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchSong = async () => {
                setIsLoading(true);
                const response = await fetchSongById(id);
                if (response) {
                    setSong(response?.data?.song);
                }
                setIsLoading(false);
            }
            fetchSong();
        }
    }, [id]);

    return (
        <>
            {isLoading ?
                <Spinner marginTopClass="mt-60"/>
                : <div className="flex justify-center items-center w-full h-[80vh]">
                    {song &&
                        (
                            <MainSongCard
                                title={song.songName}
                                from={song.albumName}
                                image={song.songPoster}
                                audioSrc={song.songAudioFile}
                                songId={song._id}
                            />
                        )
                    }
                </div>
            }
        </>
    )
}

export default Song;

