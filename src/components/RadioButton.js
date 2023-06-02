import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { check } from "yargs";
// import Randomiser from '../screens/Home/BottomTabs/Randomiser/Randomiserrr'

export default function RadioButton({checked,onPress}) {
  // const [checked, setCheck] = useState(props.isCheck);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: checked ? colors.white : undefined,
        borderRadius: 50,
        borderColor: checked ? colors.primary : colors.grey1,
        borderWidth: 2,
        height: 25,
        width: 25,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
      onPress={onPress}
    >
      {checked ? (
        <Icon source={globalPath.radio} size={13} tintColor={colors.primary} />
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}
