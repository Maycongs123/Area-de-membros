import { styled } from "styled-components";
import "@vime/core/themes/default.css";

export const Aside = styled.aside`
  display: none;

  flex-direction: column;
  gap: 2.4rem;
  max-width: 45rem;
  // background-color: red;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const ContentAside = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;

  .div-video {
    position: relative;
    width: 50%;
    z-index: -1;
  }

  .img-content {
    width: 100%;
  }

  .check-video {
    width: 2.5rem;
    background-color: rgba(128, 128, 128, 0.6);
    padding: 0.1rem;
    position: absolute;
    border: 1px solid gray;
    border-radius: 10rem;
    bottom: 5px;
    left: 11.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
  }

  p {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    font-weight: 700;
  }

  span {
    color: #b2b2b2;
  }
`;

export const AsideVideoClass = styled.div`
  display: flex;
  max-width: 16.8rem;
  width: 100%;
  height: 9.5rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors["text-dark"]};
  aspect-ratio: 16/9;
  vm-player[video] {
    display: flex;
    min-width: 1.8rem;
    max-width: 100%;
    height: 10rem !important;
    aspect-ratio: 16/9;
  }
`;
