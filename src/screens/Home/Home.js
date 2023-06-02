import {
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "../../components/Swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import { ScrollView } from "react-native-gesture-handler";
import HomeCard from "../../components/HomeCard";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import UpperTab from "../../components/UpperTab";
import HomeHeader from "../../components/HomeHeader";
import { routeName } from "../../constants/routeName";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Loader from "../../components/loader";
import { useDispatch, useSelector } from "react-redux";
import NetworkModel from "../../components/NetworkModel";
import FastImage from "react-native-fast-image";

import { get_Deals, get_menu } from "../../redux/actions/user.actions";
const Home = ({ navigation,route }) => {
  const network = useSelector((state) => state.userReducers.networdState.error);
  const [BannerData, setBannerData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState("");
  const [refreshingg, setRefreshingg] = React.useState(false);
  const companyDetail=route.params.companyDetail
  const dispatch = useDispatch();
  const Deals = useSelector((state) => state.userReducers.allDeals.data);
  console.log("params", companyDetail);

  //useeffect
  useEffect(() => {
    // dispatch(get_Deals());
    dispatch(get_Deals(1, 3,companyDetail.id));
    getBanners();

  }, []);
  useEffect(() => {
    errorString ? seterrorString(errorString) : null;

    console.log("networklkkkkkkk", errorString);
  }, [errorString]);

  const getBanners = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_BANNERS+companyDetail.id);
      console.log("BANNERS Res", res);
      if (res && res.success == true) {
        setBannerData(res.data);

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
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshingg(true);
    wait(2000).then(() => setRefreshingg(false));
    // dispatch(get_menu());
    getBanners();
    dispatch(get_Deals(1, 3));

  }, []);
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <NetworkModel active={true} error={errorString} reload={onRefresh} />

      <HomeHeader homelogo logo={companyDetail.fullPath} search navigation={navigation} onClickSearch={() => navigation.navigate(routeName.SEARCH,{companyId:companyDetail.id})} />
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshingg} onRefresh={onRefresh} />
          }
        >
          <ImageBackground
            style={{ height: 180, width: wp(100) }}
            source={globalPath.topBg}
          >
            <View style={styles.advertisementBanner}>
              <Swiper data={BannerData} />
              {Loading ? <Loader CircleMenu /> : undefined}
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginHorizontal: wp(2.5),
              marginTop: 7,
            }}
          >
            <UpperTab
              source={globalPath.menu}
              title={"Menu"}
              onPress={() => navigation.navigate(routeName.MENU,companyDetail.id)}
            />
            <UpperTab
              source={globalPath.offers}
              title={"Hot Deals"}
              onPress={() => navigation.navigate(routeName.HOTDEALS,companyDetail.id)}
            />
            {/* <UpperTab source={globalPath.delivery} title={'Delivery'}/>
          <UpperTab source={globalPath.takeaway} title={'Take away'}/> */}
          </View>

          {Deals.length > 0
            ? Deals.map((item, index) => {
              if (index < 3) {
                return (
                  <HomeCard
                    onPress={() => navigation.navigate(routeName.DEALDETAIL, {id:item.id,companyId:companyDetail.id})}
                    source={
                      item.fullPath
                        ? { uri: item.fullPath }
                        : globalPath.noImage
                    }
                    // title={item.title}
                    item={item}
                  />
                );
              }
            })
            : undefined}
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  advertisementBanner: {
    height: 180,
    marginHorizontal: 10,
  },
});
