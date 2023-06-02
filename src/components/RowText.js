import React, { version } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
const RowText = ({ title, subtitle }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      <View style={{ flex: 1 }}>
        <ResponsiveText color={colors.black}>{title}:</ResponsiveText>
      </View>
      <View style={{ flex: 1 }}>
        <ResponsiveText size={3} color={colors.black}>
          {subtitle}
        </ResponsiveText>
      </View>
    </View>
  );
};
export { RowText };
const styles = StyleSheet.create({
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    height: hp(9),
    // width:wp(40),
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
