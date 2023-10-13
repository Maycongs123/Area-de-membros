import { Link } from "react-router-dom";
import { styled } from "styled-components";

interface ProgressBarProps {
  progress: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 36rem;
  height: 50.3rem;
  border-radius: 8px;
  padding: 3.2rem 2.4rem;
  position: absolute;
  top: 80px;
  right: 10px;
  margin: auto;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.8);

  @media (min-width: 768px) {
    top: 100%;
    right: 10px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  .user-icon {
    display: flex;
    width: 4.8rem;
    height: 4.8rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    background-color: ${({ theme }) => theme.colors["text-gray"]};
  }
  p {
    padding-top: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ProgressWrapper = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  display: flex;
  height: 0.8rem;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  border-radius: 4.2rem;
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.yellow} ${({ progress }) => progress},
    ${({ theme }) => theme.colors.bgInput} 33%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  margin-top: 3.4rem;

  .sign-out {
    color: red;
    font-family: "Inter";
    font-size: 12px;
  }
`;

export const NavButton = styled(Link)`
  display: flex;
  gap: 1.2rem;

  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;
