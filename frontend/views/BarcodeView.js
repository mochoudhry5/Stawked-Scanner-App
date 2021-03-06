import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Overlay } from "react-native-elements";
import styles from "../barcodestyle";
import { useItems } from "../providers/ItemsProvider";
import { CameraScreen } from "react-native-camera-kit";
import { useAuth } from "../providers/AuthProvider";

import 'intl';
import 'intl/locale-data/jsonp/en';


import {
  SafeAreaView,
  Text,
  View,
  Image,
  Linking,
  TouchableHighlight,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from "react-native";

export function Barcode() {
  const [qrvalue, setQrvalue] = useState("");
  const { user } = useAuth();
  const [openScanner, setOpenScanner] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const { createItem } = useItems();
  const nav = useNavigation();

  React.useEffect(() => {
    const openCam = nav.addListener("focus", () => {
      setOverlayVisible(true);
      onOpenScanner();
    });
    return openCam;
  }, [nav]);

  const onOpenlink = () => {
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = (qrvalue) => {
    setQrvalue(qrvalue);
    setOpenScanner(false);
  };

  const apiCall = (apinumber) => {
    let apicallnumber = `https://api.barcodelookup.com/v3/products?barcode=${apinumber}&formatted=y&key=r2x1sx1l68x31921pn06vp3o195oph`;
    fetch(apicallnumber)
      .then((resp) => resp.json())
      .then((data) => {
        let [item] = data.products;
        let name = item["title"];
        let image = item["images"][0];
        let brand = item["brand"];
        let date = Date.now();
        let formatDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(date);
        nav.navigate("Inventory");
        createItem(name, image, brand, formatDate);
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        Alert.alert(
          "Oops...Product Not Found!",
          "We will try to add it as soon as possible"
        );
        nav.navigate("Inventory");
      });
  };

  const home = () => {
    setOpenScanner(false);
  };

  const onOpenScanner = () => {
    if (Platform.OS === "android") {
      requestCameraPermission();

      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "App needs permission for camera access",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setQrvalue("");
            setOpenScanner(true);
          } else {
            alert("CAMERA permission denied");
            nav.goBack();
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
          nav.goBack();
        }
      }
    } else {
      setQrvalue("");
      setOpenScanner(true);
    }
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        fullScreen={true}
        overlayStyle={{ padding: 0 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {openScanner ? (
            <View style={{ flex: 1, position: "relative" }}>
              <CameraScreen
                showFrame={false}
                // Show/hide scan frame
                scanBarcode={true}
                // Can restrict for the QR Code only
                laserColor={"blue"}
                // Color can be of your choice
                frameColor={"yellow"}
                // If frame is visible then frame color
                colorForScannerFrame={"black"}
                // Scanner Frame color
                onReadCode={(event) =>
                  onBarcodeScan(event.nativeEvent.codeStringValue)
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setOverlayVisible(false);
                  nav.goBack();
                }}
                style={styles.buttonStyle}
              >
                <Image
                  source={require("../assets/img/exit.png")}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={styles.textStyle}>
                {qrvalue
                  ? (apiCall(qrvalue), // Placeholder for Image once API is available
                    setQrvalue(""),
                    setOverlayVisible(false))
                  : ""}
              </Text>
              {qrvalue.includes("https://") ||
              qrvalue.includes("http://") ||
              qrvalue.includes("geo:") ? (
                <TouchableHighlight onPress={onOpenlink}>
                  <Text style={styles.textLinkStyle}>
                    {qrvalue.includes("geo:") ? "Open in Map" : "Open Link"}
                  </Text>
                </TouchableHighlight>
              ) : null}
            </View>
          )}
        </SafeAreaView>
      </Overlay>
    </>
  );
}
