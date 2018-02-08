import * as React from 'react';
import './Track.css';

const track = (props: any) => {
    return (
        <div className="track" onClick={() => props.clicked(props.trackName)}>
            <div className="img-container">
                <img src={props.img} alt="NO IMAGE" />
            </div>

            <div className="trackDetails">
                <div className="artistName">
                    <span>{props.artistName}</span>
                </div>
                <div className="trackName">
                    <span>{props.trackName} </span>
                </div>
                <div className="playCount">
                    <span> Прослушано: {props.playcount} раз</span>
                </div>
            </div>

        </div>
    );
};

export default track;
