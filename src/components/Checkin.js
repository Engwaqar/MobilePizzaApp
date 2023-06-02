import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { wp } from "../helpers/Responsiveness";
import { formatAMPM } from "../redux/actions/user.actions";
import ResponsiveText from "./RnText";
const Checkin = (props) => {
  const [CheckedIn, setCheckedIn] = useState(false);
  const [Late, setLate] = useState(false);
  const [data, setData] = useState(props.data);

  //day == 0 && hour == 9 && minutes < 30 && minutes > 10 || day == 0 && hour == 9


  function chexk() {
    var now = new Date();
    var hour = now.getHours();
    var day = now.getDay();
    var minutes = now.getMinutes();

    if (props.data.some((v) => v.userId == props.userid)) {
      return "checkedin";
    } else if (hour == 10 && minutes < 15) {
      return "ontime";
    } else {
      return "late";
    }
  }
  function checkinTime() {
    if (props.data?.find((v) => v.userId == props.userid)?.createdDateTime) {
      // console.log('props.data', props.data)
      return formatAMPM(props.data?.find((v) => v.userId == props.userid)?.createdDateTime);
    } else {
      return props.time;
    }
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      // onPress={() => setCheckedIn(!CheckedIn)}
      // style={{
      //   // padding: wp(25),
      //   // paddingVertical: wp(25),
      //   height:wp(60),
      //   width:wp(60),

      //   borderRadius: wp(30),
      //   shadowOffset: { width: 10, height: 12 },
      //   shadowColor: colors.blue1,
      //   shadowOpacity: 1,
      //   elevation: 24,
      //   backgroundColor: colors.white,
      //   // borderWidth:0.4,
      //   borderColor: colors.blue1,
      //   shadowOpacity: 0.58,
      //   shadowRadius: 16.0,
      //   alignSelf:'center',
      //   justifyContent:'center',
      //   alignItems:'center'
      // }}
    >
      <ImageBackground
        source={
          chexk() == "checkedin"
            ? globalPath.checkinbtn
            : chexk() == "ontime"
            ? globalPath.defaultcheckin
            : globalPath.checkoutbtn
        }
        style={{
          height: wp(55),
          width: wp(55),
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveText size={5}>{checkinTime()}</ResponsiveText>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Checkin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

// rnfes
