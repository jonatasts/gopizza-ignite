import React from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Container, InputArea, Input, ButtonClear, Button } from "./styles";
import { SearchProps } from "./types";

const Search = ({ onSearch, onClear, ...rest }: SearchProps) => {
  const { COLORS } = useTheme();

  return (
    <Container>
      <InputArea>
        <Input placeholder={"Pesquisar..."} {...rest} />

        <ButtonClear onPress={onClear}>
          <Feather name="x" size={16} />
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        <Feather name={"search"} size={16} color={COLORS.TITLE} />
      </Button>
    </Container>
  );
};

export default Search;
