import * as actionType from "../Constants/Constants";

const initialState = {
  topTracks: [],
  foundTracks: [],
  loadedVideos: [],
  value: "",
  loaded: false,
  videoId: "",
  searched: "",
  query: ""
};

 const globalState = (state: any = initialState, action: any)  => {
  switch (action.type) {
    case actionType.TOPTRACKS:
      return { ...state, topTracks: action.payload };
    case actionType.FOUNDTRACKS:
      return { ...state, foundTracks: action.payload };
    case actionType.LOADEDVIDEO:
      return { ...state, loadedVideos: action.payload };
    case actionType.LOADED:
      return { ...state, loaded: action.payload };
    case actionType.VIDEOID:
      return { ...state, videoId: action.payload };
    case actionType.SEARCHED:
      return { ...state, searched: action.payload };
    case actionType.QUERY:
      return { ...state, query: action.payload };
    case actionType.FINDTRACKS:
      return { ...state, query: action.payload };
    case actionType.FINDYOUTUBEVIDEO:
      return { ...state, query: action.payload };
    default:
      return state;
  }
}

export default globalState;
