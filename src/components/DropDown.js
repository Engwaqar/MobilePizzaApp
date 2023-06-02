//Node Imports
import React from 'react'
import { View, Text } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
//Local Imports
import { globalPath } from '../constants/globalPath';
import { colors } from '../constants/colorsPallet';
import { hp } from '../helpers/Responsiveness';
import { wp } from '../helpers/Responsiveness';
import Icon from './Icon';
export default function DropDown(props) {


  return (
    <View style={{
      backgroundColor:props.backgroundColor?props.backgroundColor: colors.white,
      height: props.height ? props.height : hp(6),
      width: props.width ? props.width : wp(85),
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 20,
    }}>
      <SelectDropdown
        statusBarTranslucent={false}
        dropdownStyle={{ borderRadius: 5, borderBottomWidth: 0 }}
        dropdown1RowTxtStyle={{ color: colors.yellow, textAlign: "left", marginStart: 20, fontSize: 14, }}
        defaultValueByIndex={props.defaultValueByIndex}
        defaultButtonText={props.defaultButtonText?props.defaultButtonText:null}
        rowTextStyle={{ color:props.btncolor?props.btncolor: colors.black, alignSelf: 'center', fontSize: 14 }}
        rowStyle={{ backgroundColor:props.btnbackgroundColor?props.btnbackgroundColor: colors.white, borderBottomColor: colors.black1, borderBottomWidth: 0 }}
        buttonStyle={{
          backgroundColor: props.backgroundColor ? props.backgroundColor : colors.white,
          height: props.btnheight ? props.btnheight : hp(6.5),
          width: props.btnwidth ? props.btnwidth : wp(90),
          height: props.height ? props.height : hp(6.5),
          width: props.width ? props.width : wp(90),
          alignSelf: 'center',
          borderRadius: 40,
        }}
        buttonTextStyle={{ color: props.color ? props.color : colors.gray, fontSize: 14, textAlign: 'left', }}
        renderDropdownIcon={() => {
          return (
            <Icon source={globalPath.arrow} tintColor={colors.gray} size={15} margin={[0, 10, 0, 0]} />
            
          );
        }}
        // dropdownIconPosition={"left"}
        data={props.data ? props.data : undefined}
        onSelect={props.onSelect ? props.onSelect : () => { }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  )
}
