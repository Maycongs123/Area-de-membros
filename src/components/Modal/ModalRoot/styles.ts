import { styled } from 'styled-components'

interface Props {
  padding?: string
  maxwidth?: string
}

export const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxwidth }) => maxwidth || '29.7rem'};

  width: 100%;
  gap: 1.6rem;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ padding }) => padding || '1.6rem 0.8rem'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.4rem;

  @media (min-width: 768px) {
    max-width: ${({ maxwidth }) => maxwidth || '39rem'};
  }
`
