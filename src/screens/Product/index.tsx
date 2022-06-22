import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

import ButtonBack from "@components/ButtonBack";
import Photo from "@components/Photo";
import InputPrice from "@components/InputPrice";

import { Container, Header, PickImageButton, Title, Upload } from "./styles";

const Product = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const { COLORS } = useTheme();
  const [image, setImage] = useState("");

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      } else {
        setImage("");
      }
    }
  };

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
        <Photo uri={image} />
        <PickImageButton
          title="Carregar"
          type={"secondary"}
          onPress={handlePickImage}
        />
      </Upload>

      <InputPrice size={"P"} />
      <InputPrice size={"M"} />
      <InputPrice size={"G"} />
    </Container>
  );
};

export default Product;
