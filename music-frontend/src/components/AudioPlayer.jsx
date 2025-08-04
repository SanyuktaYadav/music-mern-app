import { faPause, faPlay, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(new Audio(audioSrc));

    // Update progress, current time, and duration on timeupdate event
    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress((audio.currentTime / audio.duration) * 100);
            setCurrentTime(audio.currentTime); // Update current time as the audio plays
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        const resetToPlay = () => {
            setIsPlaying(false); // Reset play/pause to "Play" when the audio ends
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', resetToPlay); // Listen for the 'ended' event

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', resetToPlay); // Cleanup the event listener
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (event) => {
        const newProgress = event.target.value;
        setProgress(newProgress);
        const audio = audioRef.current;
        audio.currentTime = (newProgress / 100) * audio.duration;
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        const audio = audioRef.current;
        audio.volume = newVolume;
    };

    // Helper function to format time in hh:mm:ss format
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className='flex items-start p-2 m-2 rounded-lg shadow-lg flex-col bg-slate-600'>
            {/* Play/Pause Button */}
            <div className="flex items-center m-2">
                <button
                    onClick={togglePlayPause}
                    className="cursor-pointer p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none transition-colors"
                >
                    <FontAwesomeIcon
                        icon={isPlaying ? faPause : faPlay}
                        className="text-2xl text-gray-700"
                    />
                </button>

                {/* Progress Bar and Time Display */}

                {/* Progress Bar */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="cursor-pointer bg-gray-300 rounded-lg ml-1"
                />

                {/* Time Display */}
                <p className="text-white text-sm">{`${formatTime(currentTime)} | ${formatTime(duration)}`}</p>

                {/* Volume Control */}
                <FontAwesomeIcon icon={faVolumeOff} className='ml-2' />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="cursor-pointer ml-1w-24 h-2 bg-gray-300 rounded-lg"
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
