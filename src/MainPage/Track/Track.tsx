import * as React from 'react';
import './Track.css';

const track = (props: any) => {
    return (
        <div className="track" onClick={() => props.clicked(props.trackName)}>
            <img src={props.img} alt="NO IMAGE"/>
            <br/>
            <span>ARTISTNAME</span><br/>
            {props.artistName} <br/>
            
            <span>LISTENERS</span><br/>
            {props.listeners} <br/>
            <span>TRACKANEM</span><br/>
            {props.trackName}   <br/>  
            <span>PLAYCOUNT</span><br/>
            {props.playcount} <br/>
        </div>
    );
};

export default track;