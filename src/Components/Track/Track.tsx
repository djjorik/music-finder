import * as React from 'react';
import './Track.css';

export interface ITrack {
    isAuth: boolean;
    addTrackToPlaylist: any;
    artistName: String;
    trackName: String;
    img: any;
    clicked: any;
    playcount: String;
    listeners?:any;
}

const track = (props: ITrack) => {
    let buttonAdd = null;
    if (props.isAuth) {
        buttonAdd = <button className="add"
        onClick={() =>
            props.addTrackToPlaylist(props.artistName, props.trackName)}></button>;
    }

    return (
        <div className="track" >
            <div className="img-container" >
                <img src={props.img} alt="NO IMAGE" />
            </div>
            <div className="trackDetails">
                <div className="artistName">
                    <span>{props.artistName}</span>
                </div>
                <div className="trackName">
                    <span>{props.trackName} </span>
                </div>
                <div className="menu">
                    <button className="play"
                        onClick={() => props.clicked(props.trackName)}></button>
                    {buttonAdd}
                </div>
                <div className="playCount" >
                    <span> Прослушано: {props.playcount} раз</span>
                </div>
            </div>
        </div>
    );
};

export default track;
