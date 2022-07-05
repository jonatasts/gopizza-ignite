import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import firestore from "@react-native-firebase/firestore";

import Home from "@screens/Home";
import Orders from "@screens/Orders";
import BottomMenu from "@components/BottomMenu";

import { useAuth } from "@hooks/auth";

const { Navigator, Screen } = createBottomTabNavigator();

const UserTabRoutes = () => {
  const [notifications, setNotifications] = useState("0");

  const { COLORS } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("status", "==", "Pronto")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((snapshot) => setNotifications(String(snapshot.docs.length)));

    return () => subscribe();
  }, []);

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.SECONDARY_900,
        tabBarInactiveTintColor: COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title={"Cardápio"} color={color} />
          ),
        }}
      ></Screen>
      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu
              title={"Pedidos"}
              color={color}
              notifications={notifications}
            />
          ),
        }}
      ></Screen>
    </Navigator>
  );
};

export default UserTabRoutes;
