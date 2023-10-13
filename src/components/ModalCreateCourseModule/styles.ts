import { styled } from "styled-components";

interface ImageProps {
  image: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  max-width: 39rem;
  width: 100%;
  height: 70rem;

  border-radius: 8px;
  padding: 3.2rem 2.4rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);

  @media (min-width: 768px) {
    max-width: 49rem;
    width: 100%;
  }

  .save-button {
    align-self: end;
  }
`;

export const ImageWrapper = styled.div<ImageProps>`
  display: flex;
  max-width: 100%;
  height: 20rem;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: #232832;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};

  img {
    width: 100%;
    height: 20rem;
    border-radius: 8px;
  }

  p {
    font-size: 1.4rem;
    display: flex;
    width: 15rem;
    color: ${({ theme }) => theme.colors.yellow};
    position: absolute;
    top: 42%;
    left: 52%;
    transform: translate(-50%, -50%);
    margin: auto;
    cursor: pointer;
  }

  .image-dimension {
    position: absolute;
    width: 100%;
    text-align: center;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    top: 53%;
  }
`;

export const InputFile = styled.input`
  opacity: 0;
  width: 15rem;
  font-size: 14px;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const NoImage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #333a47;
  border-radius: 0.8rem;
`;

export const TextArea = styled.textarea`
  display: flex;
  border-radius: 0.8rem;
  color: white;

  padding: 0.9rem 1.4rem;
  max-width: 100%;
  min-height: 10rem;
  color: ${({ theme }) => theme.colors.white};
  background-color: #333a47;
  border: none;
  color: white;
  &::placeholder {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  form {
    display: flex;
    padding-left: 2.4rem;
  }

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 1rem;
  }

  .input-container-descricao {
    position: relative;

    input::placeholder {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  @media (min-width: 768px) {
    width: 45rem;

    label {
      font-size: 1.6rem;
    }
  }
  .save-button {
    width: 150px;
    margin-left: auto;
  }
  .title {
    margin-top: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
  }
  .container {
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
  }
  .exit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    width: 2.8rem;
    height: 2.8rem;
    background-color: none;
    background: rgba(237, 237, 237, 0.2);
    border-radius: 50%;
    cursor: pointer;
  }
  .switch-button {
    margin-left: auto;
  }

  span {
    margin-top: -25px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: #717171;
  }
`;

export const SquareWrapper = styled.div`
  width: 195px;
  height: 264px;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: #232832;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  button {
    background-color: none;
    padding: 50px 8px 16px;
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.yellow};
    cursor: pointer;
    font-weight: 700;
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
`;

export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top: 2px solid #ffc019;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
