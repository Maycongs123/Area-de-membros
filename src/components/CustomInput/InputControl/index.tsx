import React, { ComponentProps, forwardRef } from 'react'

import * as S from './styles'

interface InputProps extends ComponentProps<'input'> {}

const InputControl: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ ...rest }, ref) => {
  return <S.Container ref={ref} {...rest} />
}

export default forwardRef(InputControl)
