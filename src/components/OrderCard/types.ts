import { TouchableOpacityProps } from "react-native";

export type ContainerProps = {
  index: number;
};

export type StatusTypeProps = "Preparando" | "Pronto" | "Entregue";

export type StatusProps = {
  status: StatusTypeProps;
};

export type OrderCardProps = { data: OrderProps } & ContainerProps &
  TouchableOpacityProps;

export type OrderProps = {
  id: string;
  quantity: number;
  pizza: string;
  table_number: string;
  status: StatusTypeProps;
  image: string;
};
