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
import CustomRadioButton from "../../components/RadioButton";
import CheckBox from "../../components/CheckBox";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { useEffect } from "react";
import { useState } from "react";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import NetworkModel from "../../components/NetworkModel";
import { isImage } from "../../constants/Index";
import RadioComponent from "../../components/RadioComponent";
import Loader from "../../components/loader";
import FastImage from "react-native-fast-image";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { get_cart_detail } from "../../redux/actions/user.actions";
import { RadioGroup } from 'react-native-flexi-radio-button'

export default function DealDetail({ navigation, route }) {
  const cartData = useSelector((state) => state.userReducers.cartData.data);
  const dispatch = useDispatch();

  const {id,companyId} = route.params;
  // console.log("first", route.params);
  const [count, setCount] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [isRendering, setRerendering] = useState(false);

  const [DealsDetail, setDealsDetail] = useState({});
  // console.log("DealsDetail", DealsDetail);
  const [selectedcrust, setselectedcrust] = useState(0);
  const [selectedFalovour, setselectedFalovour] = useState(0);

  const [errorString, seterrorString] = useState("");
  const getDeals_Details = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.Get_Deals_Detail + id);
      console.log("Deals Res", res);
      if (res && res.success == true) {

        var resData=res.data;
        resData.objGetDealSection.forEach(item => {
          item.objGetAllFlavours.forEach((element,index) => {
          if (item.chooseQuantity == 1 && index==0) {
            item.objGetAllFlavours[index].quantity=1
          }  
          });
        });
        setDealsDetail(resData);
        console.log("dealsDetail", resData);
        // _toast(res.message)
        setLoading(false);
      } else {
        // _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      seterrorString(error);
    }
  };
  useEffect(() => {
    getDeals_Details();
  }, []);

  const update = () => {
    getDeals_Details();
  };
  //useEffect
  useEffect(() => {
    errorString ? seterrorString(errorString) : null;

    console.log("networklkkkkkkk", errorString);
  }, [errorString]);

  useEffect(() => {
    setCount(count);
  }, [count, isRendering]);
  updateCount = (type) => {
    if (type == "Inc") {
      setCount(count + 1);
    } else {
      setCount(count > 1 ? count - 1 : 1);
    }
  };
  const AddFlavours = (parentIndex, index, type, limit, currentData) => {
    var totalQ = currentData.reduce((a, c) => {
      return a + c.quantity;
    }, 0);
    console.log("totalQ", currentData);
    if (type == "add") {
      if (totalQ == limit) {
        console.log("limit exeeded");
        return false;
      }
      DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours[
        index
      ].quantity =
        DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours[index]
          .quantity + 1;
    } else if (type == "remove") {
      DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours[
        index
      ].quantity =
        DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours[index]
          .quantity - 1;
    } else {
      DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours.forEach(
        (element, i) => {
          DealsDetail.objGetDealSection[parentIndex].objGetAllFlavours[
            i
          ].quantity = index == i ? 1 : 0;
        }
      );
    }
    setDealsDetail(DealsDetail);
    setRerendering(!isRendering);
  };
  const loginVerification = async () => {
    const token = await AsyncStorage.getItem("@token");

    if (token === null) {
      navigation.navigate("Authstack");
    } else {
      submitdata();
      // alert("order add successfully");
    }
  };
  const submitdata = async () => {
    var reqTotal=0
    let sum=0

    if (DealsDetail.objGetDealSection.length>0) {
      
       reqTotal=DealsDetail.objGetDealSection.filter((v)=>v.chooseQuantity!=1).reduce((a, c) => {
        return a + c.chooseQuantity;
      }, 0)
  
      console.log('reqTotal', reqTotal)
      DealsDetail.objGetDealSection.filter((v)=>v.chooseQuantity!=1).forEach(element => {
        
        sum=element.objGetAllFlavours.reduce((a, c) => {
          return a + c.quantity;
        }, 0)
      });
      console.log('sum', sum)
    }
    if (reqTotal !=sum) {
      // var totalQ = currentData.reduce((a, c) => {
      //   return a + c.quantity;
      // }, 0);
      _toast('please select required field');
      return false
    } 

    var orderId=cartData.length> 0?cartData.find((v)=>v.companyId==companyId)?cartData.find((v)=>v.companyId==companyId).id:0:0
    var Flavours = [];
    DealsDetail.objGetDealSection.forEach((element) => {
      element.objGetAllFlavours
        .filter((v) => v.quantity != 0)
        .forEach((item) => {
          Flavours.push({
            orderId: orderId,
            dealId: DealsDetail.id,
            itemId: item.itemId,
            quantity: item.quantity,
            orderType: 1,
            subTotal: 0,
            billGroup: 0,
          });
        });
    });
    var obj = {
      orderId: orderId,
      orderType: 1,
      companyId: companyId,
      instructions: "",
      deliveryCharges: 0,
      methodType: 1,
      objOrderDetail: [
        {
          orderId: orderId,
          dealId: DealsDetail.id,
          itemId: null,
          itemSizeId: null,
          crustId: null,
          quantity: count,
          orderType: 1,
          subTotal: 0,
          objAdditionalDetails: [],
          objDeals: Flavours,
        },
      ],
    };

    console.log("obj", obj);
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_TO_CART, obj);
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
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <NetworkModel active={true} error={errorString} reload={update} />

      <HomeHeader navigation={navigation} />

      <View style={{ backgroundColor: colors.grey, flex: 1 }}>
        <ScrollView>
          <ImageBackground
            style={{
              height: hp(20),
              width: wp(100),
              alignItems: "center",
              marginBottom: wp(30),
            }}
            source={globalPath.topBg}
          >
            <FastImage
              defaultSource={globalPath.noImage}
              style={{
                borderRadius: 200,
                width: wp(70),
                height: wp(70),
                // justifyContent: "flex-end",
                alignItems: "center",
                borderWidth: 5,
                borderColor: colors.white,
                resizeMode: "stretch",
              }}
              source={
                DealsDetail?.fullPath
                  ? {
                      uri: DealsDetail.fullPath,
                      priority: FastImage.priority.high,
                    }
                  : globalPath.noImage
              }
            >
              <View
                style={{
                  backgroundColor: colors.black,
                  alignItems: "center",
                  marginTop: 20,
                  // justifyContent: "center",
                  // borderRadius: hp(40),
                  // height: wp(15),
                  borderWidth: 3,
                  borderColor: colors.white,
                  // padding: 30,
                  width: wp(60),
                  position: "absolute",
                  overflow: "visible",
                }}
              >
                <ResponsiveText color={colors.white} size={4}>
                  {DealsDetail.title}
                </ResponsiveText>
              </View>
            </FastImage>
          </ImageBackground>
          <View style={{ alignItems: "center", marginHorizontal: wp(10) }}>
            <ResponsiveText textAlign={"center"} size={3} color={colors.black}>
              {DealsDetail.description}
            </ResponsiveText>

            <ResponsiveText
              margin={[10, 0, 0, 0]}
              size={5}
              color={colors.primary}
            >
              Rs: {DealsDetail.price}
            </ResponsiveText>
          </View>

          {DealsDetail.objGetDealSection?.length > 0
            ? DealsDetail.objGetDealSection.map((item1, parentIndex) => (
                <Card title= {item1.chooseQuantity}>
                  {item1.objGetAllFlavours.map((item, index) =>
                    item1.chooseQuantity == 1 ? (
                      <RadioComponent
                        isActive={(item.quantity == 1 ? true : false)}
                        onPress={() =>
                          AddFlavours(
                            parentIndex,
                            index,
                            "radio",
                            item1.chooseQuantity,
                            item1.objGetAllFlavours
                          )
                        }
                        title={item.flavourName}
                        // price={item.price}
                      />
                    ) : (
                      <CheckBox
                        isActive={item.quantity > 0 ? true : false}
                        addonPress={() =>
                          AddFlavours(
                            parentIndex,
                            index,
                            "add",
                            item1.chooseQuantity,
                            item1.objGetAllFlavours
                          )
                        }
                        removeonPress={() =>
                          AddFlavours(
                            parentIndex,
                            index,
                            "remove",
                            item1.chooseQuantity,
                            item1.objGetAllFlavours
                          )
                        }
                        disabled={true}
                        // price={item.price}
                        quantity={item.quantity}
                        name={item.flavourName}
                      />
                    )
                  )}
                </Card>
              ))
            : undefined}

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
              Rs:{" "}
              {Object.keys(DealsDetail).length > 0
                ? count * DealsDetail.price
                : 0}
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => loginVerification()}
              style={{
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 45,
              }}
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
        {Loading == true ? <Loader /> : undefined}
      </View>
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
