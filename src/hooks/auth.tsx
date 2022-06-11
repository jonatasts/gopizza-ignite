import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type AuthContextData = {
  singIn: (email: string, password: string) => Promise<void>;
  singOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoginIn: boolean;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLECTION = "@gopizza:users";

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
          .then(async (profile) => {
            if (profile.exists) {
              const { name, isAdmin } = profile.data() as User;

              const userData = {
                id: account.user.uid,
                name,
                isAdmin,
              };

              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData)
              );
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

  const loadUserStorageData = async () => {
    setIsLoginIn(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log(storedUser);
    }

    setIsLoginIn(false);
  };

  const singOut = async () => {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    if (!email) {
      return Alert.alert("Redefinir senha", "Informe o e-mail!");
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Enviamos um link no seu e-mail para você redefinir sua senha! Pode estar na sua caixa de Spam."
        );
      })
      .catch(() =>
        Alert.alert(
          "Redefinir senha",
          "Não foi possível enviar o e-mail para redefinir sua senha!"
        )
      );
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singIn,
        singOut,
        forgotPassword,
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
