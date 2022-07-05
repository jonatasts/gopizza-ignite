import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

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
import { ProductNavigationProps } from "src/@types/navigation";
import { PizzaProps } from "./types";

const Order = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaProps>({} as PizzaProps);
  const [tableNumber, setTableNumber] = useState("");
  const [quantity, setQuantity] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  const amount =
    size && !isNaN(quantity) ? pizza.prices_sizes[size] * quantity : "0,00";

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => setPizza(response.data() as PizzaProps))
        .catch((error) => console.log(error));
    }
  }, [id]);

  return (
    <Container behavior={behavior}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={goBack} style={styles.goBack} />
        </Header>

        <Photo source={{ uri: pizza.photo_url }} />

        <Form>
          <Title>{pizza.name}</Title>

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
              <Input keyboardType={"numeric"} onChangeText={setTableNumber} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType={"numeric"}
                onChangeText={(quantity) => setQuantity(parseInt(quantity))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button title={"Confirmar Pedido"} />
        </Form>
      </ContentScroll>
    </Container>
  );
};

export default Order;
