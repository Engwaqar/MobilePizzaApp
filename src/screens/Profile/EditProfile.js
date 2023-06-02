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
import { _toast } from "../../constants/Index";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import AsyncStorage from "@react-native-community/async-storage";
import Input from "../../components/Input";
import RnButton from "../../components/RnButton";
import ImagePicker from "react-native-image-crop-picker";
import Loader from "../../components/loader";
import { useDispatch } from "react-redux";
import { getProfile } from "../../redux/actions/user.actions";

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const [Loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState("");
  const [data, setData] = useState({});
  const [UserName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const get_Profile_Detail = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_Profile);
      console.log("profile", res);
      if (res && res.success == true) {
        setData(res.data);
        setLoading(false);
        setUserName(res.data.userName);
        setContactNumber(res.data.contactNumber);
        setAddress(res.data.address);
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      } else {
        // _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      seterrorString(error);
      setLoading(false);
    }
  };
  //useEffect
  useEffect(() => {
    get_Profile_Detail();
  }, []);
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImageFile(image);
    });
  };
  const submitData = async () => {
    const formdata = new FormData();
    formdata.append("id", data.id);
    formdata.append("fullName", fullName);
    formdata.append("Username", UserName);
    formdata.append("ContactNumber", contactNumber);
    formdata.append("Email", email);
    formdata.append("Address", address);
    formdata.append("UserTypeId", 1);
    formdata.append(
      "ImageData",
      imageFile != null
        ? {
            uri: imageFile.path,
            type: "image/jpeg",
            name: imageFile.filename,
          }
        : null
    );
    console.log("formdata", formdata);
    try {
      setLoading(true);

      const res = await Api.put(urls.EDIT_PROFILE + data.id, formdata);
      console.log("res", res);
      if (res.success == true) {
        dispatch(getProfile());
        _toast(res.message);
        navigation.goBack();
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
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
          <TouchableOpacity
            style={{ marginLeft: wp(5) }}
            onPress={() => navigation?.goBack()}
          >
            <Icon source={globalPath.backArrow} />
          </TouchableOpacity>

          <View style={styles.advertisementBanner}>
            <Image
              style={{
                height: wp(25),
                width: wp(25),
                borderRadius: 75,
                borderWidth: 3,
                borderColor: colors.white,
                backgroundColor: colors.grey,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              defaultSource={globalPath.pizza21}
              source={{
                uri: imageFile != null ? imageFile?.path : data.fullPath,
              }}
            />
            <TouchableOpacity
              style={styles.editbtn}
              onPress={() => openPicker()}
            >
              <Icon source={globalPath.camera} />
            </TouchableOpacity>
            {/* <ResponsiveText color={colors.white} size={5}>
                Altaf Hussain
              </ResponsiveText> */}
          </View>
        </ImageBackground>
        <ScrollView>
          <View style={{ margin: wp(10) }}>
            <ResponsiveText margin={[0, 0, 10, 0]}>Full Name</ResponsiveText>
            <Input
              placeholder={"Full Name"}
              value={fullName}
              onChnageText={(text) => setFullName(text)}
            />
            <ResponsiveText margin={[15, 0, 10, 0]}>User Name</ResponsiveText>
            <Input
              placeholder={"User Name"}
              value={UserName}
              onChnageText={(text) => setUserName(text)}
            />
            <ResponsiveText margin={[15, 0, 10, 0]}>Email</ResponsiveText>
            <Input
              placeholder={"Email"}
              value={email}
              onChnageText={(text) => setEmail(text)}
            />
            <ResponsiveText margin={[15, 0, 10, 0]}>
              Phone Number
            </ResponsiveText>
            <Input
              placeholder={"0300-000000000"}
              value={contactNumber}
              onChnageText={(text) => setContactNumber(text)}
            />
            <ResponsiveText margin={[15, 0, 10, 0]}>Address</ResponsiveText>
            <Input
              placeholder={"Address"}
              value={address}
              onChnageText={(text) => setAddress(text)}
            />
            <RnButton
              margin={[40, 0, 20, 0]}
              alignSelf="center"
              title={"SAVE"}
              onPress={() => submitData()}
            />
          </View>
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  advertisementBanner: {
    // height: 130,
    // marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
