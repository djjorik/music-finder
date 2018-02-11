import * as React from 'react';
import * as Rx from 'rxjs';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import Notification from '../../Components/Notification/Notification';
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
  isAuth: state.isAuth,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    findYoutubeVideo: (payload: any) => {
      dispatch(action.findYoutubeVideo(payload));
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
    notify: '',
    notifyState: 0,
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
        this.props.findYoutubeVideo(q);
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

  addTrackToPlaylist = (artistName: string, trackName: string) => {
    const payload = {
      username: '123',
      songname: trackName,
      artistname: artistName,
    };
    let token = localStorage.getItem('my-token');
    if (token == null) {
      token = '';
    }
    const headers = {
      Authorization: token,
    };
    axios.post('http://localhost:8000/add-track', payload,  { headers })
      .then((res) => {
        this.setNotify(trackName + ' added to playlist');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clearNotify = () => {
    this.setState({ notify: '' });

  }

  setNotify = (message: any) => {
    if (this.state.notifyState !== 0) {
      clearTimeout(this.state.notifyState);
    }
    this.setState({ notify: message });
    const notifyTmeout = setTimeout(this.clearNotify, 1500);
    this.setState({ notifyState: notifyTmeout });
    
  }

  render() {
    let tracks = (
      <Tracks tracks={this.state.topTracks} clicked={this.findYoutubeVideo}
      addTrackToPlaylist={this.addTrackToPlaylist} isAuth={this.props.isAuth}/>
    );
    if (
      this.state.foundTracks.length > 0 &&
      this.state.inputValue.trim() !== '' &&
      this.state.loaded
    ) {
      tracks = (
        <Tracks
          tracks={this.state.foundTracks}
          clicked={this.findYoutubeVideo}
          addTrackToPlaylist={this.addTrackToPlaylist}
          isAuth={this.props.isAuth}
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
        <Notification notify={this.state.notify}/>
      </div>
    );
  }
}

export default withRouter(
  connect<any, any, OwnProps>(mapStateToProps, mapDispatchToProps)(MainPage),
);

