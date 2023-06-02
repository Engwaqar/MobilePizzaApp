import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import Home from "../screens/Home/Home";
import MyOrders from "../screens/Home/MyOrders";
import OrderDetail from "../screens/Order/OrderDetail";
// import Dashboard from "../screens/Home/Dashboard";

const Stack = createNativeStackNavigator();

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.MYORDERS}
    >
      <Stack.Screen name={routeName.MYORDERS} component={MyOrders} /> 
      <Stack.Screen name={routeName.ORDERDETAIL} component={OrderDetail} /> 

     
    </Stack.Navigator>
  );
}

export default OrderStack;
