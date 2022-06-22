import React, { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";

import ButtonBack from "@components/ButtonBack";
import Photo from "@components/Photo";
import InputPrice from "@components/InputPrice";
import Input from "@components/Input";

import {
  Container,
  Header,
  PickImageButton,
  Title,
  Upload,
  Form,
  Label,
  InputGroup,
  InputGroupHeader,
  MaxCharacters,
  Content,
} from "./styles";
import Button from "@components/Button";

const Product = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const { COLORS } = useTheme();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <Content>
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
        <Form>
          <InputGroup>
            <Label>Nome</Label>

            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>0 de 60 caracteres</MaxCharacters>
            </InputGroupHeader>

            <Input
              onChangeText={setDescription}
              value={description}
              multiline
              maxLength={60}
              style={{ height: 80 }}
            />
          </InputGroup>

          <InputGroup>
            <Label>Tamanhos e preços</Label>

            <InputPrice
              size={"P"}
              onChangeText={setPriceSizeP}
              value={priceSizeP}
            />
            <InputPrice
              size={"M"}
              onChangeText={setPriceSizeM}
              value={priceSizeM}
            />
            <InputPrice
              size={"G"}
              onChangeText={setPriceSizeG}
              value={priceSizeG}
            />
          </InputGroup>

          <Button
            title={"Cadastrar pizza"}
            type={"secondary"}
            isLoading={isLoading}
          />
        </Form>
      </Content>
    </Container>
  );
};

export default Product;
