import { TouchableOpacityProps } from "react-native";

export type ContainerProps = {
  index: number;
};

export type StatusTypeProps = "Preparando" | "Pronto" | "Entregue";

export type StatusProps = {
  status: StatusTypeProps;
};

export type OrderCardProps = ContainerProps & TouchableOpacityProps;
