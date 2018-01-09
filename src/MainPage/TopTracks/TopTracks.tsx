import * as React from 'react';
import Track from '../Track/Track';
import './TopTracks.css';

const topTracks = (props: any) => {
    let tracks = null;
    if (props.topTracks) {
        tracks = props.topTracks.map((track: any, index: any) => {
            return <Track
                key={index}
                clicked={props.clicked}
                artistName={track.artist.name}
                listeners={track.listeners}
                trackName={track.name}
                playcount={track.playcount}
                img={track.image[3]['#text']}
            />
        });
    }
    return (
        <div className="toptracks">
            {tracks}
        </div>
    );
};

export default topTracks;
