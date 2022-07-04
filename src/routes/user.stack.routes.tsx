import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "@hooks/auth";

import Home from "@screens/Home";
import Product from "@screens/Product";
import Order from "@screens/Order";

import UserTabRoutes from "./user.tab.routes";

const { Navigator, Screen, Group } = createNativeStackNavigator();

const UserStackRoutes = () => {
  const { user } = useAuth();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user?.isAdmin ? (
        <Group>
          <Screen name={"home"} component={Home} />
          <Screen name={"product"} component={Product} />
        </Group>
      ) : (
        <Group>
          <Screen name={"userTabRoutes"} component={UserTabRoutes} />
          <Screen name={"Order"} component={Order} />
        </Group>
      )}
    </Navigator>
  );
};

export default UserStackRoutes;
