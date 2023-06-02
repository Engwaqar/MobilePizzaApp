import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import HomeStack from "./HomeStack";
import MyOrders from "../screens/Home/MyOrders";
import OrderStack from "./OrderStack";
import Cart from "../screens/Home/Cart";
import Icon from "../components/Icon";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import AuthStack from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_detail } from "../redux/actions/user.actions";

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function BottomTabs(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_cart_detail());
  }, []);
  const cartData = useSelector((state) => state.userReducers.cartData.data);
  // const preOrder = cartData.filter((e) => e.orderStatus == "PreOrder");

  console.log("route.params.isLoggedIn", props.route.params.isLoggedIn);
  const Login_Verification = useSelector(
    (state) => state.userReducers.loginScreen.data.loggedInUserId
  );
  console.log("Login_Verification", Login_Verification);

  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ marginHorizontal: 10 }}
        // sceneContainerStyle={{marginHorizontal:20,backgroundColor:'red'}}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.black,

          // Floating Tab Bar...
          // tabBarLabelStyle: {
          //   fontSize: 10,
          //   fontWeight: "bold",
          // },
          tabBarStyle: {
            backgroundColor: colors.white,
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 40,
              height: 90,
            },
          },
          //  }
        }}
      >
        <Tab.Screen
          name={"HomeStack"}
          component={HomeStack}
          // initialParams={props.route.params.companyDetail}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.homeB}
                tintColor={focused ? colors.primary : colors.black}
              />
            ),
          }}
        />
        {props.route.params.isLoggedIn == true ||
        Login_Verification != null ||
        Login_Verification != undefined ? (
        <Tab.Screen
          name={"Cart"}
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            // tabBarBadge=1,
            tabBarBadge:
              cartData.length > 0
                ? cartData.length == 0
                  ? null
                  : cartData.length
                : null,
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.cartB}
                tintColor={focused ? colors.primary : colors.black}
              />
            ),
          }}
        />
        ) : (
          <Tab.Screen
            name={"Authstack1"}
            component={AuthStack}
            options={{
              tabBarLabel: "Cart",
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={globalPath.cartB}
                  tintColor={focused ? colors.primary : colors.black}
                />
              ),
            }}
          />
        )}
        {props.route.params.isLoggedIn == true ||
        Login_Verification != null ||
        Login_Verification != undefined ? (
        <Tab.Screen
          name={"OrderStack"}
          component={OrderStack}
          options={{
            tabBarLabel: "Orders",
            tabBarIcon: ({ focused }) => (
              <Icon
                source={globalPath.ordersB}
                tintColor={focused ? colors.primary : colors.black}
              />
            ),
          }}
        />
        ) : (
          <Tab.Screen
            name={"Authstack2"}
            component={AuthStack}
            options={{
              tabBarLabel: "Orders",
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={globalPath.ordersB}
                  tintColor={focused ? colors.primary : colors.black}
                />
              ),
            }}
          />
        )}
        {props.route.params.isLoggedIn == true ||
        Login_Verification != null ||
        Login_Verification != undefined ? (
          <Tab.Screen
            name={"profileScreen"}
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={globalPath.profileB}
                  tintColor={focused ? colors.primary : colors.black}
                />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name={"Authstack"}
            component={AuthStack}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ focused }) => (
                <Icon
                  source={globalPath.profileB}
                  tintColor={focused ? colors.primary : colors.black}
                />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveTab: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom:30
    // marginBottom: Platform.OS == "android" ?80 : 30
  },
  inActiveTab: {},
  TouchableTab: {
    backgroundColor: "white",
    padding: 2,
    width: 65,
    bottom: 20,
    height: 65,
    borderRadius: 30,
    alignItems: "center",
  },
});
