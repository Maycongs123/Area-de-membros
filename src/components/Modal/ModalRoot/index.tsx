import React, { ComponentProps, ReactNode } from 'react'
import * as S from './styles'

interface ModalRootProps extends ComponentProps<'div'> {
  children: ReactNode
  padding?: string
  maxwidth?: string
  onCloseOverlay?: () => void
}

const ModalRoot: React.FC<ModalRootProps> = ({
  onCloseOverlay,
  children,
  padding,
  maxwidth,

  ...rest
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!onCloseOverlay) return
    if (event.target === event.currentTarget) {
      onCloseOverlay()
    }
  }

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Container maxwidth={maxwidth} padding={padding} {...rest}>
        {children}
      </S.Container>
    </S.Overlay>
  )
}

export default ModalRoot
