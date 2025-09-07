import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { fetchSongHistory } from "../actions/songHistoryActions.js";
import { useNavigate } from "react-router";
import moment from 'moment';

const SongHistory = () => {
    const currentUser = useSelector(state => state.currentUser.user);
    const navigate = useNavigate();
    const [songHistory, setSongHistory] = useState([]);

    const isLoggedIn = !!currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                const response = await fetchSongHistory();
                setSongHistory(response?.data?.history);
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

            <div className="flex flex-wrap mt-8 justify-center w-full">
                {songHistory.map((item) => {
                    const song = item?.song;

                    return (
                        <div
                            key={item._id}
                            className={`w-full mx-20 my-4 p-4 rounded-2xl border-slate-500 ${song ? 'cursor-pointer' : ''} bg-gradient-to-b from-slate-100 to-white/80 flex justify-start flex-wrap shadow-md`}
                            onClick={() => { song ? navigate("/Song/" + item.song._id) : null }}
                        >
                            {song &&
                                <img src={song.songPoster} alt="song" className="w-24 h-24 object-cover mx-12" />
                            }

                            <div className="my-2 flex flex-1 justify-between items-center">
                                {song &&
                                    (<div>
                                        <span className="text-xl font-semibold text-slate-600">
                                            {song.songName}
                                        </span><br />
                                        Album Name: {song.albumName} <br />
                                    </div>)
                                }
                                {!song &&
                                    (<div>
                                        <span className="mx-12 text-xl font-semibold text-slate-600">
                                            {item.songName + " Song Deleted"}
                                        </span>
                                    </div>)
                                }
                                <div className="mx-8">
                                    {formatDate(item?.playedAt)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default SongHistory;

