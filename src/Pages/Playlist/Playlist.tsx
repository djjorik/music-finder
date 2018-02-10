import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PlaylistTracks from './../../Components/PlaylistTracks/PlaylistTracks';
import * as urlConstants from '../../Constants/UrlConstants';
import YoutubeBlock from '../../Components/YoutubeBlock/YoutubeBlock';
const api = 'http://localhost:8000';


class Playlist extends React.Component<any, any> {
    state = {
        tracks: [],
        videos: '',
    };

    componentDidMount() {
        this.getPlaylist();
    }

    getPlaylist = () => {
        let token = localStorage.getItem('my-token');
        if (token == null) {
            token = '';
        }
        const headers = {
            Authorization: token,
        };
        axios.get(api + '/get-playlist', { headers })
            .then((res) => {
                this.setState({ tracks: res.data.tracks });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    findYoutubeVideo = (q: any) => {
        console.log(q);
        axios
            .get(urlConstants.YOUTUBE_URL + q + '&type=video&key=' + urlConstants.YOUTUBE_API_KEY)
            .then((res) => {
                const newVideo = res.data.items[0].id.videoId;
                this.setState({
                    videos: newVideo,
                });
                console.log('state  ',this.state.videos);
            })
            .catch((err) => {
                console.warn(err);
            });
    }

    deleteTrack = (trackname: any, artistname: any) => {
        let token = localStorage.getItem('my-token');
        if (token == null) {
            token = '';
        }
        const body = {
            trackname,
            artistname,
        };
        const headers = {
            Authorization: token,
        };
        axios
        .post(api + '/delete-track', body, { headers })
        .then((res) => {
            console.log(res);
            this.getPlaylist();
        })
        .catch((err) => {
            console.warn(err);
        });
    }

    render() {
        
        const playlistTracks = <PlaylistTracks tracks={this.state.tracks}
            findYoutubeVideo={this.findYoutubeVideo} deleteTrack={this.deleteTrack}/>;

        const videos = <YoutubeBlock videos={this.state.videos} />;

        return (
            <div>
                <div>
                    {videos}
                </div>
                <div>
                    {playlistTracks}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    loadedVideos: state.loadedVideos,
    videoId: state.videoId,
    queryYoutube: state.queryYoutube,
});

export default connect(mapStateToProps)(Playlist);
