import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetchPreviewSongs } from "../actions/songActions";
import ListSongCard from "./ListSongCard";
import Spinner from "./Spinner";

const PreviewSongs = () => {
    const navigate = useNavigate();

    const [previewSongs, setPreviewSongs] = useState([]);
    const arr = new Array(4).fill(0);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetchPreviewSongs();
            if (response) {
                setPreviewSongs(response?.data?.songs);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading
                ? <Spinner />
                : <div>
                    <div className="flex flex-wrap mt-8 justify-center w-full gap-6">
                        {previewSongs.map((item) => (
                            <div
                                className="rounded-2xl border-slate-500 cursor-pointer bg-gradient-to-b from-slate-100 to-white/80 flex justify-between shadow-md"
                                onClick={() => { navigate("/Song/" + item._id); }}
                            >
                                <ListSongCard
                                    title={item.songName}
                                    from={item.albumName}
                                    image={item.songPoster}
                                />
                            </div>
                        ))}
                    </div>

                    <hr className="my-4 border-1 border-slate-500" />

                    <div className='text-center text-xl text-slate-800'>Login <Link to="/Login" className="text-blue-600 underline">here</Link> to listen more songs</div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center z-10 text-4xl">
                            🔐
                        </div>
                        <div className="flex flex-wrap justify-center opacity-20">
                            {arr.slice(0, 4).map(() => (
                                <div className="w-[32%] h-28 mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-gray-200 flex justify-between"></div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default PreviewSongs;

