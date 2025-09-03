import AudioPlayer from "./AudioPlayer";

const SongCard = ({ title, from, image, small, audioSrc }) => {
    return (
        <div className="text-center my-8 flex gap-8 m-4 items-center">
            {image && <div className={`${small ? "w-18 h-18" : "w-78 h-78"} border-amber-50 border`}>
                <img src={image} alt="" className="w-full h-full object-cover" />
            </div>}

            <div>
                <div className={`${small ? "text-xl" : "text-4xl"} font-semibold text-slate-600`}>
                    {title}
                </div>
                {from && <div className="text-gray-400 mt-1">
                    - From {from}
                </div>}
                {audioSrc &&
                    <AudioPlayer audioSrc={audioSrc} />
                }
            </div>
        </div>
    )
}

export default SongCard;