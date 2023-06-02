import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import Login from "../screens/Auth/Login/Login";
import Register from "../screens/Auth/Login/Register";
import Verification from "../screens/Auth/Login/Verification";
import OrderDetail from "../screens/Order/OrderDetail";
import RiderHome from "../screens/Rider/RiderHome";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.LOGIN}
    >
      <Stack.Screen name={routeName.LOGIN} component={Login} />
      <Stack.Screen name={routeName.SIGNUP} component={Register} />
      <Stack.Screen name={routeName.VERIFICATION} component={Verification} />
      <Stack.Screen name={routeName.RIDER_HOME} component={RiderHome} />
      <Stack.Screen name={routeName.ORDERDETAIL} component={OrderDetail} /> 

    </Stack.Navigator>
  );
}
export default AuthStack;
