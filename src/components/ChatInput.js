import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import Input from "../components/Input";

export default function ChatInput(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sendBtn} onPress={props.attachment}>
        <Icon size={30} source={globalPath.attachment} />
      </TouchableOpacity>
      <Input
        borderRadius={10}
        width={wp(95)}
        searchBox
        placeholder={"Search categories"}
      // onChnageText={(text) => setUserName(text)}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={props.Send}>
        <Icon size={30} source={globalPath.send} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    paddingHorizontal: wp(7),
    width: wp(100),
    paddingVertical: 10,
    shadowColor: colors.grey1,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
  },
  sendBtn: {
    // backgroundColor: colors.green,
  },
});
