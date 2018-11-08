import FireBaseTools from '../utils/firebase';
import {
  FIREBASE_REF_RATING,
  FIREBASE_REF_TOWN,
  SET_CUR_STATE,
  SET_CUR_TOWN
} from '../actions/types';


export default function (state = {}, action) {
  switch (action.type) {

  case FIREBASE_REF_RATING:
    return {
        ...state,
        firebaseRatingRef: action.ref
    };

  case FIREBASE_REF_TOWN:
    return {
        ...state,
        firebaseTownRef: action.ref
    };

  case SET_CUR_STATE:
    return {
        ...state,
        curState: action.ref
    };

  case SET_CUR_TOWN:
    return {
        ...state,
        curTown: action.ref
    };

  default:
    return state;

  }
}