import axios from '../../utils/axios';
import {SET_MESSAGE, MESSAGE_LOADING, MESSAGE_ERROR} from './messageTypes';
const AllMessages = [
  {
    receivedMessageTimeStamp: 1613961214769,
    message:
      'Hi. Your OTP is: 123456.\n ngnnb nvbv bbvbnvnbvbn nbvnbvbnv bvbv gdgfd bvbv nbbvbvbn nbvbnvb nbnbn nbnb nbn',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613071214769,
    message: 'Hi. Your OTP is: 565645',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613171214769,
    message: 'Hi. Your OTP is: 331211',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613271214769,
    message: 'Hi. Your OTP is: 897987',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613371214769,
    message: 'Hi. Your OTP is: 986561',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613471214769,
    message: 'Hi. Your OTP is: 743222',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613431214769,
    message: 'Hi. Your OTP is: 657656',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613451214769,
    message: 'Hi. Your OTP is: 432424',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
  {
    receivedMessageTimeStamp: 1613461214769,
    message: 'Hi. Your OTP is: 987987',
    firstName: 'Salman',
    lastName: 'Laskar',
    phoneNumber: '+918371823104',
  },
];
AllMessages.sort(function (a, b) {
  return b.receivedMessageTimeStamp - a.receivedMessageTimeStamp;
});
export const getMessage = () => (dispatch) => {
  dispatch(setMessageLoading());
  axios({url: '/product', method: 'GET'})
    .then((res) => res.data)
    .then((data) => {
      dispatch(setMessage(AllMessages));
    })
    .catch((err) => {
      dispatch({
        type: MESSAGE_ERROR,
        payload: {message: 'Something went wrong'},
      });
    });
};

export const setMessage = (data) =>{
  return {
    type: SET_MESSAGE,
    payload: data,
  };
};
export const setMessageLoading = () => {
  return {
    type: MESSAGE_LOADING,
  };
};
