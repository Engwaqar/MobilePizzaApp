import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Geolocation from "react-native-geolocation-service";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NetworkModel from "../../components/NetworkModel";
import { useState } from "react";
import { colors } from "../../constants/colorsPallet";
import HomeHeader from "../../components/HomeHeader";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "../../components/Swiper";
import Loader from "../../components/loader";
import { wp } from "../../helpers/Responsiveness";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import { useMemo } from "react";
import Input from "../../components/Input";

const NearbyShops = ({ navigation }) => {
  const [errorString, seterrorString] = useState("");
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  const [Loading, setLoading] = useState(false);
  const [refreshingg, setRefreshingg] = React.useState(false);
  const [BannerData, setBannerData] = useState([]);
  const [ShopData, setShopData] = useState([]);

  useEffect(() => {
    if (Platform.OS == "android") {
      requestCurrentLocation();
    } else {
      getNearbyShop(31.4964856, 74.3167822);
      getBanners(31.4964856, 74.3167822);
      setLatitude(31.4964856);
      setLongitude(74.3167822);
    }
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshingg(true);
    wait(2000).then(() => setRefreshingg(false));
  }, []);

  const requestCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "The Pizza",
          message: "The Pizza app would like to access your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            // this.setState({ lat: position.coords.latitude, long: position.coords.longitude })
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            getNearbyShop(position.coords.latitude, position.coords.longitude);
            getBanners(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
        // alert("You can use the location");
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getBanners = async (lat, long) => {
    try {
      setLoading(true);
      const res = await Api.get(
        urls.GetAllFeaturedAds + lat + "/" + long + "/3"
      );
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
  const getNearbyShop = async (lat, long) => {
    try {
      setLoading(true);
      const res = await Api.get(
        urls.NEARBY_SHOPS + "3" + "&Lat=" + lat + "&Long=" + long
      );
      console.log("Nearby Res", res);
      if (res && res.success == true) {
        setShopData(res.data);

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
  // const memoizedValue = useMemo((lat1, lon1, lat2, lon2) => {
  //   console.log('lat1', lat1)
  //   // perform expensive calculation here
  //   const R = 6371; // Radius of the Earth in km
  //   const dLat = deg2rad(lat2-lat1);
  //   const dLon = deg2rad(lon2-lon1);
  //   const a =
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ;
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   const d = R * c; // Distance in km
  //   console.log('distance', d)
  //   return parseFloat(d).toFixed(2);
  // }, [Latitude,Longitude]);
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    console.log("distance", d);
    return isNaN(d) ? "" : parseFloat(d).toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      {/* <NetworkModel active={true} error={errorString} reload={onRefresh} /> */}

      <HomeHeader
        homelogo
        search
        navigation={navigation}
        onClickSearch={() =>
          navigation.navigate(routeName.SEARCH, {
            companyId: null,
            Lat: Latitude,
            Long: Longitude,
          })
        }
      />
      <View style={{ backgroundColor: colors.lightGrey, flex: 1 }}>
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
          <TouchableOpacity
            style={{
              alignItems: "center",
              margin: 14,
              flexDirection: "row",
              backgroundColor: colors.white,
              padding:10,
              borderRadius:10
            }}
            onPress={() =>
              navigation.navigate(routeName.SEARCH_RES, {
                getDistance: getDistance,
                Latitude: Latitude,
                Longitude: Longitude,
              })
            }
          >
            <Icon
              tintColor={colors.primary}
              size={25}
              source={globalPath.search}
            />
            <ResponsiveText margin={[0,0,0,10]} color={colors.lighterGrey} >Search Restaurant...</ResponsiveText>
          </TouchableOpacity>
          <View style={{ padding: wp(2), alignItems: "center" }}>
            <ResponsiveText>Pizza shops within 3 Km</ResponsiveText>
          </View>
          {ShopData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routeName.DASHBOARD, {
                    companyDetail: item,
                  })
                }
                style={{
                  flexDirection: "row",
                  marginHorizontal: wp(5),
                  margin: 5,
                  backgroundColor: colors.white,
                  alignItems: "center",
                  padding: wp(3),
                  borderRadius: 10,
                }}
              >
                <Icon size={30} source={{ uri: item.fullPath }} />
                <View style={{ flex: 1, margin: 10 }}>
                  <ResponsiveText>{item.name}</ResponsiveText>
                  <ResponsiveText size={3} color={colors.grey1}>
                    {item.address}
                  </ResponsiveText>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Icon
                    source={globalPath.location}
                    tintColor={colors.yellow1}
                  />
                  <ResponsiveText size={2.5} margin={[10, 0, 0, 0]}>
                    {getDistance(
                      Latitude,
                      Longitude,
                      item.latitude,
                      item.longitude
                    )}{" "}
                    Km
                  </ResponsiveText>
                </View>
              </TouchableOpacity>
            );
          })}

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default NearbyShops;

const styles = StyleSheet.create({
  advertisementBanner: {
    height: 180,
    marginHorizontal: 10,
  },
});
