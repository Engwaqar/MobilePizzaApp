import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { useEffect } from "react";
const NetworkModel = (props) => {
  const [isvissible, setisvissible] = useState(props.error ? true : false);
  const update = () => {
    setisvissible(false);
    props.reload();
    console.log("Update error", props.reload);
  };
  useEffect(() => {
    setisvissible(props.error ? true : false);
  }, [props.error]);

  return (
    <Modal animationType="slide" transparent={true} visible={isvissible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.error.toString().includes("TypeError:") ? (
            <Icon
              tintColor={colors.black}
              size={60}
              source={globalPath.NoWifi}
            />
          ) : (
            <Icon
              // tintColor={colors.red1}
              size={60}
              source={globalPath.error}
            />
          )}
          <Text style={{ color: colors.black }}>
            {props.error
              .toString()
              .replace("SyntaxError:", "")
              .replace("TypeError:", "")}
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => update()}
          >
            <Text style={styles.textStyle}>Reload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NetworkModel;

const styles = StyleSheet.create({
  centeredView: {
    zIndex: 1,
    opacity: 0.9,
    elevation: 0.5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: ,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: "center",
  },
  button: {
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 2,
    opacity: 2,
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: colors.red1,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
