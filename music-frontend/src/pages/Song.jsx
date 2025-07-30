import SongCard from "../components/SongCard";
import flowerImg from "../assets/flower-1.jpg"

const Song = () => {
    return (
        <div className="flex justify-center w-full">
            <SongCard
                title={"Zindagi Na Milegi Dobara"}
                from={"Zindagi Na Milegi Dobara"}
                image={flowerImg}
            />
        </div>
    )
}

export default Song;

