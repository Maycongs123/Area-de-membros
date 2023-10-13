import React, { ComponentProps, ReactNode } from 'react'
import * as S from './styles'

interface ButtonControlProps extends ComponentProps<'button'> {
  children: ReactNode
}

const ButtonControl: React.FC<ButtonControlProps> = ({ children, ...rest }) => {
  return <S.Container {...rest}>{children}</S.Container>
}

export default ButtonControl
