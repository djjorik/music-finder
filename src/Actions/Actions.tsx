import * as actionType from "../Constants/Constants";

export function loadTopTracks(toptracks: any) {
  return {
    type: actionType.TOPTRACKS,
    toptracks
  };
}

export function loadSearched(searched: any) {
  return {
    type: actionType.SEARCHED,
    searched
  };
}
