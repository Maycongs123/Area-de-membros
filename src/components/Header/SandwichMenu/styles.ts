import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  padding-left: 2.4rem;
  padding-top: 4.8rem;
  padding-right: 2.4rem;
  

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  z-index: 99999;
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

export const NavLink = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  p {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 2.4rem;
  width: 100%;
  max-height: 2.4rem;
  
  height: 100%;
  cursor: pointer;
  svg {
    padding: 0;
  }
`

export const LogoContanier = styled.img`
  width: 80px;
  height: 38px;
`
