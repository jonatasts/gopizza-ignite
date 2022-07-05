import { ProductProps } from "@components/ProductCard/types";

export type PizzaProps = {
  [key: string]: number;
} & ProductProps;
