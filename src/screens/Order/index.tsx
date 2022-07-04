import React, { useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonBack from "@components/ButtonBack";
import RadioButton from "@components/RadioButton";
import Input from "@components/Input";

import styles, {
  Container,
  ContentScroll,
  Form,
  Header,
  Photo,
  Sizes,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
} from "./styles";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import Button from "@components/Button";

const Order = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const [size, setSize] = useState("");
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Container behavior={behavior}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={goBack} style={styles.goBack} />
        </Header>

        <Photo source={{ uri: "https://github.com/jonatasts.png" }} />

        <Form>
          <Title>Nome da Pizza</Title>

          <Label>Selecione o tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                selected={size === item.id}
                onPress={() => setSize(item.id)}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Numero da mesa</Label>
              <Input keyboardType={"numeric"} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input keyboardType={"numeric"} />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ 00,00</Price>

          <Button title={"Confirmar Pedido"} />
        </Form>
      </ContentScroll>
    </Container>
  );
};

export default Order;
