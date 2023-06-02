import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
export default function CheckBox({
  text,
  onPress,
  checkedd,
  name,
  price,
  isActive,
  quantity,
  addonPress,
  removeonPress,
  disabled
}) {
  // const [checked, setChecked] = React.useState(checkedd ? checkedd : false);
  return (
    // <View style={{ flexDirection: "row" }}>
    <TouchableOpacity style={styles.listView} onPress={onPress} disabled={disabled} >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 3,
          backgroundColor: isActive ? colors.primary : colors.grey,
          borderWidth: isActive ? undefined : 2,
          borderColor: isActive ? undefined : colors.grey1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isActive ? (
          <Icon source={globalPath.check} size={12} tintColor={colors.white} />
        ) : (
          <View />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {text ? (
          <ResponsiveText color={colors.grey1} margin={[0, 0, 0, 10]}>
            {text}
          </ResponsiveText>
        ) : null}
        <ResponsiveText margin={[0, 0, 0, 25]}>{name}</ResponsiveText>
        {price ? <ResponsiveText>+ Rs: {price}</ResponsiveText> : null}
        {quantity != undefined ? (
          <View style={{ flexDirection: "row" ,alignItems:'center'}}>
            <View style={{backgroundColor:colors.primary,paddingHorizontal:1,borderRadius:5}}>
            {quantity>0?
            <TouchableOpacity onPress={removeonPress} >
              <ResponsiveText margin={[0, 9, 7, 8]}color={colors.white}size={4} weight={'bold'} >-</ResponsiveText>
            </TouchableOpacity>:null}
            </View>
            <ResponsiveText margin={[0,10,0,10]} >{quantity}</ResponsiveText>
            <TouchableOpacity onPress={addonPress} >
            <View style={{backgroundColor:colors.primary,paddingHorizontal:1,borderRadius:5,}}>
              <ResponsiveText margin={[2, 7, 5, 8]} alignItems={'center'}   color={colors.white}  size={4} weight={'bold'} >+</ResponsiveText>
            </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
    // </View>
  );
}
const styles = StyleSheet.create({
  listView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: wp(90),
    padding: 10,
    borderRadius: 10,
    // justifyContent: "space-between",
    marginTop: 10,
  },
});
