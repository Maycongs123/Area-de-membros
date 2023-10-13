import { styled } from 'styled-components'

interface ImageProps {
  image: string
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3.2rem 1.8rem;
  border-radius: 0.8rem;
  z-index: 999;

  @media (min-width: 768px) {
    width: 485px;
    height: unset;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  .modal-title {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.white};
  }
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 2.4rem;
  width: 100%;
  max-height: 2.4rem;
  height: 100%;
  cursor: pointer;
  padding: 0.6rem;
  background-color: rgba(237, 237, 237, 0.2);
  border-radius: 99px;
  svg {
    padding: 0;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;
    margin-bottom: 1.05rem;
  }

  .title-banner {
    background-color: #333a47;
  }
`

export const TextArea = styled.textarea`
  display: flex;
  border-radius: 0.8rem;

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
`

export const Buttons = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: end;

  .cancel-button {
    color: ${({ theme }) => theme.colors.white};
  }
`

export const ImageContainer = styled.div`
  display: flex;
  border-radius: 0.8rem;
  width: 100%;
  cursor: pointer;
`

export const ImageWrapper = styled.div<ImageProps>`
  display: flex;
  width: 100%;
  height: 16.2rem;
  position: relative;
`

export const InfoImage = styled.div`
  position: absolute;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  min-height: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.yellow};
    font-size: 1.4rem;
  }

  .image-dimension {
    display: flex;
    font-size: 1.2rem;
    justify-content: center;
    opacity: 0.5;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
  }
`

export const BannerImage = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  opacity: 0.46;
  position: absolute;
`

export const ChangeImage = styled.div`
  display: flex;
  max-width: 30rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: auto;

  z-index: 1;
  .change-image-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    position: relative;

    .change-button {
      max-width: 100%;
      padding: 1.2rem;
      background-color: ${({ theme }) => theme.colors.yellow};
      border-radius: 0.8rem;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .remove-button {
      color: #f31717;
      font-size: 1.2rem;
      font-weight: 600;
      z-index: 3;
    }
  }

  .image-dimension {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`

export const NoImage = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #333a47;
  border-radius: 0.8rem;
`

export const InputFile = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 13rem;
  height: 5rem;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
`
