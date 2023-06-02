import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../helpers/Fonts";
import { colors } from "../constants/colorsPallet";
import { _toast } from "../constants/Index";

import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { isImage } from "../constants/Index";
import Icon from "./Icon";
// import ImagePicker from "react-native-image-crop-picker";
import urls from "../redux/lib/urls";
import Api from "../redux/lib/api";
import { useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/user.actions";
const Layout = (props) => {
  const [Loading, setLoading] = useState(false);

  const ProfileData = {};
  const [image, setImage] = useState(null);
  const addPhoto = async (image) => {
    var formData = new FormData();
    formData.append(
      "ImageData",
      image == null
        ? null
        : {
            uri: image.path,
            type: "image/jpeg",
            name: "photo.jpg",
          }
    );
    console.log("found data", formData);

    // setLoading(true);
    const res = await Api.put(urls.ADD_PROFILE_PIC + ProfileData.id, formData);
    console.log("res", res);
    if (res && res.success == true) {
      dispatch(getUserProfile());
      _toast("profile update successfully");
      // setLoading(false);
    } else {
      _toast("Something went wrong");

      // setLoading(false);
    }
  };
  const toggel = () => {
    Alert.alert("Profile Image", "change profile Image", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Select from gallary",
        onPress: async () => {
          takephotofromgallary();
        },
      },
    ]);
  };
  const takephotofromgallary = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   addPhoto(image);
    //   setImage(image);
    //   console.log(image, "image working");
    // });
  };
  return (
    <ImageBackground style={{flex:1}} source={globalPath.background}>
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.screeninfo}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginLeft: 30,
            }}
          >
            {props.backbutton ? (
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon
                  size={18}
                  margin={[5, 0, 0, 0]}
                  source={globalPath.backArrow}
                />
              </TouchableOpacity>
            ) : null}
            <ResponsiveText
              fontFamily={Fonts.Bold}
              margin={[0, 0, 0,0]}
              size={props.titleSize ? props.titleSize : 8}
              color={colors.white}
            >
              {props.title}
            </ResponsiveText>
            <TouchableOpacity
              disabled={!props.disabled ? props.disabled : true}
              onPress={props.onPress}
            >
              {props.source?
              <Image
                source={props.source}
                style={{
                  height: wp(7),
                  width: wp(18),
                  resizeMode: "contain",
                }}
              />:null
            }
            </TouchableOpacity>
          </View>
          <Image
                source={globalPath.logo}
                style={{
                  height: wp(28),
                  width: wp(28),
                  resizeMode: "contain",
                  alignSelf:'center'
                }}
              />
          
          
        
        </View>
          <View style={styles.footer}>{props.children}</View>
    </SafeAreaView>
    </ImageBackground>
  );
};
export default Layout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderBottomEndRadius:25,
    padding: 10,
    width:wp(93)
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screeninfo: {
    flex: 0.23,
    justifyContent: "center",
    borderBottomLeftRadius: 35,
    paddingBottom: 10,
  },
  logo: {
    height: hp(20),
    width: wp(40),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
  Onlinebadge: {
    height: 15,
    width: 15,
    backgroundColor: colors.lightgreen,
    position: "absolute",
    borderRadius: 10,
    bottom: 20,
    right: 10,
  },
});
