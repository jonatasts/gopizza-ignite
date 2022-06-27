import { RectButtonProps } from "react-native-gesture-handler";

export type ProductProps = {
  id: string;
  photoUrl: string;
  name: string;
  description: string;
};

export type Props = {
  data: ProductProps;
};
