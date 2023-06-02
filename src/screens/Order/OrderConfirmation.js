import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import PaymentCard from "../../components/PaymentCard";
import { useState } from "react";
import { useEffect } from "react";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import {
  getOrderHistory,
  get_cart_detail,
} from "../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import CheckBox from "../../components/CheckBox";
import Loader from "../../components/loader";
import RadioButton from "../../components/RadioButton";

const OrderConfirmation = ({ navigation, route }) => {
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(1);
  const [data, setData] = useState(route.params.cartData);
  const [Loading, setLoading] = useState(false);
  const [CurrentLocation, setCurrentLocation] = useState("Home");
  const [paymentData, setPaymentData] = useState([
    {
      paymentType: null,
      id: 1,
      name: "CashOnDelivery",
      accountNumber: "03001234567",
    },
    {
      paymentType: null,
      id: 2,
      name: "JazzCash",
      accountNumber: "03001234567",
    },
    {
      paymentType: null,
      id: 3,
      name: "EasyPaisa",
      accountNumber: "03001234567",
    },
  ]);
  const dispatch = useDispatch();
  const [Instructions, setInstructions] = useState("");
  const [SecondaryAddress, setSecondaryAddress] = useState("");

  useEffect(() => {
    // setSelectPaymentMethod(selectPaymentMethod)
    // console.log('selectPaymentMethod', selectPaymentMethod)
    // Get_PaymentTypes();
    const lat = 31.501658;
    const lng = 74.27797;

    // fetch(
    //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  const Get_PaymentTypes = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GetPaymentType);
      console.log("GetPaymentType", res);
      if (res && res.success == true) {
        setLoading(false);
        setPaymentData(res.data);
      } else {
        // _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  const Submit_Order = async (id) => {
    // const API_KEY = 'AIzaSyCOEnztaZbt9KQjNs-70Y1Dy8BsyCTtrvg';
    var obj = {
      orderId: data.id,
      orderStatus: 2,
      paymentMethodType: selectPaymentMethod,
      deliveryAddress: data.deliveryAddress,
      instructions: Instructions,
      SecoundaryAddress: SecondaryAddress,
    };

    try {
      setLoading(true);
      const res = await Api.post(urls.CHECKOUT_ORDER, obj);
      console.log("delete order", res);
      if (res && res.success == true) {
        dispatch(get_cart_detail());
        dispatch(getOrderHistory(1, 8));
        if (selectPaymentMethod != 1) {
          navigation.navigate(routeName.PAYMENT_CONFIRMATION, {
            obj: obj,
            data: data,
          });
          // return false;
        } else {
          navigation.navigate("OrderStack");
        }
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
              <ResponsiveText color={colors.white} size={8}>
                Order Confirmation
              </ResponsiveText>
              <ResponsiveText color={colors.white} size={3.5}>
                Take away & Home Delievery
              </ResponsiveText>
            </View>
          </ImageBackground>
          <View style={{ margin: wp(3) }}>
            {paymentData.map((item) => {
              return (
                <PaymentCard
                  title={item.name}
                  active={selectPaymentMethod == item.id}
                  source={
                    item.id == 2
                      ? globalPath.jazzCash
                      : item.id == 3
                      ? globalPath.easypaisa
                      : globalPath.Cash_Logo
                  }
                  onPress={() => setSelectPaymentMethod(item.id)}
                />
              );
            })}
            <View style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <ResponsiveText color={colors.grey1}>
                  Estimated delivery time:
                </ResponsiveText>
                <ResponsiveText size={3}>{"30 Mins"}</ResponsiveText>
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  checked={CurrentLocation == "Home"}
                  onPress={() => setCurrentLocation("Home")}
                />
                <ResponsiveText margin={[0, 0, 0, 10]} size={4}>
                  Home Address
                </ResponsiveText>
              </View>
              <ResponsiveText color={colors.grey1} margin={[10, 0, 0, 30]}>
                {data.deliveryAddress
                  ? data.deliveryAddress
                  : "Auranzeb Block Garden town Lahore, Pakistan"}
              </ResponsiveText>
            </View>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  checked={CurrentLocation == "Current"}
                  onPress={() => setCurrentLocation("Current")}
                />
                <ResponsiveText margin={[0, 0, 0, 10]} size={4}>
                  Current Location
                </ResponsiveText>
              </View>
            </View>
            {/* <CheckBox
              isActive={CurrentLocation}
              onPress={() => setCurrentLocation(!CurrentLocation)}
              name={"Current Location"}
            /> */}
          </View>
          {CurrentLocation == "Current" ? (
            <Card title={"Delivery Address"}>
              <View
                style={{
                  padding: 10,
                  // paddingHorizontal: 10,
                }}
              >
                <TextInput
                  style={{
                    height: 50,
                    width: wp(87),
                    // borderWidth: 0.5,
                    borderRadius: 8,
                    padding: 15,
                    // borderColor: color.black2,
                    alignContent: "center",
                    backgroundColor: colors.white,
                    color: colors.black,
                  }}
                  placeholderTextColor={colors.grey1}
                  textAlignVertical="top"
                  multiline={true}
                  placeholder="Type Secondary Address here..."
                  onChangeText={(text) => setSecondaryAddress(text)}
                  // defaultValue={text}
                />
              </View>
            </Card>
          ) : null}
          <Card title={"Cooking Instructions"}>
            <View
              style={{
                padding: 10,
                // paddingHorizontal: 10,
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  width: wp(87),
                  // borderWidth: 0.5,
                  borderRadius: 8,
                  padding: 15,
                  // borderColor: color.black2,
                  alignContent: "center",
                  backgroundColor: colors.white,
                  color: colors.black,
                }}
                placeholderTextColor={colors.grey1}
                textAlignVertical="top"
                multiline={true}
                placeholder="Type cooking instructions here..."
                onChangeText={(text) => setInstructions(text)}
                // defaultValue={text}
              />
            </View>
          </Card>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: hp(5),
            margin: wp(5),
            marginHorizontal: wp(8),
          }}
        >
          <View>
            <ResponsiveText color={colors.grey1}>Total price</ResponsiveText>
            <ResponsiveText size={5.5}>
              Rs. {data.totalAmount + data.deliveryCharges}
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => Submit_Order()}
            style={{
              backgroundColor: colors.primary,
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 15,
              borderRadius: 45,
            }}
          >
            <ResponsiveText color={colors.white} size={5}>
              Proceed
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  advertisementBanner: {
    // height: 130,
    // marginHorizontal: 10,
    alignItems: "center",
    // paddingTop:20
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
