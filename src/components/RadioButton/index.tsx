import React from "react";

import { Container, Title, Radio, Selected } from "./styles";
import { Props } from "./types";

const RadioButton = ({ title, selected = false, ...rest }: Props) => {
  return (
    <Container selected={selected} {...rest}>
      <Radio>{selected && <Selected />}</Radio>

      <Title>{title}</Title>
    </Container>
  );
};

export default RadioButton;
