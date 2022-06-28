import React, { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import firestore from "@react-native-firebase/firestore";

import Search from "@components/Search";
import ProductCard from "@components/ProductCard";
import { ProductProps } from "@components/ProductCard/types";

import happyEmoji from "@assets/happy.png";

import styles, {
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
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
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

        console.log("Pizzas loaded successfully...");
        setPizzas(data);
      })
      .catch((error) => {
        Alert.alert("Consulta", "Não foi possível realizar a consulta");
      });
  };

  const formatedMenuItemsNumber = useMemo(() => {
    return pizzas.length === 0 ? "0 Pizzas" : `${pizzas.length} Pizza(s)`;
  }, [pizzas]);

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
        <MenuItemsNumber>{formatedMenuItemsNumber}</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  );
};

export default Home;
