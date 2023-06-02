import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,FlatList
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import { routeName } from "../../constants/routeName";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../redux/actions/user.actions";
import { useState } from "react";
import NetworkModel from "../../components/NetworkModel";
import RecordNotFound from "../../components/RecordnotFound";
import Loader from "../../components/loader";

const MyOrders = ({ navigation }) => {
  const dispatch = useDispatch();
  const [errorString, seterrorString] = useState("");
  const [index, setIndex] = React.useState(1);
  const orderData = useSelector((state) => state.userReducers.orderHistory.data);
  const network = useSelector((state) => state.userReducers.orderHistory.error);
  const Refreshing = useSelector((state) => state.userReducers.orderHistory.refreshing);
  console.log("orderdatafff", orderData);
 
  useEffect(() => {
    // orderData
     dispatch(getOrderHistory(1,10));
  }, []);
  useEffect(() => {
    network ? seterrorString(network) : null;
    console.log("networklkkkkkkk", network);
  }, [network]);
  const update = async () => {
    dispatch(getOrderHistory(1,10));
    setIndex(1);

  };
  const onLoad = (i,size) => {
    var index=i+1
    dispatch(getOrderHistory(index,size));
    setIndex(index);

  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <View style={{ backgroundColor: colors.grey, flex: 1 }}>
      <NetworkModel active={true} error={errorString} reload={update} />

        <ImageBackground
          style={{ height: hp(14), width: wp(100) }}
          imageStyle={{ resizeMode: "stretch" }}
          source={globalPath.topBg}
        >
          <HomeHeader navigation={navigation} />

          <View style={styles.advertisementBanner}>
            <ResponsiveText color={colors.white} size={6}>
              Order History
            </ResponsiveText>
          </View>
        </ImageBackground>
        {orderData.length>0?
         <FlatList
         // contentContainerStyle={{ alignItems: "center" }}
         // ListHeaderComponent={listHeader}
        //  stickyHeaderIndices={[0]}
         onEndReached={() => onLoad(index,10)}
         onEndReachedThreshold={0.2}
         refreshing={Refreshing}
         onRefresh={() =>update()}
         data={orderData}
         // numColumns={1}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => {
           return (
             <View
               style={{
                 backgroundColor: colors.white,
                 padding: 10,
                 margin: 5,
                 borderRadius: 10,
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "flex-end",
               }}
             >
               <View style={{ flex: 0.9 }}>
                 <View
                   style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                   }}
                 >
                   <ResponsiveText color={colors.grey1} size={2.5}>
                     {"Order No: " + item.id}
                   </ResponsiveText>
                   <ResponsiveText color={colors.grey1} size={2.5}>
                     {item.dateCreated}
                   </ResponsiveText>
                 </View>
                 <View
                   style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     marginVertical: 5,
                     marginTop: 10,
                   }}
                 >
                   <View>
                     <ResponsiveText>Price:</ResponsiveText>
                     <ResponsiveText color={colors.grey1} size={3}>
                       Rs: {item.totalAmount}
                     </ResponsiveText>
                   </View>
                   <View>
                     <ResponsiveText>Items:</ResponsiveText>
                     <ResponsiveText color={colors.grey1} size={3}>
                       {item.objGetAllOrderDetail?.length} items
                     </ResponsiveText>
                   </View>
                   <View>
                     <ResponsiveText>Status:</ResponsiveText>
                     <ResponsiveText color={colors.grey1} size={3}>
                       {item.orderStatus}
                     </ResponsiveText>
                   </View>
                 </View>
               </View>
               <TouchableOpacity
                 style={styles.btn}
                 onPress={() =>
                   navigation.navigate(routeName.ORDERDETAIL, item)
                 }
               >
                 <ResponsiveText
                   // margin={[0, 0, 0, 5]}
                   color={colors.white}
                   size={2.5}
                 >
                   Detail
                 </ResponsiveText>
               </TouchableOpacity>
             </View>
           );
         }}
       />:<RecordNotFound/>
      }
       
      </View>
      {Refreshing ? <Loader /> : undefined}

    </SafeAreaView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  advertisementBanner: {
    // height: 130,
    // marginHorizontal: 10,
    alignItems: "center",
    // paddingTop:20
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15,
    height: 20,
  },
});
