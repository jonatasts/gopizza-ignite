import React from "react";

import { Image, Placeholder, PlaceholderTitle } from "./styles";
import { PhotoProps } from "./types";

const Photo = ({ uri }: PhotoProps) => {
  if (uri) {
    return <Image source={{ uri }} />;
  }

  return (
    <Placeholder>
      <PlaceholderTitle>Nenhuma foto {"\n"} carregada</PlaceholderTitle>
    </Placeholder>
  );
};

export default Photo;
