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
import Loader from "../../../components/loader";

const Register = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [Address, setAddress] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [Loading, setLoading] = React.useState(false);

  const expressions = {
    email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  };

  const register = async () => {
    var obj = {
      FullName: fullName,
      ContactNumber: mobileNo,
      UserTypeId: 3,
      password: Password,
      //  CompanyId: 10,
      address: Address,
    };
    // const formdata = new FormData();
    // formdata.append("FullName", fullName);
    // formdata.append("ContactNumber", mobileNo);
    // formdata.append("Email", email);
    // formdata.append("UserTypeId", 1);
    // formdata.append("CompanyId", 6);
    try {
      const res = await Api.post(urls.VERIFICATION, obj);
      console.log("registration", res);
      setLoading(true)
      if (res && res.message == null) {
        navigation.navigate(routeName.VERIFICATION, {
          data: res.data,
          ObjData: obj,
        });
        // _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);

      }
    } catch (error) {}
  };

  const Validation = (item) => {
    // setErrorString("Please Enter Username and
    // navigation.replace(routeName.BOTTOM_TABS);

    // setErrorString("Please Enter Username and Password to proceed");
    setErrorString("");
    if (fullName === "" && mobileNo === "") {
      _toast("All fields are required");
    } else if (fullName === "") {
      _toast("Full name is missing");
    } else if (mobileNo === "") {
      _toast("Mobile number is missing");
    } else if (Address === "") {
      _toast("Address is missing");
    } else if (Password === "") {
      _toast("Password is missing");
    } else {
      register();
      // setErrorString("");
    }
  };
  // function removeEmojis (string) {
  //   var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  //   return string.replace(regex, '');
  // }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
        <TopShad />

        <ResponsiveText fontFamily={Fonts.Bold} size={8} weight={"bold"}>
          SIGN UP
        </ResponsiveText>

        <Input
          placeholder={"Full name"}
          margin={[20, 0, 5, 0]}
          onChnageText={(text) => setFullName(text)}
          leftIcon={globalPath.user}
        />

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
          secureTextEntry={true}
          leftIcon={globalPath.Password_Logo}
        />
        {/* <Input
          placeholder={"Email"}
          margin={[20, 0, 20, 0]}
          onChnageText={(text) => setEmail(text)}
          leftIcon={globalPath.email}
        /> */}
        <Input
          placeholder={"Address"}
          margin={[10, 0, 20, 0]}
          onChnageText={(text) => setAddress(text)}
          leftIcon={globalPath.address}
        />
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>
          {errorString}
        </ResponsiveText>
        <RnButton
          margin={[-10, 0, 20, 0]}
          title={"CONTINUE"}
          onPress={() => Validation()}
        />
        <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black}>
          Already have account?{"  "}
          <ResponsiveText
            fontFamily="Bold"
            color={colors.primary}
            onPress={() => navigation.navigate(routeName.LOGIN)}
          >
            LOGIN
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
        <ResponsiveText textAlign={"center"} color={colors.grey1} size={2.5}>
          Secure access your recent orders {"\n"}and saved location{" "}
        </ResponsiveText>
      </View>
    {Loading ? <Loader /> : undefined}
    </ScrollView>
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
