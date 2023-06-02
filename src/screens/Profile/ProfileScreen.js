import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import AsyncStorage from "@react-native-community/async-storage";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/user.actions";
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
    const data = useSelector(state => state.userReducers.profileData.data,);
    const Loading = useSelector(state => state.userReducers.profileData.refreshing);
    useEffect(() => {
        dispatch(getProfile());
    }, [])
    console.log('User Profile', data)
  // const [Loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState("");
  // const [data, setData] = useState({});

  // const get_Profile_Detail = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await Api.get(urls.GET_Profile);
  //     console.log("profile", res);
  //     if (res && res.success == true) {
  //       setData(res.data);
  //       setLoading(false);
  //     } else {
  //       // _toast(res.message)
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     seterrorString(error);
  //     setLoading(false);
  //   }
  // };
  // //useEffect
  // useEffect(() => {
  //   get_Profile_Detail();
  // }, []);
  const cleardata = async () => {
    await AsyncStorage.clear();
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 25 }}>
        <ImageBackground
          style={{ height: hp(25), width: wp(100) }}
          imageStyle={{ resizeMode: "stretch" }}
          source={globalPath.topBg}
        >
          <HomeHeader logoutt navigation={navigation} />

          <View style={styles.advertisementBanner}>
            <Image
              style={{
                height: wp(25),
                width: wp(25),
                borderRadius: 75,
                borderWidth: 3,
                borderColor: colors.white,
                backgroundColor:colors.white,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              defaultSource={globalPath.pizza21}
              source={{ uri:data.fullPath }}

            />
            <TouchableOpacity
              onPress={() => navigation.navigate(routeName.EDIT_PROFILE)}
              style={styles.editbtn}
            >
              <Icon
                size={18}
                tintColor={colors.black}
                source={globalPath.pencil}
              />
            </TouchableOpacity>
          </View>
            <ResponsiveText color={colors.white} textAlign={'center'} size={4}>
            {data.fullName}
            </ResponsiveText>
        </ImageBackground>
        <ScrollView>
          <View
            style={{
              margin: 5,
              backgroundColor: "#cfc6c7",
              padding: 10,
            }}
          >
            <View style={styles.cardView}>
              <Icon size={25} source={globalPath.userR} />
              <View style={styles.innercard}>
                <ResponsiveText>User Name</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {data.userName}
                </ResponsiveText>
              </View>
            </View>
            {data.email?
            <View style={styles.cardView}>
              <Icon size={25} source={globalPath.emailR} />
              <View style={styles.innercard}>
                <ResponsiveText>Email</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {data.email}
                </ResponsiveText>
              </View>
            </View>:null}
            <View style={styles.cardView}>
              <Icon size={25} source={globalPath.phoneB} />
              <View style={styles.innercard}>
                <ResponsiveText>Phone</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {data.contactNumber}
                </ResponsiveText>
              </View>
            </View>
            <View style={[styles.cardView, { borderBottomWidth: 0 }]}>
              <Icon size={25} source={globalPath.address} />
              <View style={styles.innercard}>
                <ResponsiveText>Address</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {data.address}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  advertisementBanner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop:20
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15,
    height: 20,
  },
  cardView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 20,
    // paddingVertical:20,
    borderBottomWidth: 0.2,
  },
  innercard: {
    marginLeft: 15,
  },
  editbtn: {
    backgroundColor: colors.white,
    borderRadius: 45,
    padding: 4,
    left: -15,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
