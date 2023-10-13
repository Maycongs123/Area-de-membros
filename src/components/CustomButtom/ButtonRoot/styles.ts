import { styled } from 'styled-components'

interface ContainerProps {
  maxwidth?: string
  height?: string
  bgcolor?: string
  padding?: string
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  cursor: pointer;
  padding: ${({ padding }) => padding || '1.2rem 2.4rem'};
  max-width: ${({ maxwidth }) => maxwidth};
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ bgcolor }) => bgcolor};
  border-radius: 0.5rem;
  align-self: center;
  gap: 0.8rem;
  justify-content: center;
`
