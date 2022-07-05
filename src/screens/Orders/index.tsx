import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import OrderCard from "@components/OrderCard";
import ItemSeparator from "@components/ItemSeparator";

import { useAuth } from "@hooks/auth";

import styles, { Container, Header, Title } from "./styles";
import { OrderProps } from "@screens/Order/types";

const Orders = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ index, item }) => (
          <OrderCard index={index} data={item} />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.orderListContainer}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
};

export default Orders;
