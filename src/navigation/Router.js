import React from "react";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Auth/splash/Splash";
import Cart from "../screens/Home/Cart";
import OrderConfirmation from "../screens/Order/OrderConfirmation";
import BottomTabs from "./BottomTabs";
import { routeName } from "../constants/routeName";
import EditProfile from "../screens/Profile/EditProfile";
import RiderHome from "../screens/Rider/RiderHome";
import ContinueAs from "../screens/Auth/Login/ContinueAs";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Login from "../screens/Auth/Login/Login";
import OrderDetail from "../screens/Order/OrderDetail";
import NearbyShops from "../screens/Home/NearbyShops";
import PaymentConfirmation from "../screens/Order/PaymentConfirmation";

const Router = () => {
  const [Token, setToken] = React.useState("");
  // React.useEffect(() => {
  //   async function fetchAndSetUser()
  //   {
  //   const token = await AsyncStorage.getItem('@token');
  //   setToken(token);
  //   }
  //   fetchAndSetUser();
  // },[]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={routeName.SPLASH}
      >
        <Stack.Screen name={routeName.LOGIN} component={Login} />
        <Stack.Screen name={routeName.SPLASH} component={Splash} />
        <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />
        <Stack.Screen name={routeName.NEARBY_SHOP} component={NearbyShops} />

        <Stack.Screen name={routeName.RIDER_HOME} component={RiderHome} />
        <Stack.Screen name={routeName.ORDERDETAIL} component={OrderDetail} />

        <Stack.Screen name={routeName.CONTINUE_AS} component={ContinueAs} />
        <Stack.Screen name={routeName.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={routeName.CART} component={Cart} />
        <Stack.Screen
          name={routeName.ORDER_CONFIRMATION}
          component={OrderConfirmation}
        />
      <Stack.Screen name={routeName.PAYMENT_CONFIRMATION} component={PaymentConfirmation} />

        <Stack.Screen name={routeName.EDIT_PROFILE} component={EditProfile} />
      </Stack.Navigator>
      {/* {Token === '' || Token === null?<AuthStack/> :<HomeStack /> } */}
      {/* <DrawerStack/> */}
    </NavigationContainer>
  );
};

export default Router;
