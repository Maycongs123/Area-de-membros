import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Input } from "../CustomInput";
import { ExitIcon } from "../Icons/ExitIcon";
import SwitchButton from "../SwitchButton";
import { Button } from "../CustomButtom";

import { CourseModule, EditCursoModalProps } from "../../types";
import courseModuleService from "../../services/courseModuleService";
import { useNavigate } from "react-router-dom";

interface ModalEditModuleProps {
  idCourse?: string;
  currentCourseModule: CourseModule;
  handleUpdatedCurrentCourseModule: (
    newCurrentCourseModule: CourseModule
  ) => void;
  toggleModal: (modalName: keyof EditCursoModalProps) => void;
}

const ModalEditModule: React.FC<ModalEditModuleProps> = ({
  idCourse,
  currentCourseModule,
  handleUpdatedCurrentCourseModule,
  toggleModal,
}) => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEnable, setIsEnable] = useState(false);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCourseModule = async (e: any) => {
    e.preventDefault();

    if (!idCourse) {
      alert("Houve um erro ao editar este curso");
      return;
    }

    const newCourseModule: CourseModule = {
      title: title,
      description: description,
      coverImage: imageSrc ? imageSrc : null,
      position: currentCourseModule.position,
      isEnable: isEnable,
      courseId: idCourse!,
    };

    const updatedCourseModule: CourseModule =
      await courseModuleService.updateCourseModule(idCourse!, newCourseModule);

    if (updatedCourseModule)
      handleUpdatedCurrentCourseModule(updatedCourseModule);

    toggleModal("editCurso");
  };

  const handleDeleteCourseModule = async (e: any) => {
    e.preventDefault();
    const isConfirm: boolean = confirm(
      "Deseja apagar esse curso e todos os seus materiais?"
    );

    if (!isConfirm) return;

    if (!idCourse) {
      console.log("Houve um erro ao editar este curso");
      return;
    }

    const response = await courseModuleService.deleteCourseModule(idCourse!);

    if (response) navigate("/");
  };

  useEffect(() => {
    if (currentCourseModule) {
      setTitle(currentCourseModule.title);
      setDescription(currentCourseModule.description);
      setIsEnable(currentCourseModule.isEnable);
      setImageSrc(
        currentCourseModule.coverImage ? currentCourseModule.coverImage : ""
      );
    }
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <div className="container-header">
          <div className="title">Editar Módulo</div>
          <div className="exit-icon" onClick={() => toggleModal("editCurso")}>
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
        <span className="image-dimension">Dimensão da imagem: 240x336</span>
        <div className="input-file">
          <S.InputFile
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>
      </S.ImageWrapper>

      <form onSubmit={handleUpdateCourseModule} id="form-new-curso">
        <S.Wrapper>
          <label htmlFor="">Nome</label>
          <Input.Root className="input-container">
            <Input.Control
              type="text"
              placeholder="Titulo do módulo"
              className="input-titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Root>
        </S.Wrapper>
        <S.Wrapper>
          <label htmlFor="">Descrição</label>
          <S.TextArea
            placeholder="Descrição do módulo"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </S.Wrapper>
        <S.Wrapper>
          <div className="container-block">
            <div className="title">Bloquear módulo</div>
            <div className="switch-button">
              <SwitchButton
                checked={isEnable}
                onChange={(value) => {
                  setIsEnable(value);
                }}
              />
            </div>
          </div>
          <span>Ao bloquear um módulo, os alunos não terão acesso</span>
        </S.Wrapper>
      </form>

      <div className="container-button">
        <Button.Root className="exclude-button">
          <Button.Control
            className="exclude-button-text"
            type="button"
            onClick={(e) => handleDeleteCourseModule(e)}
          >
            Excluir
          </Button.Control>
        </Button.Root>

        <Button.Root
          bgcolor="#FFC019"
          className="save-button"
          maxwidth="11.9rem"
        >
          <Button.Control type="submit" form="form-new-curso">
            Salvar
          </Button.Control>
        </Button.Root>
      </div>
    </S.Container>
  );
};

export default ModalEditModule;
