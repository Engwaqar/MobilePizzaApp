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
import Modal from "react-native-modal";
import MenuItem from "../../components/MenuItem";
import Card from "../../components/Card";
import RnButton from "../../components/RnButton";

const Search = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [errorString, seterrorString] = useState("");
  const [searchText, setSearchText] = useState("");
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("100000");
  const [Categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [hotLoading, sethotLoading] = useState(false);
  const [data, setData] = useState([]);
  const {companyId,Lat,Long}=route.params
  const orderData = useSelector(
    (state) => state.userReducers.orderHistory.data
  );
  const network = useSelector((state) => state.userReducers.orderHistory.error);

  useEffect(() => {
    // update();
    if (companyId!=null) {
      
      getCategories();
    }
    // getSearch(searchText);
  }, []);
  useEffect(() => {
    network ? seterrorString(network) : null;
    console.log("networklkkkkkkk", network);

    // setCategories()
  }, [network, hotLoading]);
  const update = async () => {
    // dispatch(getOrderHistory());
  };
  const getCategories = async () => {
    try {
      const res = await Api.get(urls.GET_CATEGORIES + companyId);
      console.log("getCategories", res);
      if (res.data != null) {
        setCategories([
          {
            id: 0,
            categoryName: "All Categories",
            categoryDescription: "",
            itemsCount: res.data.reduce((a, c) => a + c.itemsCount, 0),
            companyId: 0,
            createdById: 0,
            updatedById: 0,
            dateCreated: "",
            dateModified: "",
            status: true,
          },
          ...res.data,
        ]);
      } else {
        setCategories([]);
      }
    } catch (error) {}
  };

  const getSearch = async (text) => {
    setSearchText(text);
    setModalVisible(false);
    if (text.length<3) {
      return false
    }
    var selectedCate = "";
    Categories.filter((v) => v.status == true).forEach((element, index) => {
      if (index == 0) {
        selectedCate = selectedCate + element.id;
      } else {
        selectedCate = selectedCate + "," + element.id;
      }
    });
    console.log("selected", selectedCate);
    const formdata = new FormData();
    formdata.append("SearchField", text);
    // formdata.append("CategoryId",route.params!=null? selectedCate:'0');
    if (companyId != null) {
      formdata.append("CategoryId", selectedCate);
      formdata.append("CompanyId", companyId);
    } else {
      formdata.append("CategoryId", "0");

      formdata.append("Lat", Lat);
      formdata.append("Long", Long);
      formdata.append("Range", 3);

    }

    formdata.append("MinPrice", Number(min));
    formdata.append("MaxPrice", Number(max));

    const url=companyId != null?urls.SEARCH:urls.SEARCH_BY_LOCATION
    try {
      const res = await Api.post(url, formdata);
      console.log("res", res);
      if (res.data != null) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {}
  };
  const onSelect = async (index, status) => {
    if (status) {
      Categories[index].status = !Categories[index].status;
    } else {
      Categories[index].status = true;
    }
    setCategories(Categories);
    sethotLoading(!hotLoading);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <View style={{ backgroundColor: colors.grey, flex: 1 }}>
        <NetworkModel active={true} error={errorString} reload={update} />

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
              placeholder={"Search..."}
              placeholderTextColor={colors.white}
              color={colors.white}
              autoFocus={true}
              tintColor={colors.white}
              backgroundColor={colors.darkRed2}
              leftIcon={globalPath.search}
              hideShadow={true}
              borderRadius={12}
              onChnageText={(text) => getSearch(text)}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon source={globalPath.filter} />
            </TouchableOpacity>
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
              <MenuItem companyId={companyId} navigation={navigation} data={data} />
            ) : (
              <RecordNotFound />
            )}
          </View>
        </ScrollView>
      </View>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.9}
        style={{ justifyContent: "flex-end" }}
        animationIn={"slideInRight"}
        animationOut={"slideOutRight"}
        // onModalHide={()=>navigation.navigate(routeName.LANDING_SCREEN)}
        coverScreen={true}
      >
        <SafeAreaView
          style={{
            flex: 1,
            marginLeft: wp(8),
            backgroundColor: colors.white,
          }}
        >
          <ScrollView>
            <View
              style={{
                //flex: 0.1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                backgroundColor: colors.primary,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  borderRadius: 5,
                  marginLeft: 5,
                  padding: 10,
                  backgroundColor: colors.darkRed2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} source={globalPath.x} />
              </TouchableOpacity>

              <ResponsiveText color={colors.white} size={4}>
                Filter By
              </ResponsiveText>
              <TouchableOpacity
                // onPress={toggleModal}
                style={{
                  paddingVertical: 8,
                  marginRight: -50,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: colors.darkRed2,
                }}
              >
                <ResponsiveText color={colors.white} size={3.4}>
                  Reset
                </ResponsiveText>
              </TouchableOpacity>
              <Icon />
            </View>
            <Card title={"Categories"}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: colors.white,
                  padding: 10,
                  flexWrap: "wrap",
                  marginTop: hp(1),
                  borderRadius: 10,
                  borderTopColor: colors.black,
                }}
              >
                {Categories.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onSelect(index, item.status)}
                    >
                      <View
                        style={[
                          styles.box,
                          {
                            backgroundColor: item.status
                              ? colors.primary
                              : colors.grey,
                          },
                        ]}
                      >
                        <ResponsiveText
                          color={item.status ? colors.white : colors.black}
                          size={3}
                        >
                          {item.categoryName}
                          <ResponsiveText
                            color={item.status ? colors.white : colors.primary}
                          >
                            ({item.itemsCount})
                          </ResponsiveText>
                        </ResponsiveText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Card>
            <Card title={"Price"}>
              <View
                style={{
                  // flexDirection: "row",
                  alignItems: "flex-end",
                  flex: 1,
                  backgroundColor: colors.white,
                  padding: 10,
                  // flexWrap: "wrap",
                  marginTop: hp(1),
                  borderRadius: 10,
                  borderTopColor: colors.black,
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: hp(3) }}>
                  <View style={[styles.box, { flex: 1, paddingVertical: 0 }]}>
                    <Input
                      width={wp(25)}
                      placeholder={"Min"}
                      backgroundColor={colors.white}
                      hideShadow={true}
                      onChnageText={(text) => setMin(text)}
                      value={min}
                    />
                  </View>
                  <View style={[styles.box, { flex: 1 }]}>
                    <Input
                      width={wp(25)}
                      placeholder={"Max"}
                      hideShadow={true}
                      backgroundColor={colors.white}
                      onChnageText={(text) => setMax(text)}
                      value={max}
                    />
                  </View>
                </View>
                <RnButton
                  width={wp(30)}
                  height={hp(4.5)}
                  title={"Show Result"}
                  onPress={() => getSearch(searchText)}
                />
              </View>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </Modal>
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
