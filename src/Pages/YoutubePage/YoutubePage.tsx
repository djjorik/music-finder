import * as React from 'react';
import SongDetail from '../../Components/SongDetail/SongDetail';
import { connect } from 'react-redux';

class YoutubePage extends React.Component<any, any> {
  render() {
    console.log(this.props);
    return (
      <div>
       <SongDetail
                  id={this.props.videoId}
                  trackName={this.props.queryYoutube}
                  allVideos={this.props.loadedVideos}
                />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  loadedVideos: state.loadedVideos,
  videoId: state.videoId,
  queryYoutube: state.queryYoutube,
});

export default connect(mapStateToProps)(YoutubePage);
