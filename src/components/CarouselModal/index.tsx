import React from 'react'
import * as S from './styles'
import { PlusCircleIcon } from '../Icons/PlusCircleIcon'
import { SandwichIcon } from '../Icons/SandwichIcon'
import { HomeModalProps } from '../../types'

interface CarouselModalProps {
  toggleModal: (modalName: keyof HomeModalProps) => void
}

const CarouselModal: React.FC<CarouselModalProps> = ({ toggleModal }) => {
  const handleOpenNewCarousel = () => {
    toggleModal('newCarouselModal')
  }

  const handleOpenEditCarousel = () => {
    toggleModal('editCarouselModal')
  }

  return (
    <S.Container>
      <S.NewCarousel onClick={handleOpenNewCarousel}>
        <PlusCircleIcon />
        <p>Novo curso</p>
      </S.NewCarousel>
      <S.EditCarousel onClick={handleOpenEditCarousel}>
        <SandwichIcon />
        <p>Editar</p>
      </S.EditCarousel>
    </S.Container>
  )
}

export default CarouselModal
