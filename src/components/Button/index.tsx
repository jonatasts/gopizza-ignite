import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { TypeProps } from "@components/Input/types";

import { Container, Title, Load } from "./styles";

type ButtonProps = RectButtonProps & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
};

const Button = ({
  title,
  type = "primary",
  isLoading = false,
  ...rest
}: ButtonProps) => {
  return (
    <Container type={type} enabled={!isLoading} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
};

export default Button;
