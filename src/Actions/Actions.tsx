import * as actionType from '../Constants/ActionTypes';
import axios from 'axios';
import * as urlConstants from '../Constants/UrlConstants';
import history from '../Routes/history';

export function queryYoutube(payload: any) {
  return {
    payload,
    type: actionType.QUERYYOUTUBE,
  };
}
export function loadedVideo(payload: any) {
  return {
    payload,
    type: actionType.LOADEDVIDEO,
  };
}
export function videoId(payload: any) {
  return {
    payload,
    type: actionType.VIDEOID,
  };
}

export function isAuth(payload: any) {
  return {
    payload,
    type: actionType.ISAUTH,
  };
}

export function findYoutubeVideo(q: any) {
  return (dispatch: any) => {
    axios
      .get(urlConstants.YOUTUBE_URL + q + '&type=video&key=' + urlConstants.YOUTUBE_API_KEY)
      .then((res) => {
        dispatch(loadedVideo(res.data.items));
        dispatch(videoId(res.data.items[0].id.videoId));
        dispatch(queryYoutube(q));
        history.push('video');
      })
      .catch((err) => {
        console.warn(err);
      });
  };
}

