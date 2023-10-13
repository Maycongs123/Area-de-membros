import { styled } from 'styled-components'

interface ContainerProps {
  width?: string
  height?: string
  error?: string
  bgcolor?: string
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 1.2rem 2.4rem;
  gap: 1rem;
  width: 100%;
  height: ${({ height }) => height};
  background-color: ${({ theme, bgcolor }) => bgcolor || theme.colors.bgInput};
  border-radius: 0.4rem;
  border: ${({ error }) => (error ? '1px solid red' : 'unset')};
`
