import React, { createContext, useState} from "react";
import TrackList, { ITrackList } from "../assets/TrackList";


interface IAudioContext {
    audio: HTMLAudioElement;
    currentTrack: ITrackList;
    isPlaying: boolean;
    handleToggleAudio: (track: ITrackList) => void;
    nextTrack: (trackIndex: number) => void;
    previousTrack: (trackIndex: number) => void;
}

interface AudioProviderProps {
    children: React.ReactNode;
}


const defaultTrack: ITrackList = TrackList[0];
const audio: HTMLAudioElement = new Audio(defaultTrack.src);

export const AudioContext = createContext<IAudioContext>({
    audio,
    currentTrack: defaultTrack,
    isPlaying: false,
    handleToggleAudio: () => {},
    nextTrack: () => {},
    previousTrack: () => {},
});


const AudioProvider:React.FC<AudioProviderProps> = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState<ITrackList>(TrackList[0]);
    const [isPlaying, setPlaying] = useState<boolean>(false);

    const handleToggleAudio = (track: ITrackList) => {
        if (currentTrack.id !== track.id) {
            setCurrentTrack(track);
            setPlaying(true);
            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }

        if (isPlaying) {
            audio.pause();
            setPlaying(false);
        }
        else {
            audio.play();
            setPlaying(true);
        }
    };

    const nextTrack = (trackIndex: number) => {
        const nextTrackIndex = (trackIndex + 1) % TrackList.length;
        setCurrentTrack(TrackList[nextTrackIndex]);
        setPlaying(true);
        audio.src = TrackList[nextTrackIndex].src;
        audio.currentTime = 0;
        audio.play();
    };

    const previousTrack = (trackIndex: number) => {
        if (trackIndex === 0) {
            return;
        }
        const nextTrackIndex = (trackIndex - 1 + TrackList.length) % TrackList.length;
        setCurrentTrack(TrackList[nextTrackIndex]);
        setPlaying(true);
        audio.src = TrackList[nextTrackIndex].src;
        audio.currentTime = 0;
        audio.play();
    };

    const value: IAudioContext = {
        audio,
        currentTrack,
        isPlaying,
        handleToggleAudio,
        nextTrack,
        previousTrack,
    };

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioProvider;
