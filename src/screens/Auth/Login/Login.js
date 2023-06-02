import React from "react";
import { StyleSheet, View } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import ResponsiveText from "../../../components/RnText";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Fonts from "../../../helpers/Fonts";
import { routeName } from "../../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
import TopShad from "../../../components/TopShad";
import { colors } from "../../../constants/colorsPallet";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import { _toast } from "../../../constants/Index";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/user.actions";
import Loader from "../../../components/loader";
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = ({ navigation }) => {
  const Loading = useSelector(
    (state) => state.userReducers.loginScreen.refreshing
  );
  const [errorString, setErrorString] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");

  const dispatch = useDispatch();
  const userLogin = async () => {
    var userType = await AsyncStorage.getItem("@ContinueAs");
    console.log("hhh", "@ContinueAs");
    var obj = {
      contactNumber: mobileNo,
      password: Password,
      userTypeId: userType == "Guest" ? 3 : 4,
    };
    dispatch(
      loginUser({
        params: obj,
        navigation: navigation,
      })
    );
  };

  const Validation = (item) => {
    setErrorString("");
    // if (fullName === "" && email === "" && mobileNo === "") {
    //   _toast("All fields are required");
    // } else if (fullName === "") {
    //   _toast("Full name is missing");
    // }
    if (mobileNo === "") {
      _toast("Mobile number is missing");
    } else if (Password === "") {
      _toast("Kindly enter youre password");
    } else {
      userLogin();
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <TopShad />

            <ResponsiveText fontFamily={Fonts.Bold} size={8} weight={"bold"}>
              LOGIN
            </ResponsiveText>

            {/* <Input
          placeholder={"Full name"}
          margin={[40, 0, 5, 0]}
          onChnageText={(text) => setFullName(text)}
          leftIcon={globalPath.user}
        /> */}

            <Input
              placeholder={"Mobile"}
              margin={[20, 0, 5, 0]}
              keyboardType="numeric"
              maxlength={11}
              onChnageText={(text) => setMobileNo(text)}
              leftIcon={globalPath.mobile}
            />
            <Input
              placeholder={"Password"}
              margin={[20, 0, 20, 0]}
              onChnageText={(text) => setPassword(text)}
              leftIcon={globalPath.Password_Logo}
              secureTextEntry={true}
            />

            <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
              {errorString}
            </ResponsiveText>
            <RnButton
              margin={[-10, 0, 20, 0]}
              title={"LOGIN"}
              onPress={() => Validation()}
            />
            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>
              New user?{"  "}
              <ResponsiveText
                fontFamily="Bold"
                color={colors.primary}
                onPress={() => navigation.navigate(routeName.SIGNUP)}
              >
                Sign Up
              </ResponsiveText>
            </ResponsiveText>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: hp(3),
            }}
          >
            <ResponsiveText
              textAlign={"center"}
              color={colors.grey1}
              size={2.5}
            >
              Secure access your recent orders {"\n"}and saved location{" "}
            </ResponsiveText>
          </View>
        </ScrollView>
        {Loading ? <Loader /> : undefined}
      </View>
    </SafeAreaView>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.grey,
    // justifyContent: "center",
    // alignItems:'center'
  },
});
