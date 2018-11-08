import { combineReducers } from 'redux';
import FireBaseRefReducer from './firebase_ref_reducer';

const rootReducer = combineReducers({
    state: FireBaseRefReducer,
});

export default rootReducer;
