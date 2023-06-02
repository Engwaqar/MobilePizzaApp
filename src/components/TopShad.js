import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { hp, wp } from "../helpers/Responsiveness";
import { globalPath } from "../constants/globalPath";
import Icon from "./Icon";

export default function TopShad(props) {
  return (
    <ImageBackground
      style={{
        height: hp(40),
        width: wp(100),
        justifyContent: "center",
        // alignItems: "center",
      }}
      source={globalPath.topBg}
    >
      {props.arrow ? (
        <TouchableOpacity onPress={() => props.navigation?.goBack()}>
          <Icon margin={[-10, 0, 0, 10]} source={globalPath.backArrow} />
        </TouchableOpacity>
      ) : undefined}
      <Image
        style={{
          height: hp(20),
          width: wp(50),
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={globalPath.logo}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
