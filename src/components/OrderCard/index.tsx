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

const OrderCard = ({ index, data, ...rest }: OrderCardProps) => {
  return (
    <Container index={index} {...rest}>
      <Image source={{ uri: data.image }} />

      <Name>{data.pizza}</Name>

      <Description>
        Mesa {data.table_number} • Qnt: {data.quantity}
      </Description>

      <StatusContainer status={data.status}>
        <StatusLabel status={data.status}>{`${data.status}`}</StatusLabel>
      </StatusContainer>
    </Container>
  );
};

export default OrderCard;
