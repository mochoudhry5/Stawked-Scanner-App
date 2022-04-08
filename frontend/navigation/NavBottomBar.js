import React from "react";
import { InventoryView } from "../views/InventoryView";
import { UserSettingsView } from "../views/UserSettingsView";
import { Barcode } from "../views/BarcodeView";
import { HomeScreenView } from "../views/HomeScreenView";
import { ItemsProvider } from "../providers/ItemsProvider";
import { useAuth } from "../providers/AuthProvider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "../stylesheet";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FamilyView } from "../views/FamilyView";

const Tab = createBottomTabNavigator();
const CustomNavBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.navBarShadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        alignContent: "center",
        borderRadius: 35,
        backgroundColor: "royalblue",
        ...styles.navBarShadow, // camera shadow
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export function NavBottomBar() {
  const { user } = useAuth();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 90,
          ...styles.navBarShadow,
        },
      }}
    >
      <Tab.Screen
        name="Inventory"
        component={InventoryView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/inventory.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "royalblue" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "royalblue" : "#748c94",
                  fontSize: 12,
                }}
              >
                INVENTORY
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreenView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "royalblue" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "royalblue" : "#748c94",
                  fontSize: 12,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        children={() => {
          return user ? (
            <ItemsProvider user={user} projectPartition={`project=${user.id}`}>
              <Barcode />
            </ItemsProvider>
          ) : null;
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/img/camera.png")}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: "#fff",
              }}
            />
          ),

          tabBarButton: (props) => <CustomNavBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Family"
        component={FamilyView}
        options={{
          keyboardHidesTabBar: true,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/household.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "royalblue" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "royalblue" : "#748c94",
                  fontSize: 12,
                }}
              >
<<<<<<< HEAD
                {"HOUSEHOLD"}
=======
                {Platform.OS === "ios" ? "HOUSE" + "\n" + " HOLD" : "HOUSEHOLD"}
>>>>>>> 00e11d2cac77a83f5d32248b2df4ecf8beb2a303
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={UserSettingsView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/img/settings.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "royalblue" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "royalblue" : "#748c94",
                  fontSize: 12,
                }}
              >
                SETTINGS
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
