import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1.6rem;
  gap: 1.2rem;
  margin-bottom: 8.2rem;

  .class-img {
    display: flex;
    border-radius: 0.4rem;
    height: 4rem;
    max-width: 4rem;
    width: 100%;
    background-color: #232832;
  }

  .complementary-material-description {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 75%;

    p {
      color: ${({ theme }) => theme.colors.yellow};
      font-size: 1.2rem;
      font-weight: 700;
    }

    span {
      color: #b2b2b2;
      font-size: 1.2rem;
      text-align: justify;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    margin-top: 4.3rem;

    .class-img {
      height: 12rem;
      max-width: 12rem;
      width: 100%;
    }

    .complementary-material-description {
      gap: 0.8rem;

      p {
        font-size: 1.8rem;
      }
      span {
        font-size: 1.6rem;
      }
    }
  }
`;
