import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { Button } from "../../components/CustomButtom";
import ButtonControl from "../../components/CustomButtom/ButtomControl";
import { ViewIcon } from "../../components/Icons/ViewIcon";
import { SandwichIcon } from "../../components/Icons/SandwichIcon";
import ModalCreateVideo from "../../components/ModalCreateLesson";
import ModalEditVideo from "../../components/ModalEditLesson";
import Header from "../../components/Header";
import { useEditCursoModals } from "../../hooks/useEditCursoModals";
import ModalEditModule from "../../components/ModalEditCourseModule";
import { CourseModule, Video } from "../../types";
import videoService from "../../services/videoService";
import { useNavigate, useParams } from "react-router-dom";
import { useCourse } from "../../contexts/CarouselContext";

const EditCurso: React.FC = () => {
  const navigate = useNavigate();
  const { id: courseId, title: courseTitle } = useParams();

  const { courses: courseList } = useCourse();

  const [currentCourseModule, setCurrentCourseModule] =
    useState<CourseModule>();

  const { modals, toggleModal } = useEditCursoModals();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoList, setVideoList] = useState<Video[] | []>([]);

  const getVideos = async (courseId: string) => {
    try {
      const lessons: Video[] =
        await videoService.FetchVideosByCourseModuleId(courseId);
      if (lessons) setVideoList(lessons);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeVideoList = (newVideoList: Video[]) => {
    if (newVideoList.length > 0) {
      setVideoList(newVideoList);
      return;
    }

    setVideoList([]);
  };

  const handleFindCurrentCourseModule = () => {
    let currentCourseModuleFromCourses = null;

    for (const course of courseList) {
      const foundCourseModule = course.courseModule?.find(
        (courseModule) => courseModule.id === courseId
      );

      if (foundCourseModule) {
        currentCourseModuleFromCourses = foundCourseModule;
        break;
      }
    }

    if (currentCourseModuleFromCourses) {
      setCurrentCourseModule(currentCourseModuleFromCourses);
    } else {
      return;
    }
  };

  const handleUpdatedCurrentCourseModule = (
    newCurrentCourseModule: CourseModule
  ) => {
    if (newCurrentCourseModule) setCurrentCourseModule(newCurrentCourseModule);
    return;
  };

  useEffect(() => {
    if (courseId) {
      getVideos(courseId);
      handleFindCurrentCourseModule();
    }
  }, []);

  return (
    <S.Container>     
      <Header hideGalleryIcon={true}/>      
      <div className="container">
        <div className="title">
          {currentCourseModule?.title
            ? currentCourseModule?.title
            : "Módulo sem título"}
        </div>
        <div className="buttons">
          <Button.Root
            bgcolor="#FFC019"
            className="top-button"
            maxwidth="13.5rem"
            onClick={() => toggleModal("editCurso")}
          >
            <ButtonControl className="text-button" type="submit">
              Editar Módulo
            </ButtonControl>
          </Button.Root>

          <Button.Root
            bgcolor="#FFC019"
            className="top-button"
            maxwidth="13.5rem"
          >
            <ButtonControl
              onClick={() => {
                navigate(`/curso/${courseTitle}/lesson/${courseId}`);
              }}
              className="text-button"
              type="submit"
            >
              Ver curso
            </ButtonControl>
            <div className="view-icon">
              <ViewIcon />
            </div>
          </Button.Root>
        </div>
      </div>
      <div className="classes">
        <div className="container">
          <div className="title-2">
            Aulas
            <div className="sub-title">Adicione aulas dentro do seu módulo</div>
          </div>
          <Button.Root
            bgcolor="#FFC019"
            className="y-button"
            onClick={() => toggleModal("createClass")}
          >
            <ButtonControl className="text-2-button" type="submit">
              Adicionar Aula
            </ButtonControl>
          </Button.Root>
        </div>
        {videoList.length > 0 ? (
          <>
            {videoList.map((lesson) => (
              <div key={lesson.id} className="_linecontainer">
                <SandwichIcon />
                <p className="text">{lesson.title}</p>
                <div className="align-right">
                  <button
                    className="edit-button"
                    onClick={() => {
                      setSelectedVideo(lesson);
                      toggleModal("editClass");
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="container">
            <div className="title-2">Este curso ainda não possui aulas!</div>
          </div>
        )}
      </div>

      {modals.editCurso && (
        <ModalEditModule
          idCourse={courseId}
          toggleModal={toggleModal}
          currentCourseModule={currentCourseModule!}
          handleUpdatedCurrentCourseModule={handleUpdatedCurrentCourseModule}
        />
      )}
      {modals.createClass && (
        <ModalCreateVideo
          handleChangeLessonList={handleChangeVideoList}
          currentLessonList={videoList}
          toggleModal={toggleModal}
        />
      )}
      {modals.editClass && (
        <ModalEditVideo
          toggleModal={toggleModal}
          selectedLesson={selectedVideo!}
          handleChangeLessonList={handleChangeVideoList}
          currentLessonList={videoList}
        />
      )}
    </S.Container>
  );
};

export default EditCurso;
