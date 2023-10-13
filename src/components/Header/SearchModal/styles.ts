import { styled } from "styled-components";

export const Container = styled.div`
  position: absolute;
  position: absolute;
  top: 50px;

  left: 50%;
  transform: translate(-60%, -20%);

  padding: 16px;

  .input {
    width: 60rem;
    height: 48px;

    text-indent: 4rem;
    padding: 12px, 24px, 12px, 24px;
    border-radius: 4px;
    background-color: #000;
    opacity: 0.5;
    color: #FFF;
  }

  .input::placeholder {
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
  }

  .list-item {
    list-style: none;
    opacity: 0.5;
    background-color: #000;
    color: #FFF;
    padding: 8px;
    cursor: pointer;
  }

  @media (max-width: 990px) {
    top: 70px;
    left: 55%;
    transform: translate(-60%, -20%);
    .input {
      width: 260px;
      height: 48px;

      text-indent: 50px;
      padding: 12px, 24px, 12px, 24px;
      border-radius: 4px;
      opacity: 0.3;
    }
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 57px;
  left: 30px;
  transform: translateY(-100%);
  pointer-events: none;
`;
