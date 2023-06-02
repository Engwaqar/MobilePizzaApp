import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: false,
  loginScreen: {
    refreshing: false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  // presentTeam: {
  //   refreshing: false,
  //   data: [],
  // },
  allMenu: {
    refreshing: false,
    data: [],
    error: "",
  },
  allDeals: {
    refreshing: false,
    data: [],
    error: "",
  },
  cartData: {
    refreshing: false,
    data: [],
    error: "",
  },
  orderHistory: {
    refreshing: false,
    data: [],
    error: "",
  },
  networdState: {
    state: false,
    error: "",
  },
  profileData: {
    refreshing: false,
    data: {},
    error:""
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

    case types.LOGIN_USER_SUCCESS:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          data: action.payload,
          errorMsg: action.error,
        },
      };
    //get menu
    case types.GET_ALL_MENU_REQUEST:
      return {
        ...state,
        allMenu: {
          ...state.allMenu,
          refreshing: true,
          error:''
        },
      };
    case types.GET_ALL_MENU_SUCCESS:
      return {
        ...state,
        allMenu: {
          ...state.allMenu,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_MENU_FAIL:
      return {
        ...state,
        allMenu: {
          ...state.allMenu,
          // data: action.payload,
          refreshing: false,
          error: action.error,
        },
      };

    //get deals data
    case types.GET_DEALS_REQUEST:
      return {
        ...state,
        allDeals: {
          ...state.allDeals,
          refreshing: true,
          error:''
        },
      };
    case types.GET_DEALS_SUCCESS:
      return {
        ...state,
        allDeals: {
          ...state.allDeals,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_DEALS_FAIL:
      return {
        ...state,
        allDeals: {
          ...state.allDeals,
          // data: action.payload,
          refreshing: false,
          error: action.error,
        },
      };
    //get cart data
    case types.GET_CART_DETAIL_REQUEST:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          refreshing: true,
          error:''
        },
      };
    case types.GET_CART_DETAIL_SUCCESS:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_CART_DETAIL_FAILURE:
      return {
        ...state,
        cartData: {
          ...state.cartData,
          data: action.payload,
          refreshing: false,
          error: action.error,
        },
      };

    //order history
    case types.GET_ORDER_HISTORY_REQUEST:
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          refreshing: true,
          error:''
        },
      };
    case types.GET_ORDER_HISTORY_SUCCESS:
      const key = 'id';

      const arrayUniqueByKey = [...new Map([...action.payload, ...state.orderHistory.data].map(item =>
        [item[key], item])).values()];
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          data: arrayUniqueByKey,
          refreshing: false,
        },
      };
    case types.GET_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          refreshing: false,
          error: action.error,
        },
      };
      //get profile
case types.GET_PROFILE_REQUEST:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      refreshing: true,

    },
  };
case types.GET_PROFILE_SUCCESS:

  return {
    ...state,
    profileData: {
      ...state.profileData,
      data: action.payload,
      refreshing: false,

    },
  };
case types.GET_PROFILE_FAILURE:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      // data: action.payload,
      refreshing: false,
      error: action.error,

    },
  };
    //Network error
    case types.Get_NETWORK_INFO_REQUEST:
      return {
        ...state,
        networdState: {
          ...state.networdState,
        },
      };
    case types.Get_NETWORK_INFO_SUCCESS:
      return {
        ...state,
        networdState: {
          ...state.networdState,
          state: action.payload,
          error: action.error,
        },
      };
    case types.LOGIN_LOGOUT_REQUEST:
      // console.log(action, "action in reducer");
      return state;
    case types.LOGIN_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
