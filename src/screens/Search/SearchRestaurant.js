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
  import { colors } from "../../constants/colorsPallet";
  import { globalPath } from "../../constants/globalPath";
  import { ScrollView } from "react-native-gesture-handler";
  import ResponsiveText from "../../components/RnText";
  import { hp, wp } from "../../helpers/Responsiveness";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useState } from "react";
  import NetworkModel from "../../components/NetworkModel";
  import RecordNotFound from "../../components/RecordnotFound";
  import Icon from "../../components/Icon";
  import Input from "../../components/Input";
  import Api from "../../redux/lib/api";
  import urls from "../../redux/lib/urls";
  import MenuItem from "../../components/MenuItem";
import { routeName } from "../../constants/routeName";
  
  const Search = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [errorString, seterrorString] = useState("");
    const [searchText, setSearchText] = useState("");
    const [hotLoading, sethotLoading] = useState(false);
    const [data, setData] = useState([]);
    const {getDistance,Latitude,Longitude}=route.params
    const orderData = useSelector(
      (state) => state.userReducers.orderHistory.data
    );
    const network = useSelector((state) => state.userReducers.orderHistory.error);
  
    useEffect(() => {
     
      // getSearch(searchText);
    }, []);
    useEffect(() => {
      network ? seterrorString(network) : null;
      console.log("networklkkkkkkk", network);
  
      // setCategories()
    }, [network, hotLoading]);
 
  
    const getSearch = async (text) => {
      setSearchText(text);
      if (text.length<3) {
        return false
      }
    
      try {
        const res = await Api.get(urls.SEARCH_COMPANY+text);
        console.log("res", res);
        if (res.data != null) {
          setData(res.data);
        } else {
          setData([]);
        }
      } catch (error) {}
    };
    return (
      <SafeAreaView
        style={{ backgroundColor: colors.primary, flex: 1 }}
        edges={["top", "left", "right"]}
      >
        <View style={{ backgroundColor: colors.grey, flex: 1 }}>
          <NetworkModel active={true} error={errorString}  />
  
          <ImageBackground
            style={{ height: hp(20), width: wp(100) }}
            imageStyle={{ resizeMode: "stretch" }}
            source={globalPath.topBg}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: wp(3),
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon source={globalPath.backArrow} />
              </TouchableOpacity>
              <Input
                height={wp(10)}
                width={wp(75)}
                placeholder={"Search Restaurant..."}
                placeholderTextColor={colors.white}
                autoFocus={true}
                color={colors.white}
                tintColor={colors.white}
                backgroundColor={colors.darkRed2}
                leftIcon={globalPath.search}
                hideShadow={true}
                borderRadius={12}
                onChnageText={(text) => getSearch(text)}
              />
              <View/>
            </View>
            <View style={styles.advertisementBanner}>
              <ResponsiveText color={colors.white} size={4}>
                Now showing results for "{searchText}" {data.length} results
                found!
              </ResponsiveText>
            </View>
          </ImageBackground>
          <ScrollView>
            <View style={{ margin: 5 }}>
              {data.length > 0 ? (
                data.map((item, index) => {
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
                  })
              ) : (
                <RecordNotFound />
              )}
            </View>
          </ScrollView>
        </View>
       
      </SafeAreaView>
    );
  };
  
  export default Search;
  
  const styles = StyleSheet.create({
    advertisementBanner: {
      // height: 130,
      marginHorizontal: wp(10),
      alignItems: "center",
      paddingVertical: 20,
    },
    btn: {
      backgroundColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 3,
      borderRadius: 15,
      height: 20,
    },
    box: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.grey,
      marginHorizontal: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
    },
  });
  