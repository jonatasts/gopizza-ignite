import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserStackRoutes from "./user.stack.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <UserStackRoutes />
    </NavigationContainer>
  );
};

export default Routes;
