import React, { version } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Card from "./Card";
import { routeName } from "../constants/routeName";
import { isImage } from "../constants/Index";
import { formatAMPM } from "../redux/actions/user.actions";
const CardView = (props) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
      onPress={() =>
        props.checkInTime ?null: props.navigation.navigate(routeName.ATTENDENCE_DETAIL, props.data)
      }
    >
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={
            isImage(props.source) ? { uri: props.source } : globalPath.user
          }
          style={{
            borderRadius: 20,
            height: wp(10),
            width: wp(10),
            resizeMode: "contain",
          }}
        />
        {props.checkInTime ? <View style={styles.Onlinebadge}></View> : null}
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <ResponsiveText
          color={colors.black}
          weight={"bold"}
          flex={1}
          size={3.5}
        >
          {props.title}
        </ResponsiveText>
        <ResponsiveText size={3.2} color={colors.black}>
          {props.userDesignation}
        </ResponsiveText>
      </View>
      {props.checkInTime ? (
        <View style={styles.timestyle}>
          <ResponsiveText color={colors.black} size={2.8}>
            {formatAMPM(props.checkInTime)}
          </ResponsiveText>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
const NotifationCard = (props) => {
  return (
    <Card flexDirection={"row"}>
      <Image
        source={globalPath.background}
        style={{
          borderRadius: 20,
          height: hp(5),
          width: wp(10),
          resizeMode: "contain",
        }}
      />
      <View style={{ padding: 5 }}>
        <ResponsiveText
          color={colors.black}
          // weight={"bold"}
          size={3.5}
        >
          Your request approved for leave
        </ResponsiveText>
        <ResponsiveText size={3} color={colors.grey1}>
          45 minutes ago
        </ResponsiveText>
      </View>
    </Card>
  );
};
const AttendenceCard = (props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <View style={{ alignItems: "flex-end" }}>
        <Image
          source={
            isImage(props.userimg) ? { uri: props.userimg } : globalPath.user
          }
          style={{
            borderRadius: 20,
            height: wp(11),
            width: wp(11),
            resizeMode: "contain",
          }}
        />
        {/* <View style={styles.Onlinebadge}></View> */}
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <ResponsiveText
            color={colors.black}
            // weight={"bold"}
            flex={1}
            size={3.2}
            // margin={[0, 0, 0, 5]}
          >
            Check-In
          </ResponsiveText>
          <ResponsiveText
            color={colors.green1}
            // weight={"bold"}
            flex={1.5}
            size={3.2}
            // margin={[0, 0, 0, 5]}
          >
            {formatAMPM(props.checkTime)}
          </ResponsiveText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ResponsiveText
            color={colors.black}
            // weight={"bold"}
            flex={1}
            size={3.2}
            // margin={[0, 0, 0, 5]}
          >
            Check-Out
          </ResponsiveText>
          <ResponsiveText
            color={colors.red}
            // weight={"bold"}
            flex={1.5}
            size={3.2}
            // margin={[0, 0, 0, 5]}
          >
            06:30 PM
          </ResponsiveText>
        </View>
      </View>
      <View>
        <ResponsiveText color={colors.grey1} size={2.5}>
          01 May,2022
        </ResponsiveText>
        <View style={styles.timestyle}>
          <ResponsiveText color={colors.black} size={2.8}>
            Present
          </ResponsiveText>
        </View>
      </View>
    </View>
  );
};
export { CardView, NotifationCard, AttendenceCard };
const styles = StyleSheet.create({
  Onlinebadge: {
    height: 9,
    width: 9,
    backgroundColor: colors.lightgreen,
    position: "absolute",
    borderRadius: 10,
    bottom: 10,
  },
  timestyle: {
    backgroundColor: colors.green10,
    borderRadius: 5,
    justifyContent: "center",
    height: 25,
    paddingHorizontal: 8,
    // width: wp(22),
    borderWidth: 1.5,
    borderColor: colors.green11,
  },
  container: {
    // elevation: 9,
    // shadowColor: colors.green,
    // shadowOpacity: 0.2,
    // padding: 20,
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // backgroundColor: colors.white,
    // marginHorizontal: 15,
    // borderRadius: 10
  },
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    padding: 25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});
