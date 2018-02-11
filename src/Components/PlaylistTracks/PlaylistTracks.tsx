import * as React from 'react';
import './PlaylistTracks.css';

interface IPlaylistTracks {
    tracks: Object[];
    findYoutubeVideo: any;
    deleteTrack:any;
}

const playlistTracks = (props: IPlaylistTracks) => {
    let tracks = null;
    if (props.tracks.length > 0) {
        tracks = props.tracks.map((track: any, index: any) => {
            return <div className="row" key={index}>
                <div className="column-1">
                    <span>{track.artistname}</span>
                </div>
                <div className="column-2">
                    <span>{track.trackname}</span>
                </div>
                <div className="column-3">
                    <span onClick={() => props.findYoutubeVideo(track.trackname)}>Play</span>
                </div>
                <div className="column-3">
                    <span onClick={() =>
                        props.deleteTrack(track.trackname, track.artistname)}>Delete</span>
                </div>
            </div>;
        });
    }


    return (
        <div className="PlaylistTracks">
            <div className="table">
                <div className="table-head">
                    <div className="column-1">
                        <span>ArtistName</span>
                    </div>
                    <div className="column-2">
                        <span>TrackName</span>
                    </div>
                    <div className="column-3">
                        <span>Play</span>
                    </div>
                    <div className="column-4">
                        <span>Delete</span>
                    </div>
                </div>
                <div className="table-content">
                    {tracks}
                </div>
            </div>

        </div>
    );
};
export default playlistTracks;
