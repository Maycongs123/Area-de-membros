import React, { ComponentProps } from 'react'
import * as S from './styles'

interface InputPrefixProps extends ComponentProps<'div'> {}

const InputPrefix: React.FC<InputPrefixProps> = ({ ...rest }) => {
  return <S.Container {...rest} />
}

export default InputPrefix
