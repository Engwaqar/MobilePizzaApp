import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Icon from "./Icon";
const MenuTab = ({ source, title, onPress, active }) => {
  return (
    <TouchableOpacity
      style={[
        styles.middle_images,
        { backgroundColor: active ? colors.primary : colors.lightGrey },
      ]}
      onPress={onPress}
    >
      <Icon
        source={source}
        size={30}
        tintColor={active ? colors.white : colors.black}
      />
      <ResponsiveText
        color={active ? colors.white : colors.black}
        margin={[5, 0, 0, 0]}
        size={2.5}
      >
        {title}
      </ResponsiveText>
    </TouchableOpacity>
  );
};

export default MenuTab;

const styles = StyleSheet.create({
  middle_images: {
    // borderRightWidth: 0.4,
    // borderColor: colors.grey,
    marginHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    height: hp(7),
    width: wp(18),
    // margin: 2,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
