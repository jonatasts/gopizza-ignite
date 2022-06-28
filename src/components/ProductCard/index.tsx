import React from "react";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { Props } from "./types";

import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Line,
} from "./styles";

const ProductCard = ({ data, ...rest }: Props) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Feather name={"chevron-right"} size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
};

export default ProductCard;
