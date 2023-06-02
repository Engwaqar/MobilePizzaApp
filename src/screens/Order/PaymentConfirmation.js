import {
    Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import Icon from "../../components/Icon";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import Input from "../../components/Input";
import ImagePicker from "react-native-image-crop-picker";
import { useState } from "react";
import RnButton from "../../components/RnButton";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import {_toast} from "../../constants/Index";
import Loader from "../../components/loader";

const PaymentConfirmation = ({ navigation ,route}) => {
  const {obj,data}=route.params
    const [imageFile, setImageFile] = useState(null);
    const [refrenceId, setRefrenceId] = useState('')
    const [Loading, setLoading] = useState(false);
// console.log('first', obj,data)
    const Submit_Payment = async () => {
      if (imageFile==null) {
        _toast('Please add Receipt Screenshot')
        return false
      }
    
      var formdata = new FormData();
      formdata.append("BillId", "0");
      formdata.append("OrderId", data.id);
      formdata.append("PaymentMode", obj.paymentMethodType);
      formdata.append("TransactionReference", refrenceId);
      formdata.append('ImageData',imageFile != null
      ? {
          uri: imageFile.path,
          type: "image/jpeg",
          name: imageFile.filename?imageFile.filename:imageFile.modificationDate,
        }
      : null)
      formdata.append("Active", true);
      formdata.append("CompanyId", data.companyId);
      
      try {
        setLoading(true);
        const res = await Api.post(urls.Bill_PAYMENTS, formdata);
        console.log("Bill_PAYMENTS", res);
        if (res && res.success == true) {
          // dispatch(get_cart_detail());
          // dispatch(getOrderHistory(1, 8));
          navigation.navigate("OrderStack");
          setLoading(false);
        } else {
          // _toast(res.message)
          setLoading(false);
        }
      } catch (error) {
        // seterrorString(error);
        setLoading(false);
      }
    };

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
      
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <TouchableOpacity
        style={{
          marginHorizontal: wp(3),
        }}
        onPress={() => navigation?.goBack()}
      >
        <Icon source={globalPath.backArrow} />
      </TouchableOpacity>
      <View style={{ backgroundColor: colors.white, flex: 1, marginTop: 20 }}>
        <ScrollView>
          <ImageBackground
            style={{ height: hp(14), width: wp(100) }}
            imageStyle={{ resizeMode: "stretch" }}
            source={globalPath.topBg}
          >
            <View style={styles.advertisementBanner}>
              {/* <Swiper data={StateLife} /> */}
              <ResponsiveText color={colors.white} size={6}>
                Payment Confirmation
              </ResponsiveText>
              <ResponsiveText color={colors.white} size={3.5}>
                Take away & Home Delievery
              </ResponsiveText>
            </View>
          </ImageBackground>
          <View style={{alignItems:'center'}} >
            <Icon source={obj.paymentMethodType==2?globalPath.jazzCash:obj.paymentMethodType==3?globalPath.easypaisa: globalPath.Cash_Logo}  size={60} />
            <ResponsiveText margin={[10,0,10,0]} size={5} color={colors.grey1} >Do you want to Pay?</ResponsiveText>
            <ResponsiveText margin={[10,0,10,0]} size={7} color={colors.primary} weight={'bold'} >Rs. {data.totalAmount}</ResponsiveText>
            <ResponsiveText margin={[0,0,0,0]} size={4} color={colors.grey1}>To</ResponsiveText>
            <ResponsiveText margin={[10,0,30,0]} size={4} color={colors.grey1}>Account Number:03041234567</ResponsiveText>
            <Input  keyboardType="numeric" leftIcon={globalPath.mobile} placeholder={'Enter Refrence ID'} onChnageText={(text)=>setRefrenceId(text)} />

            <TouchableOpacity style={{marginTop:hp(5)}} onPress={() => openPicker()}>
                <ResponsiveText color={colors.primary}  size={4} weight={'bold'} >Attach Receipt Screenshot</ResponsiveText>
            </TouchableOpacity>
            {imageFile !=null?
        <Image style={{width:wp(80),height:hp(20),marginTop:hp(3)}} source={{uri:imageFile.path}} />    :null
        }

          <RnButton
              margin={[40, 0, 0, 0]}
              alignSelf="center"
              title={"SUBMIT"}
              onPress={() => Submit_Payment()}
            />
          </View>
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}

    </SafeAreaView>
  );
};

export default PaymentConfirmation;

const styles = StyleSheet.create({
  advertisementBanner: {
    // height: 130,
    // marginHorizontal: 10,
    alignItems: "center",
    // paddingTop:20
  },
});
