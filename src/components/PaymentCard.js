import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";

const PaymentCard = ({ source, active, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: active ? colors.primary : colors.lightGrey },
      ]}
    >
      <Icon size={60} source={source} />
      <View style={{ padding: 15, flex: 1 }}>
        <ResponsiveText color={active ? colors.white : colors.black}>
          {title}
        </ResponsiveText>
        {/* <ResponsiveText color={active?colors.grey5:colors.grey1}margin={[5,0,0,0]} >5227 ********3302</ResponsiveText> */}
      </View>
      <View
        style={{
          backgroundColor: active ? colors.primary : undefined,
          borderRadius: 50,
          borderColor: active ? colors.white : colors.grey1,
          borderWidth: 2,
          height: 25,
          width: 25,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginHorizontal: 5,
        }}
      >
        {active ? (
          <Icon source={globalPath.radio} size={13} tintColor={colors.white} />
        ) : (
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
  },
});
