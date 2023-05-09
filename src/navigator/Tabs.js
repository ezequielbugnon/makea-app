import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HomeScreen } from "../screens/home";
import { CartScreen } from "../screens/cart";
import { LoginScreen } from "../screens/login";
import { OrderScreen } from "../screens/orders";
import LoginContext from "../context/loginContext/loginContext";
import { ActivityIndicator } from "react-native";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const loginContext = useContext(LoginContext);
  const { token, loadUser } = loginContext;
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const seting =async() => {
      await loadUser()
    }

    seting()
    setLoading(false)
   
  }, []);

  if(loading) {
    return  <ActivityIndicator size="large" />;
  }



  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerTitleStyle: { fontWeight: "bold", color: "tomato", fontSize: 24 },
      })}
    >

    <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={25} name="home" />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "cart",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={25} name="cart" />
          ),
        }}
      />
      {token ? (
        <Tab.Screen
          name="Orders"
          component={OrderScreen}
          options={{
            tabBarLabel: "Pedidos",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} size={25} name="person" />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Bienvenido"
          component={LoginScreen}
          options={{
            tabBarLabel: "Bienvenido",
            tabBarIcon: ({ color }) => (
              <Ionicons color={color} size={25} name="person" />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
