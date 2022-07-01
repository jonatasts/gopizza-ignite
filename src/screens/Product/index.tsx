import React, { useEffect, useState } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import ButtonBack from "@components/ButtonBack";
import Photo from "@components/Photo";
import InputPrice from "@components/InputPrice";
import Input from "@components/Input";

import { ProductNavigationProps } from "src/@types/navigation";

import styles, {
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

import { PizzaProps } from "./types";

const Product = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const { COLORS } = useTheme();
  const [image, setImage] = useState("");
  const [photoPath, setPhotoPath] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

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

  const validateFields = (isLoading = false) => {
    if (!image) {
      return "Selecione a imagem da Pizza!";
    }

    if (!name.trim()) {
      return "Informe o nome da Pizza!";
    }

    if (!description.trim()) {
      return "Informe a descrição da Pizza!";
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return "Informe o preço de todos os tamanhos da Pizza!";
    }

    setIsLoading(isLoading);
    return "success";
  };

  const cleanFields = () => {
    setImage("");
    setName("");
    setDescription("");
    setPriceSizeP("");
    setPriceSizeM("");
    setPriceSizeG("");
    setIsLoading(false);
  };

  const onSubmit = () => {
    const status = validateFields(true);

    if (status == "success") {
    let photo_url: string;
    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    reference
      .putFile(image) // URI da imagem
      .then(async () => {
        photo_url = await reference.getDownloadURL();

        firestore()
          .collection("pizzas")
          .add({
              description,
            name,
            name_insensitive: name.toLocaleLowerCase().trim(),
            prices_sizes: {
              p: priceSizeP,
              m: priceSizeM,
              g: priceSizeG,
            },
            photo_url: photo_url,
            photo_path: reference.fullPath,
          })
          .then(() => {
            cleanFields();
              navigation.reset({
                index: 1,
                routes: [{ name: "home" }],
              });
          })
          .catch(() =>
            Alert.alert("Cadastro", "Não foi possível cadastrar a pizza!")
          );
      })
      .catch((error) => console.log(error));
    } else {
      return Alert.alert("Cadastro", status);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaProps;

          setName(product.name);
          setImage(product.photo_url);
          setPhotoPath(product.photo_path);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <Container behavior={behavior}>
      <Content>
        <Header>
          <ButtonBack onPress={goBack} />
          <Title>{!id ? "Cadastrar" : name}</Title>

          {id ? (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name={"trash-can-outline"}
                size={24}
                color={COLORS.TITLE}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyView} />
          )}
        </Header>

        <Upload>
          <Photo uri={image} />
          {!id && (
            <PickImageButton
              title="Carregar"
              type={"secondary"}
              onPress={handlePickImage}
            />
          )}
        </Upload>
        <Form>
          <InputGroup>
            <Label>Nome</Label>

            <Input onChangeText={setName} value={name} />
          </InputGroup>

          <InputGroup>
            <InputGroupHeader>
              <Label>Descrição</Label>
              <MaxCharacters>
                {description?.length ?? 0} de 60 caracteres
              </MaxCharacters>
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

          {!id && (
            <Button
              title={"Cadastrar pizza"}
              isLoading={isLoading}
              onPress={onSubmit}
            />
          )}
        </Form>
      </Content>
    </Container>
  );
};

export default Product;
