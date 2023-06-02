import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../constants/colorsPallet";
import FastImage from "react-native-fast-image";
const addBanner = (props) => {
  return (
    <>
      {props.data.length === undefined ? undefined : (
        <Swiper
          // style={{width:wp(95)}}
          // containerStyle={{borderRadius:25}}
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={3}
          removeClippedSubviews={true}
          key={props.data.length} //if autoplay not working try this
          activeDot={
            <View
              style={{
                backgroundColor: colors.primary,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: -20,
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: colors.white,
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: -20,
              }}
            />
          }
        >
          {props.data.map((item, index) => {
            return (
              <FastImage
                resizeMode="stretch"
                imageStyle={{ opacity: 1 }}
                style={styles.advertisementBannerImage}
                // source={item}
                source={{
                  priority: FastImage.priority.high,
                  uri: item.fullPath,
                }}
              />
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default addBanner;

const styles = StyleSheet.create({
  advertisementBannerImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderWidth: 4,
    borderColor: colors.white,
    // borderRadius:25
  },
});
