import { TextInputProps } from "react-native";

export type SearchProps = {
  onSearch: () => void;
  onClear: () => void;
} & TextInputProps;
