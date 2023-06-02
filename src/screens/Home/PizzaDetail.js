import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import HomeHeader from "../../components/HomeHeader";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../helpers/Responsiveness";
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from "../../components/RnText";
import CheckBox from "../../components/CheckBox";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { useState } from "react";
import { useEffect } from "react";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import NetworkModel from "../../components/NetworkModel";
import { isImage } from "../../constants/Index";
import Loader from "../../components/loader";
import RadioComponent from "../../components/RadioComponent";
import { routeName } from "../../constants/routeName";
import AsyncStorage from "@react-native-community/async-storage";
import { _toast } from "../../constants/Index";
import FastImage from "react-native-fast-image";
import { get_cart_detail } from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";

export default function PizzaDetail({ navigation, route }) {

  const cartData = useSelector((state) => state.userReducers.cartData.data);

  const [count, setCount] = useState(1);
  const [detail, setDetail] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [slectedTopping, setslectedTopping] = useState([]);
  const [reRender, setreRender] = useState(false);
  const [selectedcrust, setselectedcrust] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState("");
  const dispatch = useDispatch();
  var {item,companyId} = route?.params;
console.log('route?.params', route?.params)
  const loginVerification = async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token === null) {
      navigation.navigate("Authstack");
    } else {
      Add_to_Cart();
      // alert("order add successfully");
    }
  };
  const Add_to_Cart = async () => {
console.log('cartData', cartData)
var orderId=cartData.length> 0?cartData.find((v)=>v.companyId==companyId)?cartData.find((v)=>v.companyId==companyId).id:0:0
    console.log('selectedToppings', slectedTopping)
    var toppings=[]
    slectedTopping.forEach(element => {
      toppings.push({
        "id": 0,
        "referenceId": element.id,
        "orderDetailId": orderId,
        "referenceTypeId": 1
      })
    });
    var obj2={
      "orderId": orderId,
      "orderType": 1,
      // "instructions": Instructions,
      "companyId": companyId,
      "deliveryCharges": 0,
      "methodType": 1,
      "objOrderDetail": [
        {
          "orderId": orderId,
          "dealId": null,
          "itemId": detail.id,
          "itemSizeId": detail.objGetAllItemSize.length > 0
          ? detail.objGetAllItemSize[selectedTab].id
          : null,
          "crustId": detail.objGetAllCrust.length > 0
          ? detail.objGetAllCrust[selectedcrust].id
          : null,
          "quantity": count,
          "orderType": 0,
          "subTotal": GetAllItemPrice(selectedTab),
          "objDeals": [],
          "objAdditionalDetails": toppings,
    
        }
      ]
    }
console.log('obj', obj2)
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_TO_CART, obj2);
      console.log("Add to cart", res);
      if (res && res.success == true) {
        _toast(res.message);
        setLoading(false);
        dispatch(get_cart_detail());
        navigation.navigate(routeName.CART);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      _toast(error);

      // seterrorString(/error);
    }
  };
  const get_Menu_Detail = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.get_menu_detail + item?.id);
      console.log("menu detail", res);
      if (res && res.success == true) {
        setDetail(res.data[0]);
        if (res.data[0].objGetAllCrust) {
          setselectedcrust(res.data.objGetAllCrust[0].id);
        }
        setLoading(false);
      } else {
        // _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      seterrorString(error);
      setLoading(false);
    }
  };
  //use effect
  useEffect(() => {
    get_Menu_Detail();
  }, []);
  useEffect(() => {
    setCount(count);
    setslectedTopping(slectedTopping);
  }, [count, reRender]);

  useEffect(() => {
    errorString ? seterrorString(errorString) : null;
    console.log("networklkkkkkkk", errorString);
  }, [errorString]);
  const update = () => {
    get_Menu_Detail();
  };

  //fuctions
  const GetAllItemPrice = (index) => {
    if (detail.objGetAllItemSize) {
      var sumoflinedItems = slectedTopping.reduce((a, c) => {
        return a + c.price;
      }, 0);
      var crustPrice=detail.objGetAllCrust.length > 0
      ? (detail.objGetAllCrust?.find((v)=>v.id==selectedcrust))?(detail.objGetAllCrust?.find((v)=>v.id==selectedcrust))?.price:0
      : 0
      // console.log('sumoflinedItems', sumoflinedItems,detail.objGetAllItemSize[index]?.price)
      var total=(detail.objGetAllItemSize[index]?.price + sumoflinedItems+crustPrice) * count
      return total;
    } else {
      return 0;
    }
  };

  const updateCount = (type) => {
    if (type == "Inc") {
      setCount(count + 1);
    } else {
      setCount(count > 1 ? count - 1 : 1);
    }
  };

  //Add toopings
  const AddToppings = (item) => {
    if (slectedTopping.some((v) => v.id == item.id)) {
      var removeItem = slectedTopping.filter((v) => v.id !== item.id);
      setslectedTopping(removeItem);
      console.log("removeItem", removeItem);
    } else {
      slectedTopping.push(item);
      setslectedTopping(slectedTopping);
    }
    setreRender(!reRender);
    console.log("slectedTopping", slectedTopping);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <NetworkModel
        active={true}
        error={errorString}
        reload={() => {
          update;
        }}
      />

      <HomeHeader navigation={navigation} />

      <View style={{ backgroundColor: colors.grey, flex: 1 }}>
        <ScrollView>
          <ImageBackground
            style={{
              height: hp(20),
              width: wp(100),
              alignItems: "center",
              marginBottom: wp(45),
            }}
            source={globalPath.topBg}
          >
            <FastImage
              defaultSource={globalPath.noImage}
              style={{
                borderRadius: 200,
                width: wp(85),
                height: wp(85),
                borderWidth: 10,
                borderColor: colors.white,
                resizeMode: "contain",
              }}
              source={
                isImage(detail.fullPath)
                  ? { uri: detail.fullPath, priority: FastImage.priority.high }
                  : globalPath.pizzaLarge
              }
            />
          </ImageBackground>
          <View style={{ alignItems: "center" }}>
            <ResponsiveText size={6}>{detail.itemName}</ResponsiveText>
            <ResponsiveText textAlign={"center"} size={3} color={colors.grey1}>
              {detail.itemDescription}
            </ResponsiveText>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              {detail.objGetAllItemSize?.length > 1
                ? detail.objGetAllItemSize.map((item, index) => (
                    <TouchableOpacity
                      // selectedTab index ? setActivee(true) : setActivee(false)

                      onPress={() => setSelectedTab(index)}
                      style={[
                        styles.circle,
                        {
                          backgroundColor:
                            selectedTab == index
                              ? colors.primary
                              : colors.lightGrey,
                        },
                      ]}
                    >
                      <ResponsiveText
                        size={6}
                        color={
                          selectedTab == index ? colors.white : colors.black
                        }
                      >
                        {item.sizeDescription == "Extra Large"
                          ? "XL"
                          : item.sizeDescription[0]}
                      </ResponsiveText>
                    </TouchableOpacity>
                  ))
                : undefined}
            </View>

            <ResponsiveText size={5} color={colors.primary}>
              Rs:{" "}
              {detail.objGetAllItemSize?.length > 0
                ? detail.objGetAllItemSize[selectedTab]?.price
                : ""}
            </ResponsiveText>
          </View>
          {detail.objGetAllCrust?.length > 0 ? (
            <Card title={"Crust"}>
              {detail.objGetAllCrust.filter((v)=>v.itemSizeId==detail.objGetAllItemSize[selectedTab].id).map((item, index) => (
                <RadioComponent
                  isActive={selectedcrust == index}
                  onPress={() => setselectedcrust(index)}
                  title={item.name}
                  price={item.price}
                />
              ))}
            </Card>
          ) : undefined}
          {detail.objGetAllTopping?.length > 0 ? (
            <Card title={"Select Extra Toppings"}>
              {detail.objGetAllTopping.filter((v)=>v.itemSizeId==detail.objGetAllItemSize[selectedTab].id).map((item) => (
                <CheckBox
                  isActive={
                    slectedTopping.filter((v) => v.id == item.id).length > 0
                  }
                  onPress={() => AddToppings(item)}
                  price={item.price}
                  name={item.name}
                />
              ))}
            </Card>
          ) : undefined}

          {/* <Card title={"Cooking Instructions"}>
            <View
              style={{
                marginTop: 10,
                // paddingHorizontal: 10,
              }}
            >
              <TextInput
                style={{
                  height: 70,
                  width: wp(90),
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
          </Card> */}

          <View
            style={{
              backgroundColor: colors.primary,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
              borderRadius: 45,
              margin: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.white,
                width: wp(40),
                height: hp(5.5),
                borderRadius: 45,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => updateCount("Dec")}>
                <ResponsiveText
                  color={colors.primary}
                  fontFamily={"bold"}
                  size={8}
                >
                  -
                </ResponsiveText>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: colors.primary,
                  height: wp(10),
                  width: wp(10),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 45,
                }}
              >
                <ResponsiveText color={colors.white} size={6}>
                  {count}
                </ResponsiveText>
              </View>

              <TouchableOpacity onPress={() => updateCount("Inc")}>
                <ResponsiveText
                  color={colors.primary}
                  fontFamily={"bold"}
                  size={8}
                >
                  +
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <ResponsiveText size={6} color={colors.white}>
              Rs: {GetAllItemPrice(selectedTab)}
            </ResponsiveText>
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 45,
              }}
              onPress={() => loginVerification()}
            >
              <Icon
                size={20}
                source={globalPath.cart}
                tintColor={colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: hp(20) }} />
        </ScrollView>
      </View>
      {loading == true ? <Loader /> : undefined}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: wp(15),
    width: wp(15),
    borderRadius: 75,
    marginRight: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  listView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: wp(90),
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardView: {
    backgroundColor: colors.lightGrey,
    alignItems: "flex-start",
    margin: 13,
    padding: 10,
  },
});
