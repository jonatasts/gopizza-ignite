import React, { createContext, useContext, ReactNode, useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>;
  isLoginIn: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoginIn, setIsLoginIn] = useState(false);

  const singIn = async (email: string, password: string) => {
    if (!email || !password) {
      return Alert.alert("Informe o e-mail e a senha!");
    }

    setIsLoginIn(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Login efetuado com sucesso!", user);
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email" ||
          error.code === "auth/wrong-password"
        ) {
          return Alert.alert("Login", "E-mail ou senha inválidos!");
        } else {
          return Alert.alert("Login", "Não foi possível realizar o login!");
        }
      })
      .finally(() => setIsLoginIn(false));
  };

  return (
    <AuthContext.Provider
      value={{
        singIn,
        isLoginIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
