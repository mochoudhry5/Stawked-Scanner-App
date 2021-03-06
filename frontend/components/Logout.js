import * as React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../providers/AuthProvider";
import SettingsCard from "./SettingsCard";
import Setting from "./Setting";

export function Logout() {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const logoutOnClick = () => {
    Alert.alert("Log Out", null, [
      {
        text: "Yes, Log Out",
        style: "destructive",
        onPress: () => {
          signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginView" }],
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };
  return (
    <SettingsCard style={{ marginBottom: 25 }}>
      <Setting
        style={{ borderBottomWidth: 0 }}
        textStyle={{ color: "#e32f45" }}
        settingName="Logout"
        imageValue = {0}
        onClick={() => {
          logoutOnClick();
        }}
      ></Setting>
    </SettingsCard>
  );
}
