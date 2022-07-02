import React from "react";

import {
  Container,
  Image,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
} from "./styles";
import { OrderCardProps } from "./types";

const OrderCard = ({ index, ...rest }: OrderCardProps) => {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: "https://github.com/jonatasts.png" }} />

      <Name>Margherita</Name>

      <Description>Mesa 5 • Qnt:1</Description>

      <StatusContainer status="Preparando">
        <StatusLabel status="Preparando">Preparando</StatusLabel>
      </StatusContainer>
    </Container>
  );
};

export default OrderCard;
