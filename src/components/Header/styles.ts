import { styled } from "styled-components";

export const Container = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 2.4rem;
  align-items: center;
  align-content: center;

  .gallery-icon {
    display: none;
  }

  .slide-show-icon {
    display: none;
  }

  .user-icon {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 4.8rem 0;

    .sandwich-icon {
      display: none;
    }

    .gallery-icon.hidden {
      display: none;
    }

    .gallery-icon {
      display: flex;
    }

    .slide-show-icon {
      display: flex;
    }

    .user-icon {
      display: flex;
    }
  }
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;

  gap: 2.4rem;

  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
    width: 26.4rem;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  max-width: 2.4rem;
  width: 100%;
  max-height: 2.4rem;
  height: 100%;
  cursor: pointer;
  position: relative;

  @media (min-width: 768px) {
    padding: 1.2rem;
    background: rgba(237, 237, 237, 0.2);
    max-width: 4.8rem;
    width: 100%;
    max-height: 4.8rem;
    height: 100%;
    border-radius: 99px;
  }
`;

export const LogoContanier = styled.img`
  width: 80px;
  height: 38px;
`;

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
`;
