import { styled } from 'styled-components'

interface ImageProps {
  image: string
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .gallery-icon {
    display: hidden;
  }
`

export const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.4rem;
  max-width: 37.2rem;
  width: 100%;
  padding: 0 2.4rem;

  h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
  }

  .save-button{
    display: flex;
    justify-content: initial;
    width: 21rem;
      @media (max-width: 450px) {
        width: 100%;
  }
  }

  @media (min-width: 768px) {
    margin-top: 0rem;
    padding-left: 4rem;
    max-width: 49.7rem;
    
  }
`

export const ImageContainer = styled.div`
  display: flex;
  max-width: 31.3rem;
  align-items: center;
  width: 100%;
  flex-direction: row;
  gap: 0.6rem;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;

  .delete-image {
    color: #ff3131;
    font-size: 1.6rem;
    font-weight: 500;
    cursor: pointer;
  }
`

export const ImageWrapper = styled.div<ImageProps>`
  display: flex;
  min-width: 4.5rem;
  max-width: 13rem;
  min-height: 4.5rem;
  max-height: 13rem;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 13rem;
    height: 13rem;
    border-radius: 10rem;
    border: 1px solid #fff;
    opacity: 0.5;
    background-color: ${({ image }) =>
      image ? 'unset' : '#717171'};
  }

  span {
    display: flex;
    min-width: 9.2rem;
    color: ${({ theme }) => theme.colors.yellow};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    font-weight: 700;
    text-align: center;
    font-size: 16px;
    line-height: normal;
  }
`

export const NoImage = styled.div`
  display: flex;

  min-height: 13rem;
  max-height: 13rem;
  width: 100%;
  height: 100%;
  border-radius: 13rem;
  background-color: #717171;
`

export const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

export const WrapperInputLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  label {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.white};
  }

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem
`

export const Privace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 3.2rem;

  h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.white};
  }

  @media (min-width: 768px) {
    h3 {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`

