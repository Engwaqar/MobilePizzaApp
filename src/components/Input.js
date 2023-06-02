import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { iconPath } from "../constants/globalPath";
import { handleMargin, handlePadding } from "../constants/theme";
import Fonts from "../helpers/Fonts";
import { wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import Feather from "react-native-vector-icons/Feather";
const Input = ({
  iconSize,
  height,
  color,
  margin,
  backgroundColor,
  padding,
  zIndex,
  fontFamily,
  tintColor,
  maxlength,
  placeholder,
  iconMargin,
  rightIconMargin,
  placeholderTextColor,
  width,
  containerStyle,
  secureTextEntry,
  onChnageText,
  fontSize,
  value,
  onSubmitEditing,
  searchBox,
  shadowColor,
  inputHeight,
  borderRadius,
  hideShadow,
  onFocus,
  autoFocus,
  ...props
}) => {
  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        check_textInputChange: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    // setData({
    //   ...data,
    //   secureTextEntry: !data.secureTextEntry,
    // });
    setVisible(!visible);
  };
  const [data, setData] = React.useState({
    // secureTextEntry: true,
  });
  const [visible, setVisible] = React.useState(true);
  return (
    <KeyboardAvoidingView>
      <View
        style={[
          styles.container,
          margin ? handleMargin(margin) : undefined,
          padding ? handlePadding(padding) : undefined,
          props.style,
          height && { height },
          borderRadius && { borderRadius },
          { width: width ? width : wp(80) },
          {
            zIndex: zIndex,
            backgroundColor: backgroundColor ? backgroundColor : colors.grey,
          },
          hideShadow && {
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 1,
            elevation: 0,
          },
          containerStyle,
        ]}
      >
        {props.leftIcon && (
          <Icon
            tintColor={tintColor ? tintColor : colors.black}
            margin={iconMargin ? iconMargin : [0, 10, 0, -4]}
            source={props.leftIcon}
            size={iconSize}
          />
        )}
        {props.RightIcon && (
          <Icon
            tintColor={tintColor ? tintColor : colors.black}
            margin={iconMargin ? iconMargin : [0, 10, 0, -4]}
            source={props.RightIcon}
            size={iconSize}
          />
        )}

        <TextInput
        autoFocus={autoFocus}
          value={value && value}
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable={props.editable}
          maxLength={maxlength}
          // secureTextEntry={false}
          style={[
            fontSize && { fontSize },
            inputHeight && { height: inputHeight },
            borderRadius && { borderRadius },
            styles.Input,
            fontFamily && { fontFamily: Fonts[fontFamily] },
            (onSubmitEditing = props.onSubmitEditing),
            props.centerText
              ? { textAlign: "center", paddingLeft: 0 }
              : undefined,
            props.textStyle,
            ,
            {
              color: color ? color : colors.black,
            },
          ]}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.grey1
          }
          placeholder={placeholder ? placeholder : undefined}
          // secureTextEntry={showPassword ? true : false}
          secureTextEntry={secureTextEntry ? visible : false}
          onChangeText={onChnageText ? (txt) => onChnageText(txt) : null}
          onFocus={onFocus?onFocus:onFocus}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            onPress={updateSecureTextEntry}
          >
            {visible ? (
              <Feather name="eye-off" size={15} style={styles.Feather} />
            ) : (
              <Feather name="eye" size={15} style={styles.Feather} />
            )}
            {/* <Icon
            tintColor={tintColor ? tintColor : colors.grey}
            margin={rightIconMargin ? rightIconMargin : [0, 10, 0, -4]}
            // style={gStyles.alS_End}
            size="s4"
            // source={showPassword ? iconPath.EYE_ICON : iconPath.EYE_OFF_ICON}
          /> */}
          </TouchableOpacity>
        )}
        {searchBox && (
          <TouchableOpacity
            style={styles.showPasswordBtn}
            // onPress={updateSecureTextEntry}
          >
            <Feather name="search" size={20} style={styles.Feather} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    height: wp(12),
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.green2,
    borderRadius: 5,
    // borderWidth:1,
    paddingLeft: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  Input: {
    borderRadius: wp(1.5),
    flex: 1,
    // paddingRight: 15,
    fontFamily: Fonts.Regular,
    color: colors.black,
    // height:wp(30),
    textAlignVertical: "top",
  },
  Feather: {
    marginRight: 5,

    color: colors.black,
  },
  showPasswordBtn: {
    height: "80%",
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
