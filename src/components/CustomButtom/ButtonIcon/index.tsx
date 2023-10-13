import React, { ComponentProps, ElementType } from 'react'
import * as S from './styles'

interface ButtonIconProps extends ComponentProps<'div'> {
  icon: ElementType
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon, ...rest }) => {
  return (
    <S.Container {...rest}>
      <Icon />
    </S.Container>
  )
}

export default ButtonIcon
