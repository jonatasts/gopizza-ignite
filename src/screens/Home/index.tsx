import React, { useEffect } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import firestore from "@react-native-firebase/firestore";

import Search from "@components/Search";
import ProductCard from "@components/ProductCard";
import { ProductProps } from "@components/ProductCard/types";

import happyEmoji from "@assets/happy.png";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  Title,
  MenuHeader,
  MenuItemsNumber,
} from "./styles";

const Home = () => {
  const { COLORS } = useTheme();

  const loadPizzas = (value = "") => {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
      })
      .catch((error) => {
        Alert.alert("Consulta", "Não foi possível realizar a consulta");
      });
  };

  useEffect(() => {
    loadPizzas();
  }, []);

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <MaterialIcons name={"logout"} size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>10 Pizzas</MenuItemsNumber>
      </MenuHeader>

      <ProductCard
        data={{
          id: "1",
          name: "Pizza",
          description: "Massa e molho",
          photoUrl:
            "https://firebasestorage.googleapis.com/v0/b/go-pizza-6284f.appspot.com/o/pizzas%2F1655943561004.png?alt=media&token=194bfea0-bcbf-4c0a-8f1a-03af25f6dc71",
        }}
      />
    </Container>
  );
};

export default Home;
