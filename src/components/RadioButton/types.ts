import { TouchableOpacityProps } from "react-native";

export type RadioButtonProps = {
  selected: boolean;
};

export type Props = {
  title: string;
} & TouchableOpacityProps &
  RadioButtonProps;
