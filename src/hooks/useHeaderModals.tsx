import { useState } from 'react'
import { HomeModalProps } from '../types'

export function useHeaderModals() {
  const [modals, setModals] = useState<HomeModalProps>({
    sandwichMenu: false,
    userModal: false,
    bannerModal: false,
    carouselModal: false,
    newCarouselModal: false,
    editCarouselModal: false,
    createCurso: false,
    searchModal:false,
  })
  const toggleModal = (modalName: keyof typeof modals) => {
    const newModalsState = Object.keys(modals).reduce(
      (acc, key) => {
        acc[key as keyof typeof modals] =
          key === modalName ? !modals[key] : false
        return acc
      },
      {} as typeof modals,
    )

    setModals(newModalsState)
  }

  return { setModals, modals, toggleModal }
}
