import { useNavigate } from "react-router";
import flowerImg from "../assets/images/flower-1.jpg";
import SongCard from "./SongCard";

const PreviewSongs = () => {
    const arr = new Array(4).fill(0);
    const navigate = useNavigate();

    return (

        <div>
            <div className='border-b-2 mx-4'>
                <div className='mt-8 mx-8'>Login to listen more Songs</div>
                <div className="flex flex-wrap justify-center">
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
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap justify-center">
                {arr.slice(0, 4).map((item) => (
                    <div className="w-[45%] h-24 mx-4 my-4 border-2 rounded-2xl border-slate-500 cursor-pointer bg-gray-200 flex justify-between">
                    </div>
                ))}
            </div>
        </div>

    )
}

export default PreviewSongs;

