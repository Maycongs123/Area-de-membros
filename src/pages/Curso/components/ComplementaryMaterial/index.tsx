import React from "react";

import * as S from "./styles";

const ComplementaryMaterial: React.FC<any> = ({ complementaryMaterial }) => {
  return (
    <S.Container>
      <div className="complementary-material-description">
        <p> Material complementar</p>
        <span>{complementaryMaterial}</span>
      </div>
    </S.Container>
  );
};

export default ComplementaryMaterial;
