import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import Search from "@components/Search";
import ProductCard from "@components/ProductCard";

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
