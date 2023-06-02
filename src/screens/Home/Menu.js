import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import { ScrollView } from "react-native-gesture-handler";
import { globalPath } from "../../constants/globalPath";
import UpperTab from "../../components/UpperTab";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import HomeHeader from "../../components/HomeHeader";
import MenuTab from "../../components/MenuTab";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import { useState } from "react";
import urls from "../../redux/lib/urls";
import { isImage } from "../../constants/Index";
import Api from "../../redux/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { get_menu } from "../../redux/actions/user.actions";
import { useEffect } from "react";
import NetworkModel from "../../components/NetworkModel";
import Loader from "../../components/loader";
import MenuItem from "../../components/MenuItem";
import { _toast } from "../../constants/Index";

export default function Menu({ navigation,route }) {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [Categories, setCategories] = useState([]);
  const [CategoriesDetail, setCategoriesDetail] = useState({});
  const [errorString, seterrorString] = useState("");
  const [Loading, setLoading] = useState(false);

  const network = useSelector((state) => state.userReducers.networdState.error);
  //use effects
  useEffect(() => {
    update();
  }, []);
  useEffect(() => {
    network ? seterrorString(network) : null;
    console.log("networklkkkkkkk", network);
  }, [network]);
  //api calls
  const update = () => {
    get_Categories();
  };
  //functions
  const getTitle = (id) => {
    return Categories[id]?.categoryName;
  };
  //get data
  const get_Categories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_CATEGORIES+route.params);
      console.log("Categoriesss Res", res);
      if (res && res.success == true) {
        setCategories(res.data);
        get_Categories_Detail(res.data[selectedTab]?.id);
        // _toast(res.message)
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      seterrorString(error);
    }
  };
  const get_Categories_Detail = async (id) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_CATEGORIES_BY_ID+ id+'/1/10');
      console.log("Categoriesss detail Res", res);
      if (res && res.success == true) {
        setCategoriesDetail(res.data);

        setLoading(false);
      } else {
        _toast(res.message);
        setCategoriesDetail([])
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      seterrorString(error);
    }
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <NetworkModel active={true} error={errorString} reload={update} />

      <HomeHeader navigation={navigation} />

      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 20 }}>
        <ScrollView>
          <ImageBackground
            style={{ height: hp(13), width: wp(100) }}
            source={globalPath.topBg}
          >
            <View style={styles.advertisementBanner}>
              {/* <Swiper data={StateLife} /> */}
              <ResponsiveText color={colors.white} size={8}>
                Choose the food {"\n"} you love
              </ResponsiveText>
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: wp(2.5),
              marginTop: 15,
              backgroundColor: colors.white,
            }}
          >
            {Categories?.length > 0
              ? Categories.map((item, index) => (
                  <MenuTab
                    active={selectedTab == index ? true : false}
                    source={
                      item.categoryName == "Pizza"
                        ? globalPath.PizzaW
                        : item.categoryName == "Sandwich 1"
                        ? globalPath.sandwichW
                        : item.categoryName == "Burgers"
                        ? globalPath.burgerW
                        : item.categoryName == "Shawarma"
                        ? globalPath.shawarmaW
                        : item.categoryName == "Pasta"
                        ? globalPath.PastaW
                        : globalPath.PizzaW
                    }
                    title={item.categoryName}
                    onPress={() => {
                      setSelectedTab(index);
                      get_Categories_Detail(item.id);
                    }}
                  />
                ))
              : undefined}
          </View>
          <View
            style={{
              backgroundColor: colors.lightGrey,
              margin: wp(2.5),
              padding: 10,
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}
            >
              <ResponsiveText color={colors.white}>
                {Categories.length > 0 ? getTitle(selectedTab) : ""}
              </ResponsiveText>
            </View>
            <MenuItem companyId={route.params} navigation={navigation} data={CategoriesDetail} />
          </View>
        </ScrollView>
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
}

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
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    marginBottom: 6,
    padding: 5,
  },
});
