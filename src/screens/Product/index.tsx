import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import ButtonBack from "@components/ButtonBack";
import Photo from "@components/Photo";

import { Container, Header, PickImageButton, Title, Upload } from "./styles";

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

      <Upload>
        <Photo uri={""} />
        <PickImageButton title="Carregar" type={"secondary"} />
      </Upload>
    </Container>
  );
};

export default Product;
