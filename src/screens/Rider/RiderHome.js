import {
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "../../components/Swiper";
import { colors } from "../../constants/colorsPallet";
import { ScrollView } from "react-native-gesture-handler";
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
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { _toast } from '../../constants/Index'

const RiderHome = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState(1);
  const [ReadyOrder, setReadyOrder] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState("");
  console.log('first', ReadyOrder)
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  // console.log('ManagerComplookup', ManagerComplookup)
  const onRefresh = React.useCallback(() => {
    setLoading(true);
    wait(6000).then(() => setLoading(false));
    GetReadyOrder();
  }, []);
  useEffect(() => {
    GetReadyOrder();
  }, []);
  const GetReadyOrder = async (index, item) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_ORDER_FOR_RIDER);
      console.log('GetReadyOrderAll', res);
      if (res && res.success == true) {
        setLoading(false);
        setReadyOrder(res.data.mainList);
      } else {
        setLoading(false);
        seterrorString(res.message)
      }
    } catch (error) {
      console.error(error);

    }
  };
  const updateStatus = async (id, Status, paymentMethodType) => {
    let orderData = Status == "ReadyToDeliver" ? 5 : 6
    var obj = {
      "orderId": id,
      "orderStatus": orderData,
      "paymentMethodType": paymentMethodType
    }
    console.log('obj', obj)

    try {
      setLoading(true);
      const res = await Api.put(urls.UPDATE_RIDER_STATUS, obj);
      console.log('resfffff', res)
      if (res && res.success == true) {
        // navigation.goBack()
        _toast("Status Update Successfully")
        GetReadyOrder();
        setLoading(false);
      } else {
        setLoading(false);
        seterrorString(res.message)
      }
    } catch (error) {
      console.error(error);
    }
  }
  const RiderImages = [
    {
      id: 1,
      name: 'Ready to Deliver',
      url: require('../../assets/icons/Ready-deliver.png'),
    },
    {
      id: 2,
      name: 'On the Way',
      url: require('../../assets/icons/on-the-way.png'),
    },
    {
      id: 3,
      name: 'Delivered',
      url: require('../../assets/icons/delivered.png'),
    },
    // {
    //   id: 4,
    //   name: 'Favourite',
    //   url: require('../../assets/icons/burger-b.png'),
    // },
  ]
  const data = [
    {
      id: 1,
      url: require('../../assets/Images/deal1.png'),
      Price: '12,500',
      des: 'Original Siemens hand dryer',
      Date: '9/23/2022',
      OrderNo: '1',
      orderStatus: 'PreOrder'

    },

    {
      id: 2,
      url: require('../../assets/Images/deal1.png'),
      Price: '12,500',
      des: 'Honda CG 125 Model 2016-B Good Condition',
      Date: '9/23/2022',
      OrderNo: '2',
      orderStatus: 'PreOrder'
    },

    {
      id: 3,
      url: require('../../assets/Images/deal1.png'),
      Price: '76,000',
      des: 'vivo y33s for sale',
      Date: '9/23/2022',
      OrderNo: '3',
      orderStatus: 'PreOrder'
    },

    {
      id: 4,
      url: require('../../assets/Images/deal1.png'),
      Price: '34,000',
      des: 'NEOS World Slimest Swiss',
      Date: '9/23/2022',
      OrderNo: '4',
      orderStatus: 'PreOrder'
    },

    {
      id: 5,
      url: require('../../assets/Images/deal1.png'),
      Price: '12,500',
      des: 'Original Siemens hand dryer',
      Date: '9/23/2022',
      OrderNo: '5',
      orderStatus: 'PreOrder'
    },

    {
      id: 6,
      url: require('../../assets/Images/deal1.png'),
      Price: '12,500',
      adTitle: 'Honda CG 125 Model 2016-B Good Condition',
      Date: '9/23/2022',
      OrderNo: '6',
      orderStatus: 'PreOrder'
    },

  ];
  const filterData = () => {
    return activeTab == 1 ? ReadyOrder.filter((item) => item.orderStatus == "ReadyToDeliver") : activeTab == 2 ? ReadyOrder.filter((item) => item.orderStatus == "OnTheWay") : activeTab == 3 ? ReadyOrder.filter((item) => item.orderStatus == "Delivered") : []
  }

  const renderItem3 = ({ item }) => (

    <View
      style={{
        backgroundColor: colors.lightGrey,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginHorizontal: 10
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <ResponsiveText color={colors.grey1} size={2.5}>
            {"Order No: " + item.id}
          </ResponsiveText>
          <ResponsiveText color={colors.grey1} size={2.5}>
            {"Date: 26 October 2022"}
          </ResponsiveText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          <View>
            <ResponsiveText>Price:</ResponsiveText>
            <ResponsiveText color={colors.grey1} size={3}>
              Rs: {item.totalAmount}
            </ResponsiveText>
          </View>
          <View>
            <ResponsiveText>Items:</ResponsiveText>
            <ResponsiveText color={colors.grey1} size={3}>
              {item.objGetAllOrderDetail?.length} items
            </ResponsiveText>
          </View>
          <View>
            <ResponsiveText>Status:</ResponsiveText>
            <ResponsiveText color={colors.grey1} size={3}>
              {item.orderStatus}
            </ResponsiveText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          {activeTab == 3 && item.orderStatus == "Delivered" ? null :
            <TouchableOpacity
              style={styles.btn}
              onPress={() => { updateStatus(item.id, item.orderStatus, 1) }}
            >
              <ResponsiveText
                // margin={[0, 0, 0, 5]}
                color={colors.white}
                size={2.5}
              >
                {activeTab == 1 && item.orderStatus == "ReadyToDeliver" ? "On The way" : activeTab == 2 && item.orderStatus == "OnTheWay" ? 'Delivered' : ''}
              </ResponsiveText>
            </TouchableOpacity>
          }
          <View style={{ marginLeft: 5 }}>
            <TouchableOpacity
              style={styles.Detailbtn}
              onPress={() =>
                navigation.navigate(routeName.ORDERDETAIL, item)
              }
            >
              <ResponsiveText
                // margin={[0, 0, 0, 5]}
                color={colors.white}
                size={2.5}
              >
                Detail
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>

      </View>

    </View>

  );

  return (

    <SafeAreaView
      style={{ backgroundColor: colors.primary, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <HomeHeader homelogo logoutt navigation={navigation} />
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            padding: 10,
            flexDirection: "row",
            borderRadius: 10,

          }}
        >
          {RiderImages.map((items, index) => {
            return (
              <React.Fragment key={items.id}>
                <TouchableOpacity
                  id={index}
                  onPress={() => setActiveTab(items.id)}
                  style={{
                    width: wp(30),
                    borderWidth: 1,
                    borderColor: colors.white,
                    borderBottomRightRadius: index == 0 ? 0 : index == RiderImages.length - 1 ? 10 : 0,
                    borderTopRightRadius: index == 0 ? 0 : index == RiderImages.length - 1 ? 10 : 0,
                    borderBottomLeftRadius: index == 0 ? 10 : 0,
                    borderTopLeftRadius: index == 0 ? 10 : 0,
                    height: hp(6),
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 0,
                    backgroundColor: items.id === activeTab ? colors.primary : colors.lightGrey,
                  }}
                  padding={[3, 15]}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Icon margin={[2, 2, 0, 0]}
                      tintColor={items.id === activeTab ? colors.white : colors.black}
                      size={25}
                      source={items.url}>
                    </Icon>
                  </View>
                  <ResponsiveText
                    margin={[0, 0, 0, 0]}
                    size={2}
                    weight={'bold'}
                    fontFamily={
                      items.id === activeTab ? "Boldedium" : undefined
                    }
                    color={
                      items.id === activeTab ? colors.white : colors.black
                    }
                  >
                    {items.name}
                  </ResponsiveText>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}

        </View>
        <View>
          {filterData().length > 0 ?
            <FlatList
              data={filterData()}
              renderItem={renderItem3}
              // key={'_'}
              keyExtractor={(item, index) => 'key' + index}
              horizontal={false}
              numColumns={1}
              Loading={false}
              // onRefresh={onRefresh}
            /> : (Loading == false ?
              <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
              </View> : null
            )
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RiderHome
const styles = StyleSheet.create({
  advertisementBanner: {
    height: 180,
    marginHorizontal: 10,
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
  Detailbtn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 3,
    borderRadius: 15,
    height: 20,
  },

});
