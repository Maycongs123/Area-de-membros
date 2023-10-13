import React, { ChangeEvent } from "react";
import * as S from "./styles";

const SwitchButton: React.FC<{
  checked?: boolean;
  onChange?: (value: boolean) => void;
}> = ({ checked, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    onChange!(!newChecked);
  };

  return (
    <S.Label>
      <span>{checked ? "on" : "off"}</span>
      <S.Input checked={!checked} type="checkbox" onChange={handleChange} />
      <S.Switch />
    </S.Label>
  );
};

export default SwitchButton;
