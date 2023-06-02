import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import React from 'react'
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from './RnText';
import Icon from './Icon';
const UpperTab = ({source,title,onPress}) => {
  return (
    <TouchableOpacity style={[styles.middle_images]}
     onPress={onPress}>
      <Icon
        source={source}
        size={23}
        tintColor={colors.white}
      />
      <ResponsiveText size={4} color={colors.white} margin={[0,0,0,10]}>{title}</ResponsiveText>
    </TouchableOpacity>
  )
}

export default UpperTab

const styles = StyleSheet.create({

  middle_images: {
    // borderRightWidth: 0.4,
    // borderColor: colors.grey,
    alignItems: "center",
    justifyContent:'center',
    height: 35,
    width: wp(43),
    // margin: 2,
    borderRadius: 10,
    backgroundColor: colors.primary,
    flexDirection:'row'

  },
})