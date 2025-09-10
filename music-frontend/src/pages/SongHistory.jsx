import moment from 'moment';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { fetchSongHistory } from "../actions/songHistoryActions.js";
import Spinner from "../components/Spinner.jsx";

const SongHistory = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const navigate = useNavigate();
    const [songHistory, setSongHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = !!currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                setIsLoading(true);
                const response = await fetchSongHistory();
                if (response.status === 200) {
                    setSongHistory(response?.data?.history);
                }
                setIsLoading(false);
            }
        }
        fetchData();
    }, [isLoggedIn]);

    const formatDate = (dateString) => {
        return moment(dateString).format('MMM DD, YYYY, hh:mm A');
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className='mt-18 mb-4 w-full' >
                <div className="flex justify-center" >
                    <div className="text-4xl text-slate-700 font-semibold">
                        Song History
                    </div>
                </div>
            </div>

            {isLoading
                ? <Spinner />
                : <div className="flex flex-col mt-8 justify-center items-center gap-2">
                    {songHistory.map((item) => {
                        const song = item?.song;

                        return (
                            <div
                                key={item._id}
                                className={`w-[70%] rounded-2xl border-slate-500 ${song ? 'cursor-pointer' : ''} bg-gradient-to-b from-slate-100 to-white/80 flex justify-start shadow-md`}
                                onClick={() => { song ? navigate("/Song/" + item.song._id) : null }}
                            >
                                {song &&
                                    <img src={song.songPoster} alt="song" className="w-24 h-24 object-cover p-4" />
                                }

                                <div className="flex flex-1 justify-between items-center gap-1">
                                    {song &&
                                        (<div className="flex flex-col">
                                            <div className="text-xl font-semibold text-slate-600 text-base">
                                                {song.songName}
                                            </div>
                                            From: {song.albumName}
                                        </div>)
                                    }
                                    {!song &&
                                        (<div>
                                            <div className="mx-12 p-4 text-xl font-semibold text-slate-600">
                                                {item.songName + " song deleted"}
                                            </div>
                                        </div>)
                                    }
                                    <div className='p-4'>
                                        {formatDate(item?.playedAt)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default SongHistory;

