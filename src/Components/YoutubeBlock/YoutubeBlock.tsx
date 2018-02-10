import * as React from 'react';


const SRC_URL = 'https://www.youtube.com/embed/';

const youtubeBlock = (props: any) => {
    let videos = null;

    if (props.videos) {
        videos =  <iframe title="video_yt"
                allowFullScreen={true}
                src={SRC_URL + props.videos}
                width="700"
                height="350" />;     
    }
    console.log('props videos ',props.videos);
    return (
        <div>
            {videos}
        </div>
    );
};

export default youtubeBlock;
