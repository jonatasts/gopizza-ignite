import React, { createContext, useContext, ReactNode, useState } from "react";
import { Alert } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>;
  isLoginIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginIn, setIsLoginIn] = useState(false);

  const singIn = async (email: string, password: string) => {
    if (!email || !password) {
      return Alert.alert("Informe o e-mail e a senha!");
    }

    setIsLoginIn(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then((profile) => {
            if (profile.exists) {
              const { name, isAdmin } = profile.data() as User;

              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              setUser(userData);
              console.log("Login efetuado com sucesso!", userData);
            }
          })
          .catch(() =>
            Alert.alert(
              "Login",
              "Não foi possível buscar os dados de perfil do usuário!"
            )
          );
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
        user,
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
