import React from "react";

import * as S from "./styles";

const DescriptionVideo: React.FC<any> = ({ description }) => {
  return <S.Container>{description}</S.Container>;
};

export default DescriptionVideo;
