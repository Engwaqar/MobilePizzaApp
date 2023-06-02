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
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/user.actions";
import AsyncStorage from "@react-native-community/async-storage";

const ContinueAs = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [mobileNo, setMobileNo] = React.useState("");
  const dispatch = useDispatch();
  const userLogin = async () => {
    var obj = {
      contactNumber: mobileNo,
      password: Password,
      userTypeId: 1,
    };
    dispatch(
      loginUser({
        params: obj,
        navigation: navigation,
      })
    );
  };

  const SUBMIT =async (Type) => {
    setErrorString("");
    // if (fullName === "" && email === "" && mobileNo === "") {
    //   _toast("All fields are required");
    // } else if (fullName === "") {
    //   _toast("Full name is missing");
    // }
    if (Type === "Guest") {
        await AsyncStorage.setItem('@ContinueAs','Guest')
        navigation.replace(routeName.BOTTOM_TABS, { isLoggedIn: false });

    } else if (Type === "Rider") {
        await AsyncStorage.setItem('@ContinueAs','Rider')
        navigation.navigate(routeName.LOGIN);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
        <TopShad />

        <ResponsiveText fontFamily={Fonts.Bold} size={8} weight={"bold"}>
        Continue As
        </ResponsiveText>

      
        <RnButton
          margin={[30, 0, 20, 0]}
          title={"GUEST"}
          onPress={() => SUBMIT('Guest')}
        />
         <RnButton
          margin={[10, 0, 20, 0]}
          title={"RIDER"}
          onPress={() => SUBMIT('Rider')}
        />
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
    </ScrollView>
  );
};
export default ContinueAs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.grey,
    // justifyContent: "center",
    // alignItems:'center'
  },
});
