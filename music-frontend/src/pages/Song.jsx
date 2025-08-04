import SongCard from "../components/SongCard";
import flowerImg from "../assets/images/flower-1.jpg"
import audio1 from "../assets/audios/no-copyright-music-382074.mp3";

const Song = () => {
    return (
        <div className="flex justify-center w-full">
            <SongCard
                title={"Zindagi Na Milegi Dobara"}
                from={"Zindagi Na Milegi Dobara"}
                image={flowerImg}
                audioSrc={audio1}
            />
        </div>
    )
}

export default Song;

