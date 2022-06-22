import React from "react";

import { Container, Input, Size, Label } from "./styles";
import { InputPriceProps } from "./types";

const InputPrice = ({ size, ...rest }: InputPriceProps) => {
  return (
    <Container>
      <Size>
        <Label>{size}</Label>
      </Size>

      <Label>R$</Label>

      <Input keyboardType={"numeric"} {...rest} />
    </Container>
  );
};

export default InputPrice;
