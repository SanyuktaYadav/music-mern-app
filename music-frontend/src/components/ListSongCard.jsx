const ListSongCard = ({ title, from, image }) => {
    return (
        <div className="my-8 mx-4 p-4 flex gap-4 items-center rounded-md w-80 overflow-hidden">
            {/* Image */}
            {image && (
                <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <img src={image} alt="song" className="w-full h-full object-cover" />
                </div>
            )}

            {/* Text content */}
            <div className="flex-1 min-w-0">
                <div className="text-xl font-semibold text-slate-600 break-words">
                    {title}
                </div>
                {from && (
                    <div className="text-gray-400 mt-1">
                        – From {from}
                    </div>
                )}
            </div>

        </div>
    );
};

export default ListSongCard;
