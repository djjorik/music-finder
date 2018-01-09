import * as React from 'react';
import axios from 'axios';
import * as Rx from 'rxjs';
import { Switch, Route } from 'react-router-dom';
// import { withRouter } from 'react-router';

// import SearchBlock from './SearchBlock/SearchBlock';
// import TopTracks from './TopTracks/TopTracks';
// import SongDetail from './SongDetail/SongDetail';

const LAST_FM_APY_KEY = 'c06728309b384d47ffce7566b4e78801';
const LAST_FM_URL = 'http://ws.audioscrobbler.com';
const YOUTUBE_API_KEY = 'AIzaSyAPQY0EXQZANMSWHlAaozIKNu7_CWN0DrU';
const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search?part=id&q=';

class MainPage extends React.Component {
    state = {
        topTracks: [],
        foundTracks: [],
        value: '',
        loaded: false,
        videoId: ''
    };
    onSearch$ = new Rx.Subject();
    subscription: any;

   

    constructor (props: any) {
        super(props);
    }

    componentDidMount () {
        this.getTopTracks();
        this.subscription = this.onSearch$
        .debounceTime(700)
        .distinctUntilChanged()
        .subscribe(res => {
            this.findTracks(res);
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
                loaded: true
            });
        })
        .catch(err => {
            console.warn(err);
        });
    }

    findYoutubeVideo = (q: any) => {
        console.warn(q);
        axios.get(YOUTUBE_URL + q + '&type=video&key=' + YOUTUBE_API_KEY)
            .then(res=> {
                console.warn(res);
                this.setState({
                    videoId: res.data.items[0].id.videoId
                });
                // this.props.history.push('/video/123');
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
        // let tracks: any = <TopTracks topTracks={this.state.topTracks} clicked={this.findYoutubeVideo}/>;
        // if (this.state.foundTracks && this.state.foundTracks.length > 0 && this.state.value.trim() !== '' && this.state.loaded) {
        //     tracks = this.state.foundTracks.map((track: any, index) => {
        //         return <div key={index}>{track.name}</div>;
        //     });
        // };
        
        return (
            <div>
    {/* <Route path="/video"  render={() => <SongDetail id={this.state.videoId}/>}/> */}
    <div>
    <Switch>
                    <Route exact path='/albums' render={() => (
                        <div>
                            Hello
                        </div>
                    )} />
                    <Route exact path='/' render={() => (
                        <div>
                            Hello
                        </div>
                    )} />
                    <Route render={() => <h1>Страница не найдена</h1>} />
                </Switch>
    </div>
    
                
                {/* <SearchBlock value={this.state.value}  onChanged={(event: any) => this.inputHandler(event)}/>
                <span>Its main page now</span>
                {tracks} */}
            </div>
        );
    }
}

export default MainPage;