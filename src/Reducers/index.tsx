import * as actionType from '../Constants/ActionTypes';

const initialState = {
  loadedVideos: [],
  videoId: '',
  queryYoutube: '',
};

const rootReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionType.LOADEDVIDEO:
      return { ...state, loadedVideos: action.payload };
    case actionType.VIDEOID:
      return { ...state, videoId: action.payload };
    case actionType.QUERYYOUTUBE:
      return { ...state, queryYoutube: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
