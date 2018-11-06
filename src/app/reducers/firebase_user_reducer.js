import FireBaseTools from '../utils/firebase';
import {
  LOGIN_WITH_PROVIDER_FIREBASE,
} from '../actions/types';


export default function (state = null, action) {
  switch (action.type) {

  case LOGIN_WITH_PROVIDER_FIREBASE:
    return loginWithProvider(action.provider);

  default:
    return state;

  }
}

function loginWithProvider(provider) {
  FireBaseTools.loginWithProvider(provider);
}
