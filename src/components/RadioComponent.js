import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import ResponsiveText from "./RnText";
import { wp, hp } from "../helpers/Responsiveness";

export default function RadioComponent({ isActive, title, price, onPress }) {
  return (
    <TouchableOpacity style={styles.listView} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: isActive ? colors.white : undefined,
            borderRadius: 50,
            borderColor: isActive ? colors.primary : colors.grey1,
            borderWidth: 2,
            height: 25,
            width: 25,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          {isActive ? (
            <Icon
              source={globalPath.radio}
              size={13}
              tintColor={colors.primary}
            />
          ) : (
            <View />
          )}
        </View>
        <ResponsiveText margin={[0, 0, 0, 25]}>{title}</ResponsiveText>
      </View>
      {price ? <ResponsiveText>+Rs: {price}</ResponsiveText> : undefined}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: wp(90),
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
