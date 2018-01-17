import * as React from "react";
import SongDetail from '../../Components/SongDetail/SongDetail';

class YoutubePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
       <SongDetail
                  id={this.props.videoId}
                  trackName={this.props.query}
                  allVideos={this.props.loadedVideos}
                />
      </div>
    );
  }
}

export default YoutubePage;
