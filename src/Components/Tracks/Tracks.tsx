import * as React from 'react';
import Track, { ITrack } from '../Track/Track';
import './Tracks.css';

interface ITracks {
    tracks: ITrack[];
    clicked: any;
    isAuth: boolean;
    addTrackToPlaylist: any;
}

const tracks = (props: ITracks) => {
    let tracks = null;
    if (props.tracks.length > 0) {
        tracks = props.tracks.map((track: any, index: any) => {
            return <Track
                key={index}
                clicked={props.clicked}
                isAuth={props.isAuth}
                addTrackToPlaylist={props.addTrackToPlaylist}
                artistName={track.artist.name ? track.artist.name : track.artist}
                listeners={track.listeners}
                trackName={track.name}
                playcount={track.playcount}
                img={track.image[3]['#text']}
            />;
        });
    }

    return (
        <div className="Tracks">
            {tracks}
        </div>
    );
};

export default tracks;
