import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
// import Screen from "../../../components/Screen";
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import Fonts from "../../../helpers/Fonts";
import RnText from "../../../components/RnText";

// import Icon from "../../../components/Icon";
import { useDispatch } from "react-redux";
import ResponsiveText from "../../../components/RnText";
// import { getBfaPartners } from "../../../redux/actions/user.actions";

const Splash = ({ navigation }) => {
  //Validation Login
  const [Token, setToken] = React.useState(null);
  const [logo, setLogo] = React.useState(false);
  const [text, setText] = React.useState(false);
  const dispatch = useDispatch();

  const fetchAndSetUser = async () => {
    // await AsyncStorage.clear()
    const token = await AsyncStorage.getItem("@token");
    const id = await AsyncStorage.getItem("@userId");
    const ContinueAs = await AsyncStorage.getItem("@ContinueAs");
    console.log("user Id: ", ContinueAs);
    console.log(token, "token");
    setToken(token);
    if (token === null) {
      setTimeout(() => {
        setLogo(true);
        setTimeout(() => {
          setLogo(false);
          setText(true);
          setTimeout(() => {
            // navigation.dispatch(
            //   CommonActions.reset({
            //     index: 0,
            //     routes: [{ name: routeName.BOTTOM_TABS, isLoggedIn: false }],
            //   })
            // );
            if (ContinueAs=='Guest') {
              
              navigation.replace(routeName.BOTTOM_TABS, { isLoggedIn: false });
            }else if(ContinueAs=='Rider')  {
              navigation.replace(routeName.RIDER_HOME);
              
            }else{
              navigation.replace(routeName.CONTINUE_AS);

            }
          }, 2000);
        }, 2000);
      }, 0);
    } else {
      // navigation.dispatch(StackActions.replace(routeName.LANDING_SCREEN));
      // navigation.replace(routeName.BOTTOM_TABS, { isLoggedIn: true });
      if (ContinueAs=='Guest') {
              
        navigation.replace(routeName.BOTTOM_TABS, { isLoggedIn: true });
      }if(ContinueAs=='Rider')  {
        navigation.replace(routeName.RIDER_HOME);
        
      }
    }
  };

  React.useEffect(() => {
    fetchAndSetUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={globalPath.logo} />
      <ResponsiveText
        textAlign={"center"}
        margin={[0, 0, hp(10), 0]}
        fontFamily={Fonts.SemiBold}
        size={9}
      >
        Original {"\n"} Italian Recipies
      </ResponsiveText>
      <ImageBackground
        source={globalPath.splashBg}
        resizeMode={"cover"}
        style={styles.footerContainer}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            bottom: -20,
          }}
        >
          <RnText color={colors.white} fontFamily={Fonts.LightItalic}>
            Powered By{" "}
          </RnText>
          <Image style={styles.poweredLogo} source={globalPath.poweredby} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerContainer: {
    height: hp(45),
    width: wp(100),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(20),
    width: wp(60),
    resizeMode: "contain",
    marginTop: hp(10),
  },
  poweredLogo: {
    height: hp(15),
    width: wp(15),
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
export default Splash;
