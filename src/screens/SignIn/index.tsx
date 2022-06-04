import React from "react";

import Input from "@components/Input";
import Button from "@components/Button";

import { Container } from "./styles";

const SignIn = () => {
  return (
    <Container>
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

      <Button title={"Entrar"} type={"secondary"} />
    </Container>
  );
};

export default SignIn;
