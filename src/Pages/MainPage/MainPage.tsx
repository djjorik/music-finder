import * as React from 'react';
import * as Rx from 'rxjs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import './MainPage.css';
import * as urlConstants from '../../Constants/UrlConstants';
import * as action from '../../Actions/Actions';
import SearchBlock from '../../Components/SearchBlock/SearchBlock';
import Tracks from '../../Components/Tracks/Tracks';


type OwnProps = RouteComponentProps<any>;
type PropsType = any & any & OwnProps;

const mapStateToProps = (state: any, ownProps: OwnProps) => ({
  loadedVideos: state.loadedVideos,
  videoId: state.videoId, 
  queryYoutube: state.queryYoutube,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    findYoutubeVideo: (payload: any) => {
      dispatch(action.findYoutubeVideo(payload));
      // dispatch(action.loadedVideo(payload.loadedVideos));
      // dispatch(action.videoId(payload.videoId));
    },
  };
};

class MainPage extends React.Component<PropsType, any> {
  state = {
    topTracks: [],
    foundTracks: [],
    inputValue: '',
    loaded: false,
    searchedTitle: '',
  };
  onSearch$ = new Rx.Subject();
  subscription: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.getTopTracks();

    this.subscription = this.onSearch$
      .debounceTime(700)
      .distinctUntilChanged()
      .subscribe((res) => {
        this.findTracks(res);
        this.setState({
          searchedTitle: res,
        });
      });
  }

  getTopTracks = () => {
    axios
      .get(
      urlConstants.LAST_FM_URL +
      '/2.0/?method=chart.gettoptracks&api_key=' +
      urlConstants.LAST_FM_APY_KEY +
      '&format=json',
      )
      .then((res) => {
        this.setState({
          topTracks: res.data.tracks.track,
        });
        console.warn(res);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  findTracks = (q: any) => {
    axios
      .get(
      urlConstants.LAST_FM_URL +
      '/2.0/?method=track.search&track=' +
      q +
      '&api_key=' +
      urlConstants.LAST_FM_APY_KEY +
      '&format=json',
      )
      .then((res) => {
        this.setState({
          foundTracks: res.data.results.trackmatches.track,
          loaded: true,
          searchedTitle: q,
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  findYoutubeVideo = (q: any) => {
    // axios
    //   .get(urlConstants.YOUTUBE_URL + q + '&type=video&key=' + urlConstants.YOUTUBE_API_KEY)
    //   .then(res => {
    //     console.warn(res);

    //     const youtubeLoad = {
    //       loadedVideos: res.data.items,
    //       videoId: res.data.items[0].id.videoId,
    //       queryYoutube: q
    //     };
        this.props.findYoutubeVideo(q);
        // this.props.history.push('/video');
      // })
      // .catch(err => {
      //   console.warn(err);
      // });
  }

  inputHandler = (event: any) => {
    if (this.state.inputValue.trim() === '') {
      this.setState({
        loaded: false,
      });
    }
    this.setState({
      inputValue: event.target.value,
    });
    this.onSearch$.next(event.target.value);
  }

  render() {
    let tracks = (
      <Tracks tracks={this.state.topTracks} clicked={this.findYoutubeVideo} />
    );
    if (
      // this.state.foundTracks &&
      this.state.foundTracks.length > 0 &&
      this.state.inputValue.trim() !== '' &&
      this.state.loaded
    ) {
      tracks = (
        <Tracks
          tracks={this.state.foundTracks}
          clicked={this.findYoutubeVideo}
        />
      );
    }

    return (
      <div>
        <div>
          <SearchBlock
            value={this.state.inputValue}
            onChanged={(event: any) => this.inputHandler(event)}
            searchedTitle={this.state.searchedTitle}
          />
          <div className="tracks">{tracks}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect<any, any, OwnProps>(mapStateToProps, mapDispatchToProps)(MainPage),
);
