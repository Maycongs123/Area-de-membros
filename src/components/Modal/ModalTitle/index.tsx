import React, { ComponentProps, ReactNode } from 'react'
import * as S from './styles'

interface ModalTitleProps extends ComponentProps<'div'> {
  children: ReactNode
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, ...rest }) => {
  return <S.Container {...rest}>{children}</S.Container>
}

export default ModalTitle
