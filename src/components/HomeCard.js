import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/Responsiveness";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import FastImage from "react-native-fast-image";
import ResponsiveText from "./RnText";
import { useState } from "react";
import Loader from "./loader";
const HomeCard = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    // <Card style={{ alignItems: "center",width: wp(90), }}>
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        margin: 10,
      }}
      onPress={props.onPress}
    >
      {isLoading ? <Loader Circle /> : undefined}
      <FastImage
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        // defaultSource={globalPath.noImage}
        style={{
          height: hp(20),
          width: wp(93),
          marginTop: 1,
          alignSelf: "center",
          // alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 10,
        }}
        resizeMode="cover"
        source={props.source}
        priority={FastImage.priority.high}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} >

          <View
            style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 45, alignItems: 'center' }}
          >
            <ResponsiveText size={4} color={colors.lighterGrey}>{'just'}</ResponsiveText>
            <ResponsiveText
              size={3.5}
              cutText={props.item.discountAmount ? 'line-through' : undefined}
              weight={'bold'}
              margin={[0, 0, 0, 0]}
              color={colors.white}
              textAlign={'center'}
            >{props.item.price}/-
            </ResponsiveText>
            {props.item.discountAmount ?
              <ResponsiveText size={3.5} margin={[0, 0, 0, 5]}color={colors.lighterGrey}>{props.item.discountAmount}/-</ResponsiveText>
              : null}
          </View>
          {/* {props.item.percentage ?
            <View
              style={{ backgroundColor: colors.primary, padding: 10, borderRadius: 45, alignItems: 'center' }}
            >
              <ResponsiveText size={5} color={colors.white}>{props.item.percentage}%</ResponsiveText>
              <ResponsiveText size={3} color={colors.lighterGrey}>{'off'}</ResponsiveText>

            </View> : null} */}
        </View>
        <View
          style={{ backgroundColor: colors.primary, padding: 5, borderRadius: 10 ,marginBottom:2}}
        >
          <ResponsiveText color={colors.lighterGrey}>{props.item.title}</ResponsiveText>
        </View>
      </FastImage>
    </TouchableOpacity>
    // </Card>
  );
};

export default HomeCard;

const styles = StyleSheet.create({});
