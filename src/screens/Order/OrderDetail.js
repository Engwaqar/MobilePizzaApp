import {
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
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { RowText } from "../../components/RowText";
import RnButton from "../../components/RnButton";
import { useState } from "react";

const OrderDetail = ({ navigation, route }) => {
  const [data, setData] = useState(route.params);
  console.log('Detail data', data)
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <HomeHeader navigation={navigation} />

      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 20 }}>
        <ScrollView>
          <ImageBackground
            style={{ height: hp(16), width: wp(100) }}
            source={globalPath.topBg}
          >
            <View style={styles.advertisementBanner}>
              <ResponsiveText color={colors.white} size={5}>
                Order Details
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
            <RowText title="Order No" subtitle={data.id} />
            <RowText title="Time" subtitle={data.estimatedDeliveryTime} />
            <RowText title="Address" subtitle={data.deliveryAddress} />
          </View>
          <Card title={"Cart List"}>
            {data.objGetAllOrderDetail.length > 0 ?
              data.objGetAllOrderDetail.map(( item, index ) => (
                <View 
                key={index}
                  style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    marginTop: 10,
                    width: wp(89),
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

                    {data.objGetAllOrderDetail.length > 0
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

                    {data.objGetAllOrderDetail.length > 0
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
                              + Rs.{item1.itemSizePrice}
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
                      <ResponsiveText size={3} weight={'bold'} color={colors.grey1}>
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
                  {/* <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ResponsiveText>{item.itemName}</ResponsiveText>
                  <ResponsiveText>x {item.quantity}</ResponsiveText>
                  <ResponsiveText>Rs: {item.itemSizePrice}</ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <ResponsiveText size={3} color={colors.grey1}>
                    {item.crustName}
                  </ResponsiveText>
                  <ResponsiveText size={3} color={colors.grey1}>
                    Rs: {item.crustPrice}
                  </ResponsiveText>
                </View>
                {item.objAdditionalDetails.filter((v)=>v.isSelected==true).map((topping)=>(

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                  }}
                >
                  <ResponsiveText size={3} color={colors.grey1}>
                    {topping.name}
                  </ResponsiveText>
                  <ResponsiveText size={3} color={colors.grey1}>
                    Rs: {topping.price}
                  </ResponsiveText>
                </View>
                ))}
              </View> */}
                  {/* <TouchableOpacity style={{ marginLeft: 10 }}>
                 <Icon source={globalPath.deleteIcon} /> 
              </TouchableOpacity> */}
                </View>

              )) : null}
          </Card>
        </ScrollView>
        <View style={{ padding: 15, margin: wp(5) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: wp(3),
            }}
          >
            <ResponsiveText>Sub Total</ResponsiveText>
            <ResponsiveText size={3} color={colors.green1}>
              Rs: {data.totalAmount}
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
              Rs: {data.deliveryCharges ? data.deliveryCharges : '0'}
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
              Rs: {data.deliveryCharges + data.totalAmount}
            </ResponsiveText>
          </View>
          {/* <View style={{ alignItems: "center" }}>
            <RnButton title={"CHECKOUT"} />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetail;

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
