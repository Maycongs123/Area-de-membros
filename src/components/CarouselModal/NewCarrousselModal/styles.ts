// Seu arquivo de estilos (styles.js ou styles.ts)

import { styled } from 'styled-components'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};

  max-width: 38rem;
  width: 100%;
  height: 260px;
  border-radius: 8px;
  padding: 3.2rem 2.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);
  z-index: 999;

  .title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
  }

  .container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }

  .align-right {
    margin-left: auto;
    gap: 32px;
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

  .salvar-button {
    max-width: 500px;
    margin-top: 2.8rem;
    margin-left: auto;
    /* Estilo padrão do botão (cinza) */
    background-color: #8c8c8c;

    /* Estilo quando o campo de entrada está preenchido (amarelo) */
    &.yellow {
      background-color: #ffc019;
    }

    /* Estilo quando o campo de entrada está vazio (cinza) */
    &.gray {
      background-color: #8c8c8c;
    }
  }

  @media (max-width: 768px) {
    max-width: 48rem;
    width: 100%;
    .salvar-button {
      max-width: 145px;
      max-height: 51px;
      margin-top: 2.8rem;
      background-color: #ffc019;
      &.gray {
        background-color: #ffc019;
      }
      .carroussel-input.filled {
        background-color: #333a47;
      }
    }
  }
`
