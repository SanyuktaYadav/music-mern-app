import AudioPlayer from "./AudioPlayer";

const MainSongCard = ({ title, from, image, audioSrc, songId }) => {
    return (
        <div className="text-center flex flex-col md:flex-row gap-8 items-center mt-30">
            {image &&
                <img src={image} alt={title} className="w-80 h-80 border-amber-50 border object-cover mx-2" />
            }

            <div>
                <div className="text-xl font-semibold text-slate-600">
                    {title}
                </div>
                {from && <div className="text-gray-600 mt-1 text-sm">
                    From {from}
                </div>}
                {audioSrc &&
                    <AudioPlayer audioSrc={audioSrc} songId={songId} />
                }
            </div>
        </div>
    )
}

export default MainSongCard;