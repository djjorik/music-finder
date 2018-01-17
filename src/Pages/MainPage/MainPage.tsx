import * as React from 'react';
import * as action from '../../Actions/Actions'
import * as Rx from 'rxjs';

import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import './MainPage.css';
import SearchBlock from "../../Components/SearchBlock/SearchBlock";
import Tracks from "../../Components/Tracks/Tracks";
// import SongDetail from "./SongDetail/SongDetail";
// import TrackWrapper from "./TracksWrapper/TrackWrapper";
// import Track from './Track/Track';

const LAST_FM_APY_KEY = "c06728309b384d47ffce7566b4e78801";
const LAST_FM_URL = "http://ws.audioscrobbler.com";
const YOUTUBE_API_KEY = "AIzaSyAPQY0EXQZANMSWHlAaozIKNu7_CWN0DrU";
const YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?part=id&q=";

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
const mapDispatchToProps = (dispatch: any)  => {
  return {
    loadTopTracks: action.loadTopTracks,
    findTracks: (payload:any) => dispatch(action.findTracks(payload)),
    loadSearced: (payload:any) => dispatch(action.loadSearched(payload)),
    findYoutubeVideo:action.findYoutubeVideo
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
        // this.setState({
        //   searched: res
        // });
        this.props.loadSearced(res);
      });
  }

  getTopTracks = () => {
    axios
      .get(
        LAST_FM_URL +
          "/2.0/?method=chart.gettoptracks&api_key=" +
          LAST_FM_APY_KEY +
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
        LAST_FM_URL +
          "/2.0/?method=track.search&track=" +
          q +
          "&api_key=" +
          LAST_FM_APY_KEY +
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
      .get(YOUTUBE_URL + q + "&type=video&key=" + YOUTUBE_API_KEY)
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
          {/* <SongDetail
            id={this.state.videoId}
            trackName={this.state.query}
            allVideos={this.state.loadedVideos}
            tracks={this.state.foundTracks}
            clicked={this.findYoutubeVideo}
            loaded={this.state.loaded}
          />
          <TrackWrapper
            value={this.state.value}
            onChanged={(event: any) => this.inputHandler(event)}
            searched={this.state.searched} />*/}
          
          {/* <div>
            <SearchBlock
              value={this.state.value}
              onChanged={(event: any) => this.inputHandler(event)}
              searched={this.state.searched}
            />
            <div className="tracks">{tracks}</div>
          </div> */}
          {/* <Switch>
            <Route
              exact
              path="/video"
              render={() => (
                <SongDetail
                  id={this.state.videoId}
                  trackName={this.state.query}
                  allVideos={this.state.loadedVideos}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <SearchBlock
                    value={this.state.value}
                    onChanged={(event: any) => this.inputHandler(event)}
                    searched={this.state.searched}
                  />
                  <div className="tracks">{tracks}</div>
                </div>
              )}
            />
            <Route render={() => <h1>Страница не найдена</h1>} />
          </Switch> */}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect<any, any, OwnProps>(mapStateToProps, mapDispatchToProps)(MainPage)
);
