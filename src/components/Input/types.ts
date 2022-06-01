import { TextInputProps as TextInputPropsRN } from "react-native";

export type TypeProps = "primary" | "secondary";

export type ContainerProps = {
  type: TypeProps;
};

export type TextInputProps = {
  type?: ContainerProps["type"];
} & TextInputPropsRN;
