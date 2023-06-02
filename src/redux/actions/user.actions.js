import types from "./types";
//LOGIN
export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER_REQUEST,
    data: data,
  };
};
//Get menu
export const get_menu = (index,size) => {
  return {
    type: types.GET_ALL_MENU_REQUEST,
    index: index,
    size:size
  };
};
//GET deals
export const get_Deals = (index, limit,id) => {
  return {
    type: types.GET_DEALS_REQUEST,
    data: {
      index: index,
      limit: limit,
      id:id
    },
  };
};
export const get_cart_detail = (data) => {
  return {
    type: types.GET_CART_DETAIL_REQUEST,
    data: data,
  };
};
//GET ORDER HISTORY
export const getOrderHistory = (index, limit) => {
  return {
    type: types.GET_ORDER_HISTORY_REQUEST,
    data: {
      index: index,
      limit: limit,
    },
  };
};
//Get network error
export const GetnetworkError = (data) => {
  return {
    type: types.Get_NETWORK_INFO_REQUEST,
    data: data,
  };
};
//Get profile
export const getProfile = () => {
  return {
    type: types.GET_PROFILE_REQUEST,
  };}
//LOGOUT
export const logoutUser = (data) => {
  return {
    type: types.LOGIN_LOGOUT_REQUEST,
    data: data,
  };
};
