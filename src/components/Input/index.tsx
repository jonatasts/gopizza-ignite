import React from "react";

import { Container } from "./styles";
import { TextInputProps } from "./types";

const Input = ({ type = "primary", ...rest }: TextInputProps) => {
  return <Container type={type} {...rest} />;
};

export default Input;
