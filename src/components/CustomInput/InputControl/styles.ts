import { styled } from 'styled-components'

export const Container = styled.input`
  display: flex;
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.bgInput};
  font-size: 1.2rem;
  font-weight: 400;

  &::placeholder {
    color: ${({ theme }) => theme.colors['text-gray']};
    font-size: 1.2rem;
    font-weight: 400;
  }

  @media (min-width: 768px) {
    font-size: 1.6rem;
    font-weight: 400;
    background: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors['text-gray']};
      font-size: 1.6rem;
      font-weight: 400;
    }
  }
`
