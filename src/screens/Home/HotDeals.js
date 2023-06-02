import {
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import NetworkModel from "../../components/NetworkModel";
import { isImage } from "../../constants/Index";
import { useDispatch, useSelector } from "react-redux";
import { get_Deals } from "../../redux/actions/user.actions";
import FastImage from "react-native-fast-image";
import Loader from "../../components/loader";

const HotDeals = ({ navigation,route }) => {
  const [errorString, seterrorString] = useState("");
  const [index, setIndex] = React.useState(1);
  const [isLoading, setIsLoading] = useState(false)

  //useEffect
  useEffect(() => {
    network ? seterrorString(network) : null;
    console.log("networklkkkkkkk", network);
  }, [network]);
  const network = useSelector((state) => state.userReducers.networdState.error);
  const DealsData = useSelector((state) => state.userReducers.allDeals.data);
  const Refreshing = useSelector((state) => state.userReducers.allDeals.refreshing
);
  const dispatch = useDispatch();

  const update = (i,size) => {
    dispatch(get_Deals(1,8,route.params));

  };
  const onLoad = (i,size) => {
    dispatch(get_Deals(i,size,route.params));
    setIndex(index + 1);

  };
  const listHeader = () => {
    return (
      <ImageBackground
        style={{ height: hp(14), width: wp(100) }}
        source={globalPath.topBg}
      >
        <View style={styles.advertisementBanner}>
          {/* <Swiper data={StateLife} /> */}
          <ResponsiveText color={colors.white} size={8}>
            Hot Deals
          </ResponsiveText>
          <ResponsiveText color={colors.white} size={3.5}>
            Take away & Home Delievery
          </ResponsiveText>
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <NetworkModel active={true} error={errorString} reload={update} />
      <HomeHeader navigation={navigation} />

      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 20 }}>
        <FlatList
          contentContainerStyle={{ alignItems: "center" }}
          ListHeaderComponent={listHeader}
          stickyHeaderIndices={[0]}
          onEndReached={() => onLoad(index,8)}
          onEndReachedThreshold={0.2}
          refreshing={Refreshing}
          onRefresh={() =>update()}
          data={DealsData}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routeName.DEALDETAIL, {id:item.id,companyId:route.params})
                }
                style={{
                  backgroundColor: colors.white,
                  width: wp(45),
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                }}
              >
              {isLoading ? <Loader Circle /> : undefined}
                <FastImage
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                  // defaultSource={globalPath.noImage}
                  style={{
                    height: hp(12),
                    width: wp(40),
                    resizeMode: "cover",
                  }}
                  source={
                    item.fullPath
                      ? {
                          uri: item.fullPath,
                          priority: FastImage.priority.high,
                        }
                      : globalPath.pizza21
                  }
                />
                <View style={{ padding: 10 }}>
                  <ResponsiveText weight={"bold"} size={3}>
                    {item.title}
                  </ResponsiveText>
                  <ResponsiveText color={colors.grey1} size={3}>
                    {item.description}
                  </ResponsiveText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 5,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={[styles.btn, { backgroundColor: colors.lightGrey, }]}
                  >
                    <ResponsiveText size={2.9}>Rs: {item.price}</ResponsiveText>
                  </View>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      navigation.navigate(routeName.DEALDETAIL, {id:item.id,companyId:route.params})
                    }
                  >
                    <Icon size={15} source={globalPath.cart} />
                    <ResponsiveText
                      margin={[0, 0, 0, 5]}
                      color={colors.white}
                      size={2.5}
                    >
                      Order Now
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HotDeals;

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
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
    marginLeft:2
  },
});
