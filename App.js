import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { Tabs } from "./src/navigator/Tabs";
import LoginState from "./src/context/loginContext/loginState";
import CatalogueState from "./src/context/catalogueContext/catalogueState";
import Toast from "react-native-toast-message";

const AppState = ({ children }) => {
  return (
    <LoginState>
      <CatalogueState>{children}</CatalogueState>
    </LoginState>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <AppState>
        <NavigationContainer>
          <Tabs />

          <Toast position="bottom" />
        </NavigationContainer>
      </AppState>
    </SafeAreaView>
  );
}
