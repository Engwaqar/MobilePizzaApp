import React from "react";
// Import Components
import {
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Linking,
    PermissionsAndroid,
} from 'react-native';
import { colors } from '../../constants/colorsPallet';
import { wp, hp } from '../../helpers/Responsiveness';
import ResponsiveText from '../../components/RnText';
import Icon from '../../components/Icon';
import { globalPath } from '../../constants/globalPath';
import FileViewer from "react-native-file-viewer";
// Import RNFetchBlob for the file download
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
const DownloadFile = () => {
  const fileUrl =
    "https://neweramagazine.com/uploadedStuff/Templates/132973701952234871-Teri%20Chahaton%20Kay%20Hisaar%20Main%20By%20Tayyba%20Haider%20Complete.pdf";

  const checkPermission = async () => {
    // Function to check the platform
    // If Platform is Android then check for permissions.
    // console.log("downloaddd");
    // PreView();

    if (Platform.OS === "ios") {
      downloadFile();
    //   PreView();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message:
              "Application needs access to your storage to download File",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
        //   PreView();
          console.log("Storage Permission Granted.");
        } else {
          // If permission denied then show alert
          Alert.alert("Error", "Storage Permission Not Granted");
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++" + err);
      }
    }
  };
  const PreView = () => {
    // FileViewer.open(fileUrl, { showOpenWithDialog: true });

    // const { config, fs } = RNFetchBlob;

    // fs.readFile(fileUrl, fileUrl)
    //     .then(() => FileViewer.open(fileUrl))
    //     .then(() => {
    //         // success
    //     })
    //     .catch((error) => {
    //         /* */
    //     });
    // RNFetchBlob.fs.readFile(fileUrl, 'base64')
    // .then((data) => {
    //     console.log('file',data)
    //   // handle the data ..
    // })
    const url =fileUrl
    //   "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf";

    // *IMPORTANT*: The correct file extension is always required.
    // You might encounter issues if the file's extension isn't included
    // or if it doesn't match the mime type of the file.
    // https://stackoverflow.com/a/47767860
    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }

    const extension = getUrlExtension(url);

    // Feel free to change main path according to your requirements.
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
    console.log("localFile", localFile)

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then((res) => {
        console.log("filee",res)
        FileViewer.open(localFile)})
      .then((res) => {
        // success
        console.log("succes",res)
      })
      .catch((error) => {
        // error
    console.log("error", error)

      });
  };
  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = "." + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          "/file_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: "downloading file...",
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", FILE_URL)
      .then((res) => {
        // Alert after successful downloading
        // RNFetchBlob.fs.readFile(res.data)
        //     .then((data) => {
        //         console.log('file', data)

        //         // handle the data ..
        //     })
        console.log("res -> ", res);
        alert("File Downloaded Successfully.");
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: colors.blue1,
        width: wp(25),
        height: hp(11),
      }}
    >
      <TouchableOpacity onPress={() => PreView()}>
        <ResponsiveText
          size={3}
          color={colors.blue1}
          margin={[hp(4), 0, 0, 0]}
          textAlign={"center"}
        >
          Preview
        </ResponsiveText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => checkPermission()}>
        <Icon
          size={15}
          margin={[hp(1), 0, 0, wp(20)]}
          source={globalPath.Downloads}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DownloadFile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    padding: 5,
  },
  button: {
    width: "80%",
    padding: 10,
    backgroundColor: "blue",
    margin: 10,
  },
});
