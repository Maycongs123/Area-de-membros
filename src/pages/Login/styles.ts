import { styled } from 'styled-components'

// interface ErrorsInputProps {
//   erros: string
// }

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};

  .container-login-form {
    display: flex;
    flex-direction: column;
    padding: 9rem 3.3rem 0;

    .recover-password {
      margin-top: 2.4rem;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    /* justify-content: center; */

    .container-login-form {
      padding: 0rem 8rem 0 5.5rem;
      margin-top: 18.5rem;
    }
  }
`

export const Logo = styled.img`
  display: flex;
  margin: 0 auto;
  width: 12.6rem;
  height: 6rem;

  @media (min-width: 768px) {
    width: 18.2rem;
    height: 8.6rem;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  gap: 2.4rem;

  a {
    color: ${({ theme }) => theme.colors.white};
    justify-content: center;
    display: flex;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }

  .login-button {
    margin-top: 1.5rem;
  }

  @media (min-width: 768px) {
    .login-button {
      background-color: ${({ theme }) => theme.colors.yellow};
      margin-top: 2.2rem;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  ::-ms-reveal {
    display: none;
}

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-weight: 400;
  }

  span {
    color: #ff1919;
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    width: 38rem;

    label {
      font-size: 1.6rem;
    }

    span {
      color: #ff1919;
      font-size: 1.6rem;
    }
  }
`

export const Image = styled.img`
  display: none;
  @media (min-width: 768px) {
    display: flex;   
    /* min-width: 10rem; */
    width: 100%;
    max-height: 100%;
    /* margin-top: 10.6rem; */
  }

  @media (min-width: 1500px) {
    display: flex;   
    width: 100%;
    max-height: 100%;
    /* margin-top: 10.6rem; */
    width: 100rem;
  }
`
