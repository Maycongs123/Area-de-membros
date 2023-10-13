import { SandwichIcon } from "../Icons/SandwichIcon";
import React, { useState } from "react";
import * as S from "./styles";
import { Button } from "../CustomButtom";
import ButtonControl from "../CustomButtom/ButtomControl";
import { ExitIcon } from "../Icons/ExitIcon";
import { Course, HomeModalProps } from "../../types";
import { useCourse } from "../../contexts/CarouselContext";
import courseService from "../../services/courseService";

interface EditCourseModalProps {
  toggleModal: (modalName: keyof HomeModalProps) => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ toggleModal }) => {
  const { courses, setCourses, handleUpdatedCourses } = useCourse();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const handleEditClick = (carousel: Course) => {
    setIsEditing(carousel.id);
    setEditedName(carousel.title);
  };

  const handleSaveClick = (course: Course) => {
    if (course.id === isEditing) {
      const updatedCarousels = courses.map((c) =>
        c.id === course.id ? { ...c, title: editedName } : c
      );

      updatedCarousels.forEach(element => {
        if(element.id === isEditing ){
          courseService.updateCurso(element);
        }
      });
      

      setCourses(updatedCarousels);
      setIsEditing(null);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      const isConfirm: boolean = confirm(
        "Deseja apagar esse curso e todos os seus materiais?"
      );

      if (!isConfirm) return;

      const response = await courseService.deleteCourse(id);

      if (response) {
        const novoArrayDeCursos = courses.filter((curso) => curso.id !== id);

        handleUpdatedCourses(novoArrayDeCursos);
      }
    } catch (error) {}
  };

  const [draggedCarousel, setDraggedCarousel] = useState<Course | null>(null);

  const handleDragStart = (carousel: Course) => {
    setDraggedCarousel(carousel);
  };

  const handleDragEnd = () => {
    setDraggedCarousel(null);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    carousel: Course
  ) => {
    event.preventDefault();

    if (!draggedCarousel) {
      return;
    }

    const updatedCarousels = [...courses];
    const draggedIndex = updatedCarousels.findIndex(
      (c) => c.id === draggedCarousel.id
    );
    const targetIndex = updatedCarousels.findIndex((c) => c.id === carousel.id);

    // Troque a posição dos carrosséis
    if (draggedIndex !== -1 && targetIndex !== -1) {
      [updatedCarousels[draggedIndex], updatedCarousels[targetIndex]] = [
        updatedCarousels[targetIndex],
        updatedCarousels[draggedIndex],
      ];
      setCourses(updatedCarousels);
    }
  };

  const EditPositionCarousels = () => {
    debugger;
    const newArray = courses.map((obj: any, index: any) => ({
      ...obj,
      position: index + 1,
    }));

    newArray.forEach((carousel: any) => {
      debugger;
      courseService.updateCurso(carousel);
    });

    toggleModal("editCarouselModal")
  };

  return (
    <S.Container>
      <div className="container">
        <div className="title">Ordenar cursos</div>
        <div
          className="exit-icon"
          onClick={() => toggleModal("editCarouselModal")}
        >
          <ExitIcon />
        </div>
      </div>
      {courses.map((carousel) => {
        return (
          <div
            key={carousel.id}
            className="container"
            draggable
            onDragStart={() => handleDragStart(carousel)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => handleDragOver(event, carousel)}
          >
            <SandwichIcon />
            {isEditing === carousel.id ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <p className="text">{carousel.title}</p>
            )}

            <div className="align-right">
              {isEditing === carousel.id ? (
                <button
                  className="save-button"
                  onClick={() => handleSaveClick(carousel)}
                >
                  Salvar
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(carousel)}
                >
                  Editar
                </button>
              )}

              <button
                className="exclude-button"
                onClick={() => handleDeleteCourse(carousel.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        );
      })}

      <Button.Root bgcolor="#FFC019" className="login-button">
        <ButtonControl type="submit" onClick={() => EditPositionCarousels()}>
          Salvar
        </ButtonControl>
      </Button.Root>
    </S.Container>
  );
};

export default EditCourseModal;
