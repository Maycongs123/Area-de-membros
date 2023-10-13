import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Input } from "../CustomInput";
import { ExitIcon } from "../Icons/ExitIcon";
import { Button } from "../CustomButtom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useCourse } from "../../contexts/CarouselContext";
import { CourseModule, HomeModalProps } from "../../types";
import courseModuleService from "../../services/courseModuleService";

const criarCursoFormSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type CreateModuleCourseFormData = z.infer<typeof criarCursoFormSchema>;

interface ModalCriarCursoProps {
  idCourse?: string;
  toggleModal: (modalName: keyof HomeModalProps) => void;
}

const ModalCriarCurso: React.FC<ModalCriarCursoProps> = ({
  idCourse,
  toggleModal,
}) => {
  const { courses, handleUpdatedCourses } = useCourse();

  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const { register, reset, handleSubmit } = useForm<CreateModuleCourseFormData>(
    {
      resolver: zodResolver(criarCursoFormSchema),
    }
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewCurso = async ({
    title,
    description,
  }: CreateModuleCourseFormData) => {
    setIsLoading(true);

    const currentCourse = courses.find((course) => course.id === idCourse);
    const newPosition = currentCourse!.courseModule!.length + 1;

    try {
      const newModuleCourse: CourseModule = {
        id: uuidv4(),
        title: title,
        description: description,
        courseId: idCourse!,
        coverImage: imageSrc,
        isEnable: true,
        position: newPosition,
      };

      const response: CourseModule =
        await courseModuleService.CreateCourse(newModuleCourse);

      if (response) {
        addCarrosel(response);
      }

      setIsLoading(false);
      toggleModal("createCurso");
      reset();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const addCarrosel = async (newCourseModule: any) => {
    const newCourse = courses.map((course) => {
      if (course.id === newCourseModule.courseId) {
        if (course.courseModule && course.courseModule.length > 0) {
          return {
            ...course,
            courseModule: [...course.courseModule, newCourseModule],
          };
        } else {
          return {
            ...course,
            courseModule: [newCourseModule],
          };
        }
      } else {
        return course;
      }
    });
    handleUpdatedCourses(newCourse);
  };

  useEffect(() => {
    console.log(courses);
  }, [courses]);

  return (
    <S.Container>
      <S.Wrapper>
        <div className="container">
          <div className="title">Criar novo módulo</div>
          <div className="exit-icon" onClick={() => toggleModal("createCurso")}>
            <ExitIcon />
          </div>
        </div>
      </S.Wrapper>

      <S.ImageWrapper image={imageSrc}>
        {imageSrc ? (
          <img src={imageSrc} alt="user" />
        ) : (
          <S.NoImage className="preview" />
        )}

        <p>Clique para adicionar</p>
        <span className="image-dimension">Dimensão da imagem: 1440x750</span>
        <div className="input-file">
          <S.InputFile
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </S.ImageWrapper>

      <form onSubmit={handleSubmit(handleNewCurso)} id="form-new-curso">
        <S.Wrapper>
          <label htmlFor="">Nome</label>
          <Input.Root className="input-container">
            <Input.Control
              type="text"
              placeholder="Titulo do curso"
              className="input-titulo"
              {...register("title")}
            />
          </Input.Root>
        </S.Wrapper>
        <S.Wrapper>
          <label htmlFor="">Descrição</label>
          <S.TextArea
            placeholder="Descrição do curso"
            {...register("description")}
          />
        </S.Wrapper>
        <S.Wrapper>
          <div className="container">
            {/* <div className="title">Bloquear módulo</div>
            <div className="switch-button">
              <SwitchButton />
            </div> */}
          </div>
          <span>Por padrão o módulo é criado desbloqueado</span>
          <span>Você pode bloquea-lo na seção de edição</span>
        </S.Wrapper>
      </form>
      <Button.Root bgcolor="#FFC019" className="save-button" maxwidth="11.9rem">
        <Button.Control
          type="submit"
          form="form-new-curso"
          disabled={isLoading}
        >
          {isLoading ? (
            <S.LoadingIndicator>
              <S.Spinner />
            </S.LoadingIndicator>
          ) : (
            "Salvar"
          )}
        </Button.Control>
      </Button.Root>
    </S.Container>
  );
};

export default ModalCriarCurso;
