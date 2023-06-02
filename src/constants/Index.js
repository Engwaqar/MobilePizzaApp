import { Platform, ToastAndroid } from "react-native";
import FileViewer from "react-native-file-viewer";
// Import RNFetchBlob for the file download
import RNFS from "react-native-fs";
const fileUrl =
    "https://neweramagazine.com/uploadedStuff/Templates/132973701952234871-Teri%20Chahaton%20Kay%20Hisaar%20Main%20By%20Tayyba%20Haider%20Complete.pdf";

function _toast(string) {
    if (Platform.OS == 'ios') {
        alert(string);
    } else {
        ToastAndroid.showWithGravity(
            string,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        );
    }
}
function PreView(setisLoading) {

    const url =fileUrl
    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;
    console.log("localFile", localFile)
    setisLoading(true)

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then((res) => {
        console.log("filee",res)
        console.log("loading",setisLoading)
        FileViewer.open(localFile)})
      .then((res) => {
        setisLoading(false)
        // success
        console.log("succes",res)
      })
      .catch((error) => {
        setisLoading(false)

        // error
    console.log("error", error)
      });
  };
function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
module.exports={
    _toast:_toast,
    isImage:isImage,
    PreView:PreView,
}