import * as React from 'react';

const SRC_URL = 'https://www.youtube.com/embed/';

interface IYoutubeBlock {
    videos: String;
}

const youtubeBlock = (props: IYoutubeBlock) => {
    let videos = null;
    if (props.videos !== '') {
        videos = <iframe title="video_yt"
            allowFullScreen={true}
            src={SRC_URL + props.videos}
            width="700"
            height="350" />;
    }

    return (
        <div>
            {videos}
        </div>
    );
};

export default youtubeBlock;
