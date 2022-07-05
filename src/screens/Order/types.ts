import { StatusTypeProps } from "@components/OrderCard/types";
import { ProductProps } from "@components/ProductCard/types";

export type PizzaProps = {
  prices_sizes: { [key: string]: number };
} & ProductProps;

export type OrderProps = {
  id: string;
  quantity: number;
  amount: number;
  pizza: string;
  size: number;
  table_number: string;
  status: StatusTypeProps;
  waiter_id: string;
  image: string;
};
