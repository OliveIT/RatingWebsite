import {
  LOGIN_WITH_PROVIDER_FIREBASE,
} from './types';


export function loginWithProvider(provider) {    
  return {
    type: LOGIN_WITH_PROVIDER_FIREBASE,
    provider,
  };
}