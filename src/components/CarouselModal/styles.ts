import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 21rem;
  width: 100%;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);
  padding: 2.4rem;
  position: absolute;
  margin-top: 1rem;
  top: 5rem;

  background-color: ${({ theme }) => theme.colors.background};
  z-index: 999999;
  cursor: pointer;

  @media (min-width: 768px) {
    top: 10rem;
    right: 20rem;
  }
`

export const NewCarousel = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`

export const EditCarousel = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: red;
  width: 50rem;
  height: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
