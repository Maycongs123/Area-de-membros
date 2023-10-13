import React, { ComponentProps, ReactNode } from 'react'
import * as S from './styles'

interface ButtomRootProps extends ComponentProps<'div'> {
  children: ReactNode
  maxwidth?: string
  height?: string
  bgcolor?: string
  padding?: string
}

const ButtonRoot: React.FC<ButtomRootProps> = ({
  children,
  maxwidth = '29.4rem',
  height = '4.8rem',
  bgcolor,
  padding = '1.5rem 1.5rem',
  ...rest
}) => {
  return (
    <S.Container
      maxwidth={maxwidth}
      height={height}
      padding={padding}
      bgcolor={bgcolor}
      {...rest}
    >
      {children}
    </S.Container>
  )
}

export default ButtonRoot
