import axios from '../../utils/axios';
import {SET_CONTACT, CONTACT_LOADING, CONTACT_ERROR} from './contactTypes';

export const getContacts = () => (dispatch) => {
  dispatch(setContactLoading());
  axios({url: '/product', method: 'GET'})
    .then((res) => res.data)
    .then((data) => {
      console.log(data)
      dispatch(setContact(data));
    })
    .catch((err) => {
      dispatch({
        type: CONTACT_ERROR,
        payload: {message: 'Something went wrong'},
      });
    });
};

export const setContact = (data) =>{
  return {
    type: SET_CONTACT,
    payload: data,
  };
};
export const setContactLoading = () => {
  return {
    type: CONTACT_LOADING,
  };
};
