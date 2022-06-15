import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Container, Header, Title } from "./styles";
import ButtonBack from "@components/ButtonBack";

const Product = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const { COLORS } = useTheme();

  return (
    <Container behavior={behavior}>
      <Header>
        <ButtonBack />
        <Title>Cadastrar</Title>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name={"trash-can-outline"}
            size={24}
            color={COLORS.TITLE}
          />
        </TouchableOpacity>
      </Header>
    </Container>
  );
};

export default Product;
