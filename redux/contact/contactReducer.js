import { SET_CONTACT,CONTACT_ERROR,CONTACT_LOADING } from "./contactTypes";

const initialState = {
  data:[],
  error:{},
  loading: false
};

const CONTACTReducer=(state = initialState, action)=>{
  switch (action.type) {
    case SET_CONTACT:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error:{}
      };
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CONTACT_ERROR:
      return {
          ...state,
          loading: false,
          error:action.payload
      };
    default:
      return state;
  }
}
export default CONTACTReducer;
