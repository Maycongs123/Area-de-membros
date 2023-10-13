import React, { useState } from "react";
import * as S from "./styles";
import { Input } from "../CustomInput";
import { Button } from "../CustomButtom";
import ButtonControl from "../CustomButtom/ButtomControl";
import { EditCursoModalProps, Video } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import videoService from "../../services/videoService";
import awsService from "../../services/AWSService";
import { PaperClipIcon } from "../Icons/PaperClip.Icon";
import { PaperClipDarkModeIcon } from "../Icons/PaperClipDarkMode.Icon";

interface ModalCreateClassProps {
  currentLessonList: Video[];
  toggleModal: (modalName: keyof EditCursoModalProps) => void;
  handleChangeLessonList: (newLessonList: Video[]) => void;
}

const lessonFormSchema = z.object({
  link: z.string(),
  title: z.string(),
  description: z.string(),
  complementaryMaterial: z.string(),
});

type CreateLessonFormData = z.infer<typeof lessonFormSchema>;

const ModalCreateVideo: React.FC<ModalCreateClassProps> = ({
  toggleModal,
  currentLessonList,
  handleChangeLessonList,
}) => {
  const { id: courseModuleId } = useParams<{ id: string }>();
  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  const { register, handleSubmit } = useForm<CreateLessonFormData>({
    resolver: zodResolver(lessonFormSchema),
  });

  const handleUploadVideoAws = async (selectedVideo: File) => {
    if (selectedVideo) {
      const response: string = await awsService.CreateAws(selectedVideo);
      return response;
    } else {
      console.log("Nenhum arquivo selecionado.");
      return null;
    }
  };

  const MAX_VIDEO_SIZE_BYTES = 30 * 1000 * 1000;

  const handleFileChange = (e: any) => {
    debugger;
    const selectedFile = e.target.files[0];

    if (selectedFile.size < MAX_VIDEO_SIZE_BYTES) {
      setSelectedVideo(selectedFile);
    } else {
      console.error("O vídeo excede o limite de tamanho.");
      window.alert("O vídeo excede o limite de tamanho permitido.");
    }
  };

  const handleCreateLesson = async (data: CreateLessonFormData) => {
    debugger;
    let urlFileAws: string | null = null;
    const userId: string | null = localStorage.getItem("id_user");

    if (selectedButton === 1) {
      urlFileAws = await handleUploadVideoAws(selectedVideo!)!;
      if (!urlFileAws) {
        console.log("Erro ao realizar upload do video");
        return;
      }
    }

    if (!courseModuleId) console.log("Houve um erro ao criar o curso");
    if (!userId) console.log("Houve um erro ao criar o curso");

    const newPosition: number = currentLessonList.length + 1;

    debugger;
    const newLesson: Video = {
      id: uuidv4(),
      url: selectedButton === 0 ? data.link : null,
      title: data.title,
      description: data.description,
      position: newPosition,
      videoId: null,
      complementaryMaterial: data.complementaryMaterial,
      courseModuleId: courseModuleId!,
      urlFileAws: selectedButton === 1 ? urlFileAws : null,
    };

    const result: Video = await videoService.CreateVideo(userId!, newLesson);

    if (result) {
      const updatedVideoList: Video[] = [...currentLessonList, result];
      handleChangeLessonList(updatedVideoList);
    }
    toggleModal("createClass");
  };

  return (
    <S.Container>
      <S.Wrapper>
        <div className="container">
          <div className="title">Criar aula</div>
        </div>
        <div className="button-group">
          <div className="button-with-label">
            <button
              className={`radial-button ${
                selectedButton === 0 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
              <div className="radial-inner">
                {selectedButton === 0 && <div className="fill"></div>}
              </div>
              <div className="border"></div>
            </button>
            <span className="button-label">Link</span>
          </div>
          <div className="button-with-label">
            <button
              className={`radial-button ${
                selectedButton === 1 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <div className="radial-inner">
                {selectedButton === 1 && <div className="fill"></div>}
              </div>
              <div className="border"></div>
            </button>
            <span className="button-label">Adicionar video</span>
          </div>
        </div>
      </S.Wrapper>

      <S.Wrapper style={{ display: selectedButton === 0 ? "none" : "" }}>
        <div className="add-video-div">
          <div className="add-button">
            <PaperClipIcon />
            <button
              className="add-button-text"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Adicionar Video
            </button>
            <input
              id="fileInput"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            ></input>
          </div>

          {selectedVideo && (
            <>
              <S.SelectedFiles>
                <div className="file-name">{selectedVideo.name}</div>
                <Button.Icon icon={PaperClipDarkModeIcon} />
              </S.SelectedFiles>
            </>
          )}
        </div>
      </S.Wrapper>

      <form onSubmit={handleSubmit(handleCreateLesson)} id="form-new-lesson">
        <S.Wrapper style={{ display: selectedButton === 1 ? "none" : "" }}>
          <Input.Root className="input-container">
            <Input.Control
              type="string"
              placeholder="Adicione o link da sua aula aqui."
              {...register("link")}
            />
          </Input.Root>
        </S.Wrapper>

        <S.Wrapper>
          <label htmlFor="">Título</label>
          <Input.Root className="input-container">
            <Input.Control
              type="text"
              placeholder="Titulo do aula"
              className="input-titulo"
              {...register("title")}
            />
          </Input.Root>
        </S.Wrapper>

        <S.Wrapper>
          <S.TextArea
            placeholder="Descrição do curso"
            {...register("description")}
          />
        </S.Wrapper>

        <S.Wrapper>
          <label htmlFor="">Material Complementar</label>
          <Input.Root className="input-container">
            <Input.Control
              type="text"
              placeholder="Descrição da aula"
              className="input-titulo"
              {...register("complementaryMaterial")}
            />
          </Input.Root>
        </S.Wrapper>
        <div className="container-buttons">
          <Button.Root className="cancel-button">
            <ButtonControl
              className="c-cancel-button"
              onClick={() => toggleModal("createClass")}
            >
              Cancelar
            </ButtonControl>
          </Button.Root>

          <Button.Root bgcolor="#FFC019" className="save-button">
            <ButtonControl type="submit" form="form-new-lesson">
              Salvar
            </ButtonControl>
          </Button.Root>
        </div>
      </form>
    </S.Container>
  );
};

export default ModalCreateVideo;
