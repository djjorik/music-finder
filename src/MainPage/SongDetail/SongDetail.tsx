import * as React from 'react';

const songDetail = (props: any) => {
    const SRC_URL = 'https://www.youtube.com/embed/';
    return (
        <div>
            <span>Some name...</span>
            <iframe title="video_yt"
                allowFullScreen={true}
                src={SRC_URL + props.id}
                width="700"
                height="350" />
        </div>
    );
};

export default songDetail;