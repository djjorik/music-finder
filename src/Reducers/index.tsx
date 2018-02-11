import * as actionType from '../Constants/ActionTypes';

const initialState = {
  loadedVideos: [],
  videoId: '',
  queryYoutube: '',
  isAuth: false,
};

export const rootReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionType.LOADEDVIDEO:
      return { ...state, loadedVideos: action.payload };
    case actionType.VIDEOID:
      return { ...state, videoId: action.payload };
    case actionType.QUERYYOUTUBE:
      return { ...state, queryYoutube: action.payload };
    case actionType.ISAUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};


