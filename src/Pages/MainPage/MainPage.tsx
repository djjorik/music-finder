import * as React from 'react';
import * as Rx from 'rxjs';
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import './MainPage.css';
import * as urlConstants from '../../Constants/UrlConstants';
import * as action from '../../Actions/Actions'
import SearchBlock from "../../Components/SearchBlock/SearchBlock";
import Tracks from "../../Components/Tracks/Tracks";


type OwnProps = RouteComponentProps<{ user: string }>;

const mapStateToProps = (state: any, ownProps: OwnProps) => ({
  topTracks: state.topTracks,
  foundTracks: state.foundTracks,
  loadedVideos: state.loadedVideos,
  value: state.value,
  loaded: state.loaded,
  videoId: state.videoId,
  searched: state.searched,
  query: state.query
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    loadTopTracks: (payload: any) => dispatch(action.loadTopTracks(payload)),
    findTracks: (payload: any) => dispatch(action.findTracks(payload)),
    loadSearced: (payload: any) => dispatch(action.loadSearched(payload)),
    findYoutubeVideo: (payload: any) => dispatch(action.findYoutubeVideo(payload))
  }
}

type PropsType = any & any & OwnProps;

// & RouteProps
class MainPage extends React.Component<PropsType, any> {
  state = {
    topTracks: [],
    foundTracks: [],
    loadedVideos: [],
    value: "",
    loaded: false,
    videoId: "",
    searched: "",
    query: ""

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
      .subscribe(res => {
        this.findTracks(res);
        this.props.loadSearced(res);
      });
  }

  getTopTracks = () => {
    axios
      .get(
      urlConstants.LAST_FM_URL +
      "/2.0/?method=chart.gettoptracks&api_key=" +
      urlConstants.LAST_FM_APY_KEY +
      "&format=json"
      )
      .then(res => {
        this.setState({
          topTracks: res.data.tracks.track
        });
        console.warn(res);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  findTracks = (q: any) => {
    axios
      .get(
      urlConstants.LAST_FM_URL +
      "/2.0/?method=track.search&track=" +
      q +
      "&api_key=" +
      urlConstants.LAST_FM_APY_KEY +
      "&format=json"
      )
      .then(res => {
        this.setState({
          foundTracks: res.data.results.trackmatches.track,
          loaded: true,
          searched: q
        });
      })
      .catch(err => {
        console.warn(err);
      });
  };

  findYoutubeVideo = (q: any) => {
    axios
      .get(urlConstants.YOUTUBE_URL + q + "&type=video&key=" + urlConstants.YOUTUBE_API_KEY)
      .then(res => {
        console.warn(res);
        this.setState({
          loadedVideos: res.data.items,
          videoId: res.data.items[0].id.videoId,
          query: q
        });
        this.props.history.push("/video");
      })
      .catch(err => {
        console.warn(err);
      });
  };

  inputHandler = (event: any) => {
    if (this.state.value.trim() === "") {
      this.setState({
        loaded: false
      });
    }
    this.setState({
      value: event.target.value
    });
    this.onSearch$.next(event.target.value);
  };

  render() {
    console.log("searched: " + this.props.searched);
    let tracks = (
      <Tracks tracks={this.state.topTracks} clicked={this.findYoutubeVideo} />
    );
    if (
      this.state.foundTracks &&
      this.state.foundTracks.length > 0 &&
      this.state.value.trim() !== "" &&
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
            value={this.state.value}
            onChanged={(event: any) => this.inputHandler(event)}
            searched={this.state.searched}
          />
          <div className="tracks">{tracks}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect<any, any, OwnProps>(mapStateToProps, mapDispatchToProps)(MainPage)
);
