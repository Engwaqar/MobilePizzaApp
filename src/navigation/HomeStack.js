import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import DealDetail from "../screens/Home/DealDetail";
import Home from "../screens/Home/Home";
import HotDeals from "../screens/Home/HotDeals";
import Menu from "../screens/Home/Menu";
import NearbyShops from "../screens/Home/NearbyShops";
import PizzaDetail from "../screens/Home/PizzaDetail";
import OrderDetail from "../screens/Order/OrderDetail";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Search from "../screens/Search/Search";
import SearchRestaurant from "../screens/Search/SearchRestaurant";
// import Dashboard from "../screens/Home/Dashboard";

const Stack = createNativeStackNavigator();

function HomeStack({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.NEARBY_SHOP}
    >
      <Stack.Screen name={routeName.NEARBY_SHOP} component={NearbyShops} />
      <Stack.Screen name={routeName.DASHBOARD} component={Home} />
      <Stack.Screen name={routeName.MENU} component={Menu} />
      <Stack.Screen name={routeName.PIZZADETAIL} component={PizzaDetail} />
      <Stack.Screen name={routeName.HOTDEALS} component={HotDeals} />
      <Stack.Screen name={routeName.DEALDETAIL} component={DealDetail} />
      <Stack.Screen name={routeName.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={routeName.SEARCH} component={Search} />
      <Stack.Screen name={routeName.SEARCH_RES} component={SearchRestaurant} />

      <Stack.Screen name={routeName.ORDERDETAIL} component={OrderDetail} />
    </Stack.Navigator>
  );
}

export default HomeStack;
