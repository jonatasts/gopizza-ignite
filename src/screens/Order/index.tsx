import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import ButtonBack from "@components/ButtonBack";
import RadioButton from "@components/RadioButton";
import Input from "@components/Input";
import Button from "@components/Button";

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

import { useAuth } from "@hooks/auth";

import { ProductNavigationProps } from "src/@types/navigation";
import { PizzaProps } from "./types";

const Order = () => {
  const behavior = Platform.OS === "ios" ? "padding" : undefined;
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaProps>({} as PizzaProps);
  const [tableNumber, setTableNumber] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [sedingOrder, setSedingOrder] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  const { user } = useAuth();

  const amount =
    size && !isNaN(quantity) ? pizza.prices_sizes[size] * quantity : "0,00";

  const goBack = () => {
    navigation.goBack();
  };

  const validateFields = (isLoading = false) => {
    if (!size) {
      return "Selecione o tamanho da Pizza!";
    }

    if (!tableNumber.trim()) {
      return "Informe o numero da mesa!";
    }

    if (!quantity) {
      return "Informe a quantidade!";
    }

    setSedingOrder(isLoading);
    return "success";
  };

  const onOrder = () => {
    const status = validateFields(true);

    if (status == "success") {
      firestore()
        .collection("orders")
        .add({
          quantity,
          amount,
          pizza: pizza.name,
          size,
          table_number: tableNumber,
          status: "Preparando",
          waiter_id: user?.id,
          image: pizza.photo_url,
        })
        .then(() => navigation.navigate("home"))
        .catch(() =>
          Alert.alert("Pedido", "Não foi possível realizar o pedido!")
        );
    } else {
      return Alert.alert("Pedido", status);
    }
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

          <Button
            title={"Confirmar Pedido"}
            onPress={onOrder}
            isLoading={sedingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
};

export default Order;
