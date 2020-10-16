import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import chartReducer from './topchart.reducer';
import favouriteReducer from './favourites.reducer';
import useruploadsReducer from './useruploads.reducer';
import searchReducer from './search.reducer';
import recentUploadsReducer from './recentuploads.reducer';

export default combineReducers({
    auth:authReducer,
    chart:chartReducer,
    favourites:favouriteReducer,
    userUploads:useruploadsReducer,
    searchResults:searchReducer,
    fresh:recentUploadsReducer,

});