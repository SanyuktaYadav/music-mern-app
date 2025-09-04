import { Link, useNavigate } from "react-router";
import SongCard from "./SongCard";
import { useEffect, useState } from "react";
import { fetchPreviewSongs } from "../actions/songActions";

const PreviewSongs = () => {
    const [previewSongs, setPreviewSongs] = useState([]);
    const arr = new Array(4).fill(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchPreviewSongs();
            if (response) {
                setPreviewSongs(response?.data?.songs);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-center border-b-2">
                {previewSongs.map((item) => (
                    <div
                        className="w-[45%] mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-white flex justify-between"
                        onClick={() => { navigate("/Song/" + item._id); }}
                    >
                        <SongCard
                            title={item.songName}
                            from={item.albumName}
                            image={item.songPoster}
                            small
                        />
                    </div>
                ))}
            </div>
            <div className='mt-8 mx-12 text-xl'>Login <Link to="/Login" className="text-blue-600 underline">here</Link> to listen more songs</div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center z-10 text-4xl">
                    🔐
                </div>
                <div className="flex flex-wrap justify-center opacity-20">
                    {arr.slice(0, 4).map(() => (
                        <div className="w-[45%] h-24 mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-gray-200 flex justify-between">
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default PreviewSongs;

