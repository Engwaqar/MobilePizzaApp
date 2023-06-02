import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";

const RnButton = ({
  backgroundColor,
  textColor,
  width,
  padding,
  margin,
  gradColor,
  height,
  borderRadius,
  title,
  fontFamily,
  onPress,
  size,
  position,
  alignSelf,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : null}
      style={[
        styles.Btn,
        props.btnStyle ? props.btnStyle : undefined,
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        position && { alignSelf: position },
        backgroundColor && { backgroundColor },
        {
          height:height?height: wp(10),
          flexDirection: "row",
          width: width ? width : wp(50),
          // height: height ? height : undefined,
          borderRadius: borderRadius ? borderRadius : 30,
          alignSelf:alignSelf?alignSelf:undefined
        },
      ]}
      {...props}
    >
      {title && (
        <ResponsiveText
          size={size ? size : 3.7}
          padding={[0, 10]}
          fontFamily={fontFamily ? fontFamily : "Bold"}
          color={textColor ? textColor : colors.white}
        >
          {title}
        </ResponsiveText>
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default RnButton;

const styles = StyleSheet.create({
  Btn: {
    padding: 3,
    borderRadius: 15,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});
