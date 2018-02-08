import * as React from 'react';
import Track from '../Track/Track';
import './Tracks.css';

const tracks = (props: any) => {
    let tracks = null;
    if (props.tracks) {
        tracks = props.tracks.map((track: any, index: any) => {
            return <Track
                key={index}
                clicked={props.clicked}
                artistName={track.artist.name}
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
