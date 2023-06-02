import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
// import Screen from "../../../components/Screen";
import { SliderImages } from "../../../constants/mock";
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import Fonts from "../../../helpers/Fonts";
import RnText from "../../../components/RnText";
import Swiper from "react-native-swiper";

// import Icon from "../../../components/Icon";
import { useDispatch } from "react-redux";
// import { getBfaPartners } from "../../../redux/actions/user.actions";

const Splash = ({ navigation }) => {
  React.useEffect(() => {
    //fetchAndSetUser();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        removeClippedSubviews={false}
        showsButtons={false}
        // dotColor="white"
        activeDotColor="green"
      >
        {SliderImages.map((Image) => {
          return (
            <View style={styles.slide1}>
              <Image style={styles.poweredLogo} source={Image.url} />
            </View>
          );
        })}
      </Swiper>
      <View style={styles.Text1}>
        <TouchableOpacity onPress={() => navigation.navigate(routeName.LOGIN)}>
          <Text style={styles.Text}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  poweredLogo: {
    height: hp(100),
    width: wp(100),
    resizeMode: "contain",
    position: "absolute",
  },
  image: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: hp(20),
    width: wp(60),
    resizeMode: "contain",
  },
  slide1: {
    flex: 0,
  },
  Text1: {
    position: "absolute",
    bottom: 0,
    right: 5,
    marginBottom: "4%",
    marginRight: "7%",
  },
  Text: {
    fontWeight: "bold",
    fontSize: 15,
    color: "green",
  },
});
export default Splash;
