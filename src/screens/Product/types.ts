import { ProductProps } from "@components/ProductCard/types";

export type PizzaProps = {
  photo_path: string;
  prices_sizes: {
    g: string;
    m: string;
    p: string;
  };
} & ProductProps;
