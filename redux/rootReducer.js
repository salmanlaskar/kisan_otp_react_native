import {combineReducers} from 'redux';
import contactReducer from './contact/contactReducer';

export default combineReducers({
  contact: contactReducer,
});
