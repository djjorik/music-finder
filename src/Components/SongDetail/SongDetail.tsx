import * as React from 'react';
import './SongDetail.css';

interface ISongDetail {
    trackName: String;
    allVideos: any[];
    id?: String;
}

const songDetail = (props: ISongDetail) => {
    const SRC_URL = 'https://www.youtube.com/embed/';
    let trackName = null;
    if (props.trackName !== '') {
        trackName = props.trackName;
    }
    let videos = null;
    if (props.allVideos.length > 0) {
        videos = props.allVideos.map((video: any, index: number) => {
            return <iframe title="video_yt"
            key={index}
            allowFullScreen={true}
            src={SRC_URL + video.id.videoId}
            width="700"
            height="350" />;
        });
    }

    return (
        <div className="songDetail">
            <div className="title">
                <span>{trackName}</span>
            </div>
            {videos}
        </div>
    );
};

export default songDetail;
