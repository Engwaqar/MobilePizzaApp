import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import { routeName } from "../constants/routeName";
import { isImage } from "../constants/Index";
import Loader from "./loader";
import { useState } from "react";
import FastImage from "react-native-fast-image";

const MenuItem = ({ data, navigation ,companyId}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View
      style={{
        backgroundColor: colors.lightGrey,
        alignItems: "flex-start",
      }}
    >
      {data.length > 0
        ? data.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => navigation.navigate(routeName.PIZZADETAIL,{item:item,companyId:companyId?companyId:item.companyId})}
            >
              <View style={{alignSelf:'center'}}>
              {isLoading ? <Loader CircleMenu /> : undefined}
              <FastImage
               style={{
                height: hp(10),
                width: wp(20),
                marginTop: 1,
                alignSelf: "center",
                // alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 10,
              }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                // size={65}
                borderRadius={10}
                // defaultSource={globalPath.noImage}
                source={
                  isImage(item.fullPath)
                    ? { uri: item.fullPath }
                    : globalPath.pizza21
                }
              />
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <ResponsiveText size={3.5} weight={'bold'} >{item.itemName}</ResponsiveText>
                <ResponsiveText color={colors.black} size={3}>
                  {item.itemDescription}
                </ResponsiveText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                  }}
                >
                  <View
                    style={[
                      styles.btn,
                      { backgroundColor: colors.lightGrey },
                    ]}
                  >
                    <ResponsiveText size={3} color={colors.black}>Rs: {item.price}.00</ResponsiveText>
                  </View>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      navigation.navigate(routeName.PIZZADETAIL, {item:item,companyId:companyId?companyId:item.companyId})
                    }
                  >
                    <Icon size={15} source={globalPath.cart} />
                    <ResponsiveText
                      margin={[0, 0, 0, 5]}
                      color={colors.white}
                      size={3}
                    >
                      Order Now
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
        : undefined}
    </View>
  );
};

export default MenuItem;

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
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    marginBottom: 6,
    padding: 5,
  },
});
