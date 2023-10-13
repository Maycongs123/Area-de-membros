import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 480px;
  z-index: 9999;
  border-radius: 8px;
  padding: 3.2rem 2.4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);
  p {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
    margin-left: 15px;
  }
  .title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
  }
  .container {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
  .edit-button {
    color: #ffc019;
  }
  .save-button {
    color: #ffc019;
  }
  .exclude-button {
    margin-left: 18px;
    color: #ff3131;
  }

  @media (max-width: 768px) {
    width: 380px;
  }
`
