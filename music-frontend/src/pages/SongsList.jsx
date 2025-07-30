import { useNavigate } from "react-router";
import flowerImg from "../assets/flower-1.jpg";
import SongCard from "../components/SongCard";

const SongsList = () => {
    const arr = new Array(20).fill(0);
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-center w-full my-8" >
                <div className="text-4xl text-slate-700 font-semibold">
                    Explore Songs
                </div>
            </div>

            <div className="flex flex-wrap mt-8 justify-center">
                {arr.map((item) => (
                    <div
                        className="w-[45%] mx-4 my-4 border-2 rounded-4xl border-slate-500 cursor-pointer bg-white"
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

    )
}

export default SongsList;

