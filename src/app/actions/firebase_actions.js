import {
  FIREBASE_REF_RATING,
  FIREBASE_REF_TOWN,
  SET_CUR_STATE,
  SET_CUR_TOWN
} from './types';


export function setFirebaseRefRating(ref) {    
  return {
    type: FIREBASE_REF_RATING,
    ref,
  };
}

export function setFirebaseRefTown(ref) {    
  return {
    type: FIREBASE_REF_TOWN,
    ref,
  };
}

export function setCurState(ref) {    
  return {
    type: SET_CUR_STATE,
    ref,
  };
}

export function setCurTown(ref) {    
  return {
    type: SET_CUR_TOWN,
    ref,
  };
}