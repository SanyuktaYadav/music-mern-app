import AudioPlayer from "./AudioPlayer";

const MainSongCard = ({ title, from, image, audioSrc, songId }) => {
    return (
        <div className="text-center my-8 mx-4 flex flex-col md:flex-row gap-8 items-center">
            {image && <div className="w-80 h-80 border-amber-50 border">
                <img src={image} alt="" className="w-full h-full object-cover" />
            </div>}

            <div>
                <div className="text-xl font-semibold text-slate-600">
                    {title}
                </div>
                {from && <div className="text-gray-400 mt-1">
                    - From {from}
                </div>}
                {audioSrc &&
                    <AudioPlayer audioSrc={audioSrc} songId={songId} />
                }
            </div>
        </div>
    )
}

export default MainSongCard;