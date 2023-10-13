import { useState } from 'react'
import { EditCursoModalProps } from '../types'

export function useEditCursoModals() {
  const [modals, setModals] = useState<EditCursoModalProps>({
    createClass: false,
    editCurso: false,
    editClass: false,
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
