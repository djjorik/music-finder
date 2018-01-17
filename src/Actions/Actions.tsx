import * as actionType from "../Constants/ActionTypes";

export function queryYoutube(payload: any) {
  return {
    type: actionType.QUERYYOUTUBE,
    payload
  };
}
export function loadedVideo(payload: any) {
  return {
    type: actionType.LOADEDVIDEO,
    payload
  };
}
export function videoId(payload: any) {
  return {
    type: actionType.VIDEOID,
    payload
  };
}




