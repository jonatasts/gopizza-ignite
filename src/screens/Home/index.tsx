import React, { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import firestore from "@react-native-firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Search from "@components/Search";
import ProductCard from "@components/ProductCard";
import { ProductProps } from "@components/ProductCard/types";

import { useAuth } from "@hooks/auth";

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
  NewProductButton,
} from "./styles";

const Home = () => {
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const { user, singOut } = useAuth();

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

  const onSearch = () => {
    if (search !== "") {
      loadPizzas(search);
    }
  };

  const onClearSearch = () => {
    setSearch("");
    loadPizzas();
  };

  const onInfoProduct = (id: string) => {
    navigation.navigate("product", { id });
  };

  const onNewProduct = () => {
    navigation.navigate("product", {});
  };

  const formatedMenuItemsNumber = useMemo(() => {
    return pizzas.length === 0 ? "0 Pizzas" : `${pizzas.length} Pizza(s)`;
  }, [pizzas]);

  useFocusEffect(
    useCallback(() => {
      loadPizzas();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity onPress={singOut}>
          <MaterialIcons name={"logout"} size={24} color={COLORS.TITLE} />
        </TouchableOpacity>
      </Header>

      <Search
        onChangeText={setSearch}
        value={search}
        onSearch={onSearch}
        onClear={onClearSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{formatedMenuItemsNumber}</MenuItemsNumber>
      </MenuHeader>

      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => onInfoProduct(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {user?.isAdmin && (
        <NewProductButton
          title={"Cadastrar Pizza"}
          type={"secondary"}
          onPress={onNewProduct}
        />
      )}
    </Container>
  );
};

export default Home;
