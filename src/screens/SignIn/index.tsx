import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import Input from "@components/Input";
import Button from "@components/Button";

import { useAuth } from "@hooks/auth";

import BrandImg from "@assets/brand.png";

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordButtonLabel,
} from "./styles";

const SignIn = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const { singIn, isLoginIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    singIn(email, password);
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={25}>
        <Content>
          <Brand source={BrandImg} />

          <Title>Login</Title>
          <Input
            placeholder={"E-mail"}
            type={"secondary"}
            autoCorrect={false}
            autoCapitalize={"none"}
            onChangeText={setEmail}
          />

          <Input
            placeholder={"Senha"}
            type={"secondary"}
            autoCorrect={false}
            secureTextEntry
            onChangeText={setPassword}
          />

          <ForgotPasswordButton>
            <ForgotPasswordButtonLabel>
              Esqueci minha senha
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButton>

          <Button
            title={"Entrar"}
            type={"secondary"}
            isLoading={isLoginIn}
            onPress={onSignIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;
