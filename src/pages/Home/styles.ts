import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* position: relative; */
  padding-bottom: 6rem;
  .carousel {
    margin-top: 36.9rem;
    margin-left: 2.5rem;
  }

  @media (min-width: 768px) {
    .carousel {
      margin-top: 64.1rem;
      margin-left: 4.9rem;
    }
  }

  @media (min-width: 2200px) {
    .carousel {
      margin-top: 72.1rem;
      margin-left: 4.9rem;
    }
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 70vh;
  height: 70vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(0, 11, 32, 1),
    rgba(0, 11, 32, 1),
    rgba(0, 11, 32, 1)
  );
  filter: blur(5rem);
  pointer-events: none;
  z-index: -1;
`;

export const BackgroundImage = styled.div`
  min-width: 10rem;
  width: 100%;
  height: 100vh;
  background-image: url("/mobileBackground.png");
  background-size: 100% 100vh;
  background-repeat: no-repeat;
  background-position: top;
  position: absolute;

  top: 0;
  left: 0;
  z-index: -2;

  @media (min-width: 768px) and (max-width: 1023px) {
    min-height: 10rem;
    height: 100vh;
    background-size: 100% 100vh;
    background-repeat: no-repeat;
    background-image: url("/desktopBackground.png");
  }

  @media (min-width: 1024px) {
    min-height: 10rem;
    height: 100vh;
    background-position: unset;
    background-size: cover;
    background-image: url("/desktopBackground.png");
  }
`;
