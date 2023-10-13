import { styled } from 'styled-components'

export const Container = styled.p`
  display: flex;
  color: #b2b2b2;
  font-size: 1.2rem;
  max-height: 4.8rem;
  height: 100%;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 32.7rem;
  overflow: hidden;
  flex-direction: column;
  text-overflow: ellipsis;
  text-align: justify;

  @media (min-width: 768px) {
    font-size: 1.6rem;
    max-width: unset;
    max-height: unset;
    text-align: justify;
    max-width: 81.6rem;
    text-overflow: unset;
    margin-bottom: 1rem;
  }
`
