import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
import types from "../actions/types";
import Api from "../lib/api";
import { _toast } from "../../constants/Index";
import urls from "../lib/urls";
import { StackActions } from "@react-navigation/native";
//LOGIN
export function* loginUserSaga() {
  console.log("saga function Works");
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  console.log(data, "action in saga");
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    console.log(response, "response");

    if (response && response.data != null) {
      yield AsyncStorage.setItem("@token", response.data.token);
      yield AsyncStorage.setItem(
        "@loggedInUserTypeId",
        response.data.loggedInUserTypeId
      );
      yield AsyncStorage.setItem("@userId", response.data.loggedInUserId);
      // yield AsyncStorage.setItem("@companyId", response.data.companyId);
      // yield AsyncStorage.setItem("@userName", response.data.loggedInUserName);
      yield put({ type: types.LOGIN_USER_SUCCESS, payload: response.data });
      if (response.data.loggedInUserTypeId == 1) {
      navigation.navigate("HomeStack");
      _toast(response.message);
      }
      else if (response.data.loggedInUserTypeId == 4) {
        navigation.navigate(routeName.RIDER_HOME);
        _toast(response.message);

      }


    } else {
      _toast(response.message);
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}

//Get profile
export function* getProfileDataSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfileDataSagaApi);
}
function* getProfileDataSagaApi(data) {
  // let { params, navigation } = data.data;
  const userType =yield AsyncStorage.getItem("@loggedInUserTypeId");

  try {

    const response = yield Api.get(urls.GET_Profile);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_PROFILE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_PROFILE_FAILURE, error: error });
    }
  } catch (error) {
    yield put({ type: types.GET_PROFILE_FAILURE, error: error });
  }
}
//get_menu
export function* MenuSaga() {
  yield takeLatest(types.GET_ALL_MENU_REQUEST, getMenuApi);
}
function* getMenuApi(data) {
  try {
    const url = urls.Get_Menu;
    const response = yield Api.get(url);
    console.log(response, "responsessssss");
    if (response && response.data != null) {
      yield put({
        type: types.GET_ALL_MENU_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: types.GET_ALL_MENU_FAIL,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_MENU_FAIL, error: error });
  }
}
//get deals data

export function* DealsSaga() {
  yield takeLatest(types.GET_DEALS_REQUEST, getDealsApi);
}
function* getDealsApi(data) {
  const limit = data.data.limit;
  const index = data.data.index;
  const id = data.data.id;

  console.log('paramsssssssssss: ', data);
  try {
    const url = urls.Get_Deals+id+"?page="+index+"&pageSize="+limit;
    const response = yield Api.get(url);
    console.log(response, "responsessssss");
    if (response && response.data != null) {
      yield put({
        type: types.GET_DEALS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: types.GET_DEALS_FAIL,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_DEALS_FAIL, error: error });
  }
}
//get cart detail
export function* CartDetailSaga() {
  yield takeLatest(types.GET_CART_DETAIL_REQUEST, getCartDetailSagapi);
}
function* getCartDetailSagapi(data) {
  try {
    const url = urls.GET_CART_DETAILS;
    const response = yield Api.get(url);
    console.log(response, "responsessssss cart list");
    if (response && response.data != null) {
      yield put({
        type: types.GET_CART_DETAIL_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_CART_DETAIL_FAILURE, error:  response.message ,payload:{} });

    }
  } catch (error) {
    yield put({ type: types.GET_DEALS_FAIL, error: error });
  }
}

//get order history
export function* orderHistorySaga() {
  yield takeLatest(types.GET_ORDER_HISTORY_REQUEST, orderHistorySagapi);
}
function* orderHistorySagapi(data) {
  const limit = data.data.limit;
  const index = data.data.index;
  console.log('orderHistoryIndex: ', data);
  try {
    const url = urls.GET_ORDER_HISTORY;

    // const url = urls.GET_ORDER_HISTORY+index+'&pageSize='+limit;
    const response = yield Api.get(url);
    console.log(response, "responsessssss GET_ORDER_HISTORY");
    if (response && response.data != null) {
      yield put({
        type: types.GET_ORDER_HISTORY_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_ORDER_HISTORY_FAILURE, error: response.message });
    }
  } catch (error) {
    yield put({ type: types.GET_ORDER_HISTORY_FAILURE, error: error });
  }
}
//logout
export function* logoutUserSaga() {
  yield takeLatest(types.LOGIN_LOGOUT_REQUEST, logoutUserApi);
}
function* logoutUserApi(data, response) {
  // let { params, navigation } = data.data;
  yield put({ type: types.LOGIN_LOGOUT_SUCCESS });
}
