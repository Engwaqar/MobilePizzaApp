import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import ResponsiveText from "../../../components/RnText";
import RnButton from "../../../components/RnButton";
import Fonts from "../../../helpers/Fonts";
import { routeName } from "../../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import TopShad from "../../../components/TopShad";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../../redux/actions/user.actions";
import { _toast } from "../../../constants/Index";
import Icon from "../../../components/Icon";
import { globalPath } from "../../../constants/globalPath";
const CELL_COUNT = 6;

const Verification = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.userReducers.loginScreen.refreshing
  );
  const loginResponse = useSelector(
    (state) => state.userReducers.loginScreen.data
  );
  // const loginNetworkErr = useSelector(
  //   (state) => state.userReducers.loginScreen.errorMsg
  // );
  const [objdata, setobjdata] = useState(route.params.ObjData);
  const [data, setData] = useState(route.params.data);
  console.log("objdata", objdata);
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const userLogin = async () => {
    if (data.verifyCode == value) {
      register();
    } else {
      _toast("Verification Failed");
    }
  };
  const register = async () => {
    var obj = {
      FullName: objdata.FullName,
      ContactNumber: objdata.ContactNumber,
      UserTypeId: 3,
      CompanyId: 10,
      address: objdata.address,
      password: objdata.password,
    };
    console.log("object", obj);
    try {
      const res = await Api.post(urls.REGISTER, obj);
      console.log("Register Res", res);
      if (res && res.success == true) {
        dispatch(
          loginUser({
            params: {
              contactNumber: objdata.ContactNumber,
              password: objdata.password,
              userTypeId: 3,
            },
            navigation: navigation,
          })
        );
        _toast(res.message);
      } else {
        _toast(res.message);
        // navigation.navigate(routeName.VERIFICATION, res.data);
      }
    } catch (error) {}
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
        <TopShad navigation={navigation} arrow={globalPath.backArrow} />
        <ResponsiveText fontFamily={Fonts.Bold} size={8} weight={"bold"}>
          Welcome
        </ResponsiveText>
        <ResponsiveText textAlign={"center"} color={colors.primary} size={3}>
          Verify your mobile number{" "}
        </ResponsiveText>

        <ResponsiveText
          textAlign={"center"}
          size={3}
          color={colors.grey1}
          margin={[hp(4), 0, 0, 0]}
        >
          A text message with six digit code send to {"\n"}your number:{" "}
          {route.params.data?.verifyCode
            ? route.params.data.verifyCode
            : undefined}
        </ResponsiveText>
        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  { backgroundColor: colors.white },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>

        {/* <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText> */}
        <RnButton
          margin={[50, 0, 20, 0]}
          title={"CONTINUE"}
          onPress={() => userLogin()}
          // onPress={() => navigation.navigate(routeName.BOTTOM_TABS)}
        />
      </View>
    </ScrollView>
  );
};
export default Verification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.grey,
    // justifyContent: "center",
    // alignItems:'center'
  },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    margin: 5,
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#00000030",
    textAlign: "center",
    justifyContent: "center",
    color: colors.black,
    backgroundColor: colors.black2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.05,
    elevation: 4,
  },
  focusCell: {
    borderColor: colors.grey1,
    color: colors.blue1,
    textAlign: "center",
    justifyContent: "center",
  },
});
