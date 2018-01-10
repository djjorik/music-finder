import * as React from 'react';
import axios from 'axios';
import * as Rx from 'rxjs';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import './MainPage.css';
import SearchBlock from './SearchBlock/SearchBlock';
import TopTracks from './TopTracks/TopTracks';
import SongDetail from './SongDetail/SongDetail';
import Track from './Track/Track';

const LAST_FM_APY_KEY = 'c06728309b384d47ffce7566b4e78801';
const LAST_FM_URL = 'http://ws.audioscrobbler.com';
const YOUTUBE_API_KEY = 'AIzaSyAPQY0EXQZANMSWHlAaozIKNu7_CWN0DrU';
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search?part=id&q=';

class MainPage extends React.Component<any, any> {
    state = {
        topTracks: [],
        foundTracks: [],
        value: '',
        loaded: false,
        videoId: '',
        searched: '',
        query: '',
        loadedVideos: []
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
                this.setState({
                    searched: res
                });
            });
    }

    getTopTracks = () => {
        axios.get(LAST_FM_URL + '/2.0/?method=chart.gettoptracks&api_key=' + LAST_FM_APY_KEY + '&format=json')
            .then(res => {
                this.setState({
                    topTracks: res.data.tracks.track
                });
                console.warn(res);
            })
            .catch(err => {
                console.warn(err);
            });
    }

    findTracks = (q: any) => {

        axios.get(LAST_FM_URL + '/2.0/?method=track.search&track=' + q + '&api_key=' + LAST_FM_APY_KEY + '&format=json')
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
    }

    findYoutubeVideo = (q: any) => {
        
        axios.get(YOUTUBE_URL + q + '&type=video&key=' + YOUTUBE_API_KEY)
            .then(res => {
                console.warn(res);
                this.setState({
                    loadedVideos: res.data.items,
                    videoId: res.data.items[0].id.videoId,
                    query: q
                });
                this.props.history.push('/video');
            })
            .catch(err => {
                console.warn(err);
            });
    }

    inputHandler = (event: any) => {
        if (this.state.value.trim() === '') {
            this.setState({
                loaded: false
            });
        }
        this.setState({
            value: event.target.value
        });
        this.onSearch$.next(event.target.value);
    }

    render() {
        let tracks: any = <TopTracks topTracks={this.state.topTracks} clicked={this.findYoutubeVideo} />;
        if (this.state.foundTracks && this.state.foundTracks.length > 0 && this.state.value.trim() !== '' && this.state.loaded) {
            tracks = this.state.foundTracks.map((track: any, index) => {
                return <Track
                    key={index}
                    clicked={this.findYoutubeVideo}
                    artistName={track.artist}
                    trackName={track.name}
                    playcount={track.listeners}
                    img={track.image[3]['#text']} />;
            });
        };

        return (
            <div>
                {/* <Route path="/video"  render={() => <SongDetail id={this.state.videoId}/>}/> */}
                <div>
                    <Switch>
                        <Route exact path='/video' render={() =>
                            <SongDetail id={this.state.videoId} trackName={this.state.query} allVideos={this.state.loadedVideos} />
                        } />
                        <Route exact path='/' render={() => (
                            <div>
                                <SearchBlock
                                    value={this.state.value}
                                    onChanged={(event: any) => this.inputHandler(event)}
                                    searched={this.state.searched} />
                                <div className="tracks">
                                    {tracks}
                                </div>

                            </div>
                        )} />
                        <Route render={() => <h1>Страница не найдена</h1>} />
                    </Switch>
                </div>



            </div>
        );
    }
}

export default withRouter(MainPage);