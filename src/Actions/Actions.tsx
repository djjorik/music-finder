import * as actionType from "../Constants/Constants";

export function loadTopTracks(payload: any) {
  return {
    type: actionType.TOPTRACKS,
    payload
  };
}

export function loadSearched(payload: any) {
  return {
    type: actionType.SEARCHED,
    payload
  };
}

export function findTracks(payload: any) {
  return {
    type: actionType.FINDTRACKS,
    payload
  };
}

export function findYoutubeVideo(payload: any) {
  return {
    type: actionType.FINDYOUTUBEVIDEO,
    payload
  };
}
