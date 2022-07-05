import { ProductProps } from "@components/ProductCard/types";

export type PizzaProps = {
  prices_sizes: { [key: string]: number };
} & ProductProps;
