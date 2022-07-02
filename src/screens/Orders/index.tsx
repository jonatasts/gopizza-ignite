import React from "react";
import { FlatList } from "react-native";

import OrderCard from "@components/OrderCard";
import ItemSeparator from "@components/ItemSeparator";

import styles, { Container, Header, Title } from "./styles";

const Orders = () => {
  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={["1", "2", "3"]}
        keyExtractor={(item) => item}
        renderItem={({ index, item }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.orderListContainer}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
};

export default Orders;
