import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import RecordnotFound from "../../components/RecordnotFound";

import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { RowText } from "../../components/RowText";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { get_cart_detail } from "../../redux/actions/user.actions";
import { useEffect } from "react";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useState } from "react";
import { _toast } from "../../constants/Index";
import RecordNotFound from "../../components/RecordnotFound";
const Cart = ({ navigation }) => {
  // const [data, setData] = useState({});
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.userReducers.cartData.data);
  console.log("cartData", cartData);
  useEffect(() => {
    FinalTotal();
    // get_Profile_Detail();
    dispatch(get_cart_detail());
  }, []);
  // const get_Profile_Detail = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await Api.get(urls.GET_Profile);
  //     console.log("profile", res);
  //     if (res && res.success == true) {
  //       setData(res.data);
  //       setLoading(false);
  //     } else {
  //       // _toast(res.message)
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     // seterrorString(error);
  //     setLoading(false);
  //   }
  // };
  const Delete_Order = async (data, id) => {
    var selectedCate = "";

    if (id) {
      selectedCate = id
    } else {
      data.forEach((element, index) => {
        if (index == 0) {
          selectedCate = selectedCate + element.orderDetailId;
        } else {
          selectedCate = selectedCate + "," + element.orderDetailId;
        }
      });
    }


    try {
      setLoading(true);
      const res = await Api.delete(urls.DELETE_Order + selectedCate);
      console.log("delete order", res);
      if (res && res.success == true) {
        dispatch(get_cart_detail());
        setLoading(false);
        _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  const FinalTotal = () => {
    let x = 2;
    let y = 3;
    var z = x + y;
    console.log("zzzzz", z);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <TouchableOpacity
        style={{
          marginHorizontal: wp(3),
        }}
        onPress={() => navigation?.goBack()}
      >
        <Icon source={globalPath.backArrow} />
      </TouchableOpacity>

      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 20 }}>
        {cartData.length > 0 ? (
          <ScrollView>
            <ImageBackground
              style={{ height: hp(16), width: wp(100) }}
              source={globalPath.topBg}
            >
              <View style={styles.advertisementBanner}>
                {/* <Swiper data={StateLife} /> */}
                <ResponsiveText color={colors.lightGrey} size={3.5}>
                  Customer Name
                </ResponsiveText>
                <ResponsiveText color={colors.white} size={5}>
                  {cartData[0].userName}
                </ResponsiveText>
              </View>
            </ImageBackground>
            <View
              style={{
                width: wp(90),
                backgroundColor: colors.white,
                //   height: hp(12),
                marginTop: hp(-8),
                alignSelf: "center",
                borderRadius: 10,
                padding: 15,
              }}
            >
              {/* <RowText title="Id" subtitle={data.id} /> */}
              <RowText
                title="Contact number"
                subtitle={cartData[0].contactNumber}
              />
              <RowText title="Address" subtitle={cartData[0].deliveryAddress} />
            </View>
            {cartData.map((order) => {
              return (

                <Card title={order.companyName}>
                  <View style={{ borderColor: colors.primary, borderWidth: 1, marginTop: 10, borderRadius: 10 }} >
                    {order.objGetAllOrderDetail?.length > 0
                      ? order.objGetAllOrderDetail.map((item, index) => (
                        <View
                          style={{
                            backgroundColor: colors.white,
                            padding: 10,
                             marginTop: 3,
                            width: wp(91),
                            borderRadius: 10,
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <ResponsiveText>{item.dealName ? item.dealName : item.itemName}</ResponsiveText>
                              {/* <ResponsiveText>Qty x{item.quantity}</ResponsiveText> */}
                              <ResponsiveText>
                                Rs.{" "}
                                {item.dealPrice ? item.dealPrice : item.itemSizePrice}
                              </ResponsiveText>
                            </View>
                            <ResponsiveText size={3} color={colors.grey1}>
                              {item.itemSizeName}
                            </ResponsiveText>

                            {item.crustName ?
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  marginTop: 10,
                                }}
                              >
                                <ResponsiveText size={3} color={colors.grey1}>
                                  {item.crustName}
                                </ResponsiveText>
                                <ResponsiveText size={3} color={colors.grey1}>
                                  + Rs. {item.crustPrice}
                                </ResponsiveText>
                              </View>
                              : null
                            }

                            {order.objGetAllOrderDetail.length > 0
                              ? item.objAdditionalDetails
                                ?.filter((v) => v.isSelected == true)
                                .map((item1, index1) => (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      marginTop: 0,
                                    }}
                                  >
                                    <ResponsiveText size={3} color={colors.grey1}>
                                      {item1.name}
                                    </ResponsiveText>
                                    <ResponsiveText size={3} color={colors.grey1}>
                                      + Rs.{item1.price}
                                    </ResponsiveText>
                                  </View>
                                ))
                              : undefined}

                            {order.objGetAllOrderDetail.length > 0
                              ? item.objDeals?.map((item1, index1) => (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 0,
                                  }}
                                >
                                  <ResponsiveText size={3} color={colors.grey1}>
                                    {item1.name}
                                  </ResponsiveText>
                                  {item1.price ? (
                                    <ResponsiveText size={3} color={colors.grey1}>
                                      + Rs.{item1.price}
                                    </ResponsiveText>
                                  ) : null}
                                </View>
                              ))
                              : undefined}
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 5,
                                borderTopWidth: 0.6,

                              }}
                            >
                              <ResponsiveText size={3} color={colors.grey1}>
                                Quantity
                              </ResponsiveText>
                              <ResponsiveText size={3} color={colors.grey1}>
                                x {item.quantity}
                              </ResponsiveText>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 0,
                                // borderTopWidth: 0.6,

                              }}
                             >
                              <ResponsiveText size={3} color={colors.grey1}>
                                subTotal Amount
                              </ResponsiveText>
                              <ResponsiveText size={3} weight={'bold'} color={colors.black}>
                                + Rs. {item.subTotal}
                              </ResponsiveText>
                            </View>

                            {item.instructions ? (
                              <View style={{ flexDirection: "row", flex: 1 }}>
                                <ResponsiveText size={3} color={colors.black}>
                                  Instructions:
                                </ResponsiveText>
                                <ResponsiveText
                                  flex={1}
                                  size={3}
                                  margin={[0, 0, 0, 15]}
                                  color={colors.grey1}
                                >
                                  {item.instructions}
                                </ResponsiveText>
                              </View>
                            ) : undefined}
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              Alert.alert(
                                "",
                                "Do you want to" +
                                item.categoryName +
                                " " +
                                "order?",
                                [
                                  {
                                    text: "Cancel",
                                    onPress: () => { },
                                    style: "cancel",
                                  },
                                  {
                                    text: "OK",
                                    onPress: () => {
                                      Delete_Order(item.objDeals, item.id);
                                    },
                                  },
                                ]
                              );
                            }}
                            style={{ marginLeft: 10 }}
                          >
                            <Icon source={globalPath.deleteIcon} />
                          </TouchableOpacity>
                        </View>
                      ))
                      : undefined}
                    <View style={{ padding: 15, marginHorizontal: wp(2), width: wp(88) }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: wp(2),
                        }}
                      >
                        <ResponsiveText>Total</ResponsiveText>
                        <ResponsiveText size={3} color={colors.green1}>
                          Rs. {order.totalAmount}
                        </ResponsiveText>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: wp(3),
                        }}
                      >
                        <ResponsiveText>Delivery Charges</ResponsiveText>
                        <ResponsiveText size={3} color={colors.green1}>
                          Rs: {order.deliveryCharges ? order.deliveryCharges : "0"}
                        </ResponsiveText>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: wp(3),
                          borderTopWidth: 0.6,
                        }}
                      >
                        <ResponsiveText>Final Total</ResponsiveText>
                        <ResponsiveText size={3} color={colors.green1}>
                          Rs. {order.totalAmount + order.deliveryCharges}
                        </ResponsiveText>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <RnButton
                          title={"CHECKOUT"}
                          onPress={() =>
                            navigation.navigate(routeName.ORDER_CONFIRMATION, {
                              cartData: order,
                            })
                          }
                        />
                      </View>
                    </View>
                  </View>
                </Card>
              )
            })}
          </ScrollView>
        ) : (
          <View>
            <ImageBackground
              style={{ height: hp(16), width: wp(100) }}
              // resizeMode='cover'
              source={globalPath.topBg}
            ></ImageBackground>
            <RecordNotFound title="Your cart is empty!" />
          </View>
        )}

      </View>
    </SafeAreaView>
  );
};

export default Cart;

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
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
