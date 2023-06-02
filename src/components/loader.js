import React from "react";

import { View } from "react-native";
import { Bounce, CircleFade, Wave } from "react-native-animated-spinkit";

import { colors } from "../constants/colorsPallet";
import ResponsiveText from "./RnText";
export default function Loader({ color, Circle, CircleMenu }) {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(65, 65, 65, 0.5)",
        flex: 1,
        // flexDirection: "row",
      }}
    >
      {CircleMenu ?
        <CircleFade size={20} color={color ? color : colors.white} />
        :
        null
      }
      {Circle ?
        <CircleFade size={40} color={color ? color : colors.white} />
        :CircleMenu?null:
        <Wave size={40} color={color ? color : colors.primary} />
      }
      {CircleMenu ?
        null : <View style={{ margin: 20 }}>
          <ResponsiveText color={colors.white} size={4} textAlign={"center"}>
            Loading...
          </ResponsiveText>
        </View>}

    </View>
  );
}
