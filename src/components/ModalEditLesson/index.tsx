import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { Input } from "../CustomInput";
import { Button } from "../CustomButtom";
import ButtonControl from "../CustomButtom/ButtomControl";
import { EditCursoModalProps, Video } from "../../types";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import videoService from "../../services/videoService";
import { PaperClipIcon } from "../Icons/PaperClip.Icon";
import awsService from "../../services/AWSService";
import { PaperClipDarkModeIcon } from "../Icons/PaperClipDarkMode.Icon";

interface ModalEditClassProps {
  selectedLesson: Video;
  currentLessonList: Video[];
  handleChangeLessonList: (newLessonList: Video[]) => void;
  toggleModal: (modalName: keyof EditCursoModalProps) => void;
}

const ModalEditVideo: React.FC<ModalEditClassProps> = ({
  selectedLesson,
  currentLessonList,
  handleChangeLessonList,
  toggleModal,
}) => {
  const { id: courseModuleId } = useParams<{ id: string }>();

  const [selectedButton, setSelectedButton] = useState<number | null>(0);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [complementaryMaterial, setComplementaryMaterial] = useState("");
  const [link, setLink] = useState("");

  const lessonFormSchema = z.object({
    link: z.string(),
    title: z.string(),
    description: z.string(),
    complementaryMaterial: z.string(),
  });

  type UpdateLessonFormData = z.infer<typeof lessonFormSchema>;

  const { register, handleSubmit, reset } = useForm<UpdateLessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      link: link,
      title: title,
      description: description,
      complementaryMaterial: complementaryMaterial,
    },
  });

  const MAX_VIDEO_SIZE_BYTES = 30 * 1024 * 1024;
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size < MAX_VIDEO_SIZE_BYTES) {
      setSelectedVideo(selectedFile);
    } else {
      console.error("O vídeo excede o limite de tamanho.");
      window.alert("O vídeo excede o limite de tamanho permitido.");
    }
  };

  const handleUpdateLesson = async (data: UpdateLessonFormData) => {
    debugger;
    toggleModal("editClass");
    let urlFileAws: string | null = null;

    if (selectedButton === 1) {
      urlFileAws = await handleUploadVideoAws(selectedVideo!)!;
    }
    try {
      if (!courseModuleId) alert("Houve um erro ao criar o curso");

      const updatedLesson: Video = {
        id: selectedLesson.id,
        url: selectedButton === 0 ? data.link : null,
        title: data.title,
        description: data.description,
        position: selectedLesson.position,
        videoId: null,
        complementaryMaterial: data.complementaryMaterial,
        courseModuleId: courseModuleId!,
        urlFileAws: selectedButton === 1 ? urlFileAws : null,
      };

      const result: number = await videoService.UpdateVideo(
        selectedLesson.id,
        updatedLesson
      );

      if (result == 200) {
        const updatedLessonList: Video[] = currentLessonList.map((lesson) => {
          if (lesson.id == selectedLesson.id) {
            return updatedLesson;
          }
          return lesson;
        });
        handleChangeLessonList(updatedLessonList);

        return;
      }
    } catch (error: any) {
      alert(`Erro ao atualizar a aula: ${error.message}`);
    }
  };

  const handleUploadVideoAws = async (selectedVideo: File) => {
    if (selectedVideo) {
      const response: string = await awsService.CreateAws(selectedVideo);
      return response;
    } else {
      console.log("Nenhum arquivo selecionado.");
      return null;
    }
  };

  const handleDeleteLesson = async (event: any) => {
    toggleModal("editClass");
    event.preventDefault();
    const lessonId: string = selectedLesson?.id!;

    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta aula?"
    );
    if (!confirmDelete) return;

    if (!lessonId) {
      alert("Houve um erro ao excluir a aula");
      return;
    }

    const isDeleted: boolean = await videoService.DeleteVideo(lessonId);

    if (isDeleted) {
      const updatedLessonlist: Video[] = currentLessonList!.filter(
        (lesson) => lesson.id !== selectedLesson?.id
      );

      handleChangeLessonList(updatedLessonlist);
      return;
    }

    alert("Houve um erro ao excluir a aula");
  };

  const handleButtonClick = (index: number) => {
    setSelectedButton(index);
  };

  useEffect(() => {
    if (selectedLesson) {
      setSelectedButton(selectedLesson.url ? 0 : 1);

      setLink(selectedLesson.url || "");
      setDescription(selectedLesson.description);
      setComplementaryMaterial(selectedLesson.complementaryMaterial);
      setTitle(selectedLesson.title);
    }
    reset({
      link: selectedLesson.url || "",
      title: selectedLesson.title,
      description: selectedLesson.description,
      complementaryMaterial: selectedLesson.complementaryMaterial,
    });
  }, [selectedLesson]);

  return (
    <S.Container>
      <S.Wrapper>
        <div className="container">
          <div className="title">Editar aula</div>
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

          {selectedVideo || selectedLesson.urlFileAws ? (
            <>
              <S.SelectedFiles>
                <div className="file-name">
                  {selectedVideo?.name || "Anexo"}
                </div>
                <Button.Icon icon={PaperClipDarkModeIcon} />
              </S.SelectedFiles>
            </>
          ) : null}
        </div>
      </S.Wrapper>

      <form onSubmit={handleSubmit(handleUpdateLesson)} id="form-update-lesson">
        <S.Wrapper style={{ display: selectedButton === 1 ? "none" : "" }}>
          <Input.Root className="input-container">
            <Input.Control
              type="string"
              placeholder="Adicione o link da sua aula aqui."
              value={link}
              {...register("link")}
              onChange={(e) => setLink(e.target.value)} // Atualize o estado 'link' quando o usuário alterar o link
            />
          </Input.Root>
        </S.Wrapper>

        <S.Wrapper>
          <label htmlFor="">Nome</label>
          <Input.Root className="input-container">
            <Input.Control
              type="string"
              placeholder="Titulo do curso"
              className="input-titulo"
              {...register("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Input.Root>
        </S.Wrapper>

        <S.Wrapper>
          <label htmlFor="">Descrição</label>
          <Input.Root className="input-container-descricao" height="140px">
            <Input.Control
              type="text"
              placeholder="Descrição do curso"
              className="input-descricao"
              {...register("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Input.Root>
        </S.Wrapper>
        <S.Wrapper>
          <label htmlFor="">Material Complementar</label>
          <Input.Root className="input-container">
            <Input.Control
              type="text"
              placeholder="Descrição da aula"
              className="input-titulo"
              {...register("complementaryMaterial")}
              value={complementaryMaterial}
              onChange={(e) => setComplementaryMaterial(e.target.value)}
            />
          </Input.Root>
        </S.Wrapper>
        <div className="_container-buttons">
          <div className="buttons">
            <Button.Root className="exclude-button">
              <ButtonControl
                className="exclude-button-text"
                type="button"
                onClick={(e) => handleDeleteLesson(e)}
              >
                Excluir
              </ButtonControl>
            </Button.Root>
            
            <Button.Root className="cancel-button">
              <ButtonControl
                className="c-cancel-button"
                type="submit"
                onClick={() => toggleModal("editClass")}
              >
                Cancelar
              </ButtonControl>
            </Button.Root>

            <Button.Root bgcolor="#FFC019" className="save-button">
              <ButtonControl type="submit" form="form-update-lesson">
                Salvar
              </ButtonControl>
            </Button.Root>
          </div>
        </div>
      </form>
    </S.Container>
  );
};

export default ModalEditVideo;
