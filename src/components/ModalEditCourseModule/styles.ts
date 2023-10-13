import { styled } from "styled-components";

interface ImageProps {
  image: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 39rem;
  height: 790px;
  border-radius: 8px;
  padding: 3.2rem 2.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);

  @media (min-width: 760px) {
    max-width: 50rem;
    width: 100%;
  }

  .save-button {
    align-self: end;
  }

  .container-button {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .exclude-button {
    width: 50px;
    margin-right: auto;
    margin-left: 10px;
    max-width: 70px;
    background: none;
  }

  .exclude-button-text {
    color: #ff3131;
    font-weight: 400;
  }
`;

export const ImageWrapper = styled.div<ImageProps>`
  display: flex;
  max-width: 195px;
  height: 264px;
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
    height: 100%;
    border-radius: 8px;
  }

  p {
    font-size: 1.4rem;
    display: flex;
    width: 15rem;
    color: ${({ theme }) => theme.colors.yellow};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: auto;
    cursor: pointer;
  }

  .image-dimension {
    position: absolute;
    width: 100%;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    top: 60%;
    left: 5%;
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
    color: white;

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
    margin-bottom: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
  }
  .container-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
  }
  .container-block {
    display: flex;
    flex-direction: row;
    align-items: center;
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

export const TextArea = styled.textarea`
  display: flex;
  border-radius: 0.8rem;
  padding: 0.9rem 1.4rem;
  max-width: 100%;
  min-height: 10rem;
  background-color: #333a47;
  border: none;
  color: white;
  &::placeholder {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;
