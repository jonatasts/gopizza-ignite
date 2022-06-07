import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import Input from "@components/Input";
import Button from "@components/Button";

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
          />

          <Input
            placeholder={"Senha"}
            type={"secondary"}
            autoCorrect={false}
            secureTextEntry
          />

          <ForgotPasswordButton>
            <ForgotPasswordButtonLabel>
              Esqueci minha senha
            </ForgotPasswordButtonLabel>
          </ForgotPasswordButton>

          <Button title={"Entrar"} type={"secondary"} />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;
