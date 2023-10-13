import React, { useState } from "react";
import * as S from "./styles";
import { ExitIcon } from "../../Icons/ExitIcon";
import { Input } from "../../CustomInput";
import { Button } from "../../CustomButtom";
import ButtonControl from "../../CustomButtom/ButtomControl";

import { Course, HomeModalProps } from "../../../types";
import { useCourse } from "../../../contexts/CarouselContext";
import { v4 as uuidv4 } from "uuid";
import courseService from "../../../services/courseService";

interface NewCarrousselModalProps {
  toggleModal: (modalName: keyof HomeModalProps) => void;
}

const NewCarrousselModal: React.FC<NewCarrousselModalProps> = ({
  toggleModal,
}) => {
  const { courses: courseList, handleUpdatedCourses } = useCourse();
  const [carouselName, setCarouselName] = useState("");
  // const [imageSrc, setImageSrc] = useState<string>('')

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]

  //   if (file) {
  //     const reader = new FileReader()

  //     reader.onload = (e) => {
  //       setImageSrc(e.target?.result as string)
  //     }

  //     reader.readAsDataURL(file)
  //   }
  // }

  const handleCarouselNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setCarouselName(event.target.value);
  };

  const handleNewCarousel = async (event: React.FormEvent) => {
    try {
      console.log(courseList);
      event.preventDefault();

      const userId: string | null = localStorage.getItem("id_user");
      const newPosition: number = courseList.length + 1;

      const newCarousel: Course = {
        id: uuidv4(),
        title: carouselName,
        position: newPosition,
      };

      if (!userId) return;

      const response: any = await courseService.createCourse(
        userId!,
        newCarousel
      );
      debugger;

      if (response) {
        const newCourseUpdated: Course = {
          id: response.id,
          title: carouselName,
          position: newPosition,
        };

        handleUpdatedCourses([...courseList, newCourseUpdated]);
      }

      toggleModal("newCarouselModal");
    } catch (error) {
      alert("Erro ao criar curso");
    }
  };

  const isDisabled = carouselName.length === 0;

  return (
    <S.Container onSubmit={handleNewCarousel}>
      <div className="container">
        <div className="title">Novo Curso</div>
        <div
          className="exit-icon"
          onClick={() => toggleModal("newCarouselModal")}
        >
          <ExitIcon />
        </div>
      </div>
      <Input.Root className="input-container">
        <Input.Control
          type="text"
          placeholder="Nome do curso"
          className={`carroussel-input ${carouselName ? "filled" : ""}`}
          value={carouselName}
          onChange={handleCarouselNameChange}
        />
      </Input.Root>
      <Button.Root
        className={`salvar-button ${carouselName ? "yellow" : "gray"}`}
      >
        <ButtonControl type="submit" disabled={isDisabled}>
          Salvar
        </ButtonControl>
      </Button.Root>
    </S.Container>
  );
};

export default NewCarrousselModal;
