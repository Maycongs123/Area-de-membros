import { styled } from "styled-components";

export const Container = styled.button`
  display: flex;
  
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors["text-dark"]};
  font-weight: 700;
  justify-content: center;
`;
