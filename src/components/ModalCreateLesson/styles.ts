import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 485px;
  height: 700px;
  border-radius: 8px;
  padding: 1rem 0.8rem 2.4rem 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);
  .cancel-button {
    margin-left: auto;
    margin-left: 140px;
    max-width: 150px;
    background: none;
  }
  .c-cancel-button {
    color: #fff;
    font-weight: 400;
  }
  .container-buttons {
    display: flex;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 768px) {
    width: 90%; /* Porcentagem da largura da tela */

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .cancel-button {
      margin-left: auto;
      margin-left: 70px;
      max-width: 150px;
      background: none;
    }
  }
`;


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-top: 32px;

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-weight: 400;
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

  .button-group {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .button-with-label {
    display: flex;
    align-items: center;
  }

  .radial-button {
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .radial-button .radial-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  .radial-button.selected .radial-inner {
    width: 80%;
    height: 80%;
    background-color: #f5d742;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .radial-button.selected {
    border: 2px solid #f5d742; /* Alterado para borda amarela quando selecionado */
  }

  .button-label {
    color: #fff;
    margin-left: 8px;
  }

  .button-label {
    color: #fff;
    margin-left: 8px;
  }

  @media (min-width: 768px) {
    width: 45rem;

    label {
      font-size: 1.6rem;
    }
  }
  .title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    margin-left: -20px;
  }
  .container-buttons {
    display: flex;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }

  .switch-button {
    margin-left: auto;
  }

  .save-button {
    margin-left: auto;
    max-width: 150px;
  }

  .cancel-button {
    margin-left: auto;
    margin-left: 140px;
    max-width: 150px;
    background: none;
  }

  .c-cancel-button {
    color: #fff;
    font-weight: 400;
  }

  .add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9, 3rem;
    height: 50px;
    border-radius: 6px;
    margin-right: auto;
    max-width: 9, 3rem;
    background: #323c4c;
    padding: 1rem;
  }

  .add-button-text {
    color: #fff;
    font-weight: 400;
  }

  .add-video-div {
    display: flex;
    flex-direction: row;
    align-items: center;
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


export const SelectedFiles = styled.div`
  max-width: 15rem;
  max-height: 6rem;
  display: flex;

  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 500;

  .file-name {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
