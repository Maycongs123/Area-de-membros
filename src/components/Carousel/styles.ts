import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
  
  p {
    color: ${({ theme }) => theme.colors.white};
    font-family: "Inter";
    font-size: 24px;
    font-weight: 700;
    margin-top: 1.8rem;
    margin-bottom: 3rem;
  }

  .input-button {
    color: text-white;
  }

  @media (min-width: 768px) {
    p {
      font-size: 24px;
      margin-top: 1.6rem;
    }
  }
`;

export const WrapperCarousel = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  .button {
    margin-left: auto;
    margin-bottom: -4rem;
    margin-right: 10px;
    padding-left: 1rem;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  margin-left: -4rem;

  .pencil-icon {
    transform: translateX(50px);
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    align-items: center;
    background-color: none;
    background: #323c4d;
    border-radius: 70%;
    width: 2.8rem;
    height: 2.8rem;
    z-index: 901;
    margin: 12px;
  }
`;
export const AddNewCurso = styled.div`
  position: relative;
  display: inline-block;
  margin: 0px;
  z-index: 0;

  .plus-curso-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    svg {
      width: 10rem;
      height: 10rem;
    }
  }

  .add-image {
    opacity: 0.5;
  }
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  max-width: 139.2rem;
  width: 100%;
  cursor: pointer;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 160, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 160, 0.4);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  @media (min-width: 768px) {
    max-width: 139.2rem;
  }
`;

export const Image = styled.div`
  display: flex;
  height: 33.6rem;
  /* height: 100%; */
  width: 24rem;
  /* min-width: 20rem; */
  border-radius: 0.8rem;

  @media (min-width: 768px) {
    /* min-width: 24rem;
    width: 100%;
    height: 33.6rem; */
    width: 24rem;
    height: 33.6rem;
  }

  img {
    display: flex;
    min-height: 28rem;
    height: 100%;
    min-width: 20rem;
    background-color: blue;
    border-radius: 0.8rem;

    @media (min-width: 768px) {
      max-width: 24rem;
      width: 100%;
      height: 33.6rem;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.6rem;

  .divAnimation {
    margin-right: 2.4rem;

    animation: piscar 1.5s linear infinite;

    @keyframes piscar {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  }

  @media (min-width: 768px) {
    gap: 2.6rem;
  }
`;
