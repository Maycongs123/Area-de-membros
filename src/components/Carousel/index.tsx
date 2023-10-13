import React, { ComponentProps, useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../CustomButtom";
import ButtonControl from "../CustomButtom/ButtomControl";
import { PencilIcon } from "../Icons/PencilIcon";
import ModalCriarCurso from "../ModalCreateCourseModule";

import { useCourse } from "../../contexts/CarouselContext";
import { PlusCircleIcon } from "../Icons/PlusCircleIcon";
import { useHeaderModals } from "../../hooks/useHeaderModals";
import { Course } from "../../types";
import courseService from "../../services/courseService";

interface CarouselProps extends ComponentProps<"div"> {}

const Carousel: React.FC<CarouselProps> = ({ ...rest }) => {
  const { courses: courseList, setCourses } = useCourse();
  
  const { toggleModal, modals } = useHeaderModals();
  const [carouselId, setCarouselId] = useState("");
  const [imagensCarregadas, setLoadedImages] = useState(false);
  const navigate = useNavigate();

  const handleWatchLesson = (title: string, id: string) => {
    navigate(`/curso/${title}/lesson/${id}`);
  };

  const handleEditCurso = (id: string, title: string) => {
    navigate(`/edit-curso/${title}/${id}`);
  };

  const handleOpenNewModuleModal = (id: string) => {
    toggleModal("createCurso");
    setCarouselId(id);
  };

  const addCourse = async (courses: Course[] | []) => {
    if (courses) {
      if (courses) {
        setLoadedImages(true);
        setCourses(courses);
      }
    }
  };

  const getCourse = async () => {
    try {
      const userId = localStorage.getItem("id_user");

      if (!userId) {
        return;
      }

      const courses: Course[] | [] = await courseService.getCoursesByUserId(
        userId!
      );
      courses.sort((a, b) => a.position - b.position);
      addCourse(courses);

      if (courses) return true;

      return false;
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  const renderCursos = () => {
    const cursosRepetidos = [];

    for (let i = 0; i < 4; i++) {
      cursosRepetidos.push(
        <S.WrapperCarousel>
          <S.ScrollContainer>
            <S.Wrapper className="divAnimation">
              <S.IconContainer>
                <div
                  className="pencil-icon"
                  style={{ backgroundColor: "blue" }}
                ></div>
                <S.Image></S.Image>
              </S.IconContainer>
            </S.Wrapper>
          </S.ScrollContainer>
        </S.WrapperCarousel>
      );
    }

    return cursosRepetidos;
  };

  return (
    <S.Container {...rest}>
      {modals.createCurso && carouselId && (
        <ModalCriarCurso idCourse={carouselId} toggleModal={toggleModal} />
      )}

      {courseList.length > 0 ? (
        courseList.map((course) => {
          return (
            <S.WrapperCarousel key={course.id}>
              <S.Header>
                <div>
                  <p>{course.title}</p>
                </div>
                <div className="button">
                  <Button.Root
                    bgcolor="#323C4C"
                    className="input-button"
                    onClick={() => handleOpenNewModuleModal(course.id)}
                  >
                    <ButtonControl style={{ color: "white" }}>
                      Adicionar módulo
                    </ButtonControl>
                  </Button.Root>
                </div>
              </S.Header>

              <S.ScrollContainer>
                <S.Wrapper>
                  <S.AddNewCurso
                    onClick={() => handleOpenNewModuleModal(course.id)}
                  >
                    <div className="plus-curso-icon">
                      <PlusCircleIcon />
                    </div>
                    <S.Image
                      className="add-image"
                      style={{ backgroundColor: "blue" }}
                    />
                  </S.AddNewCurso>

                  {imagensCarregadas ? (
                    course.courseModule && course.courseModule?.length > 0 ? (
                      course.courseModule.map((courseModule) => {
                        return (
                          <S.IconContainer key={courseModule.title}>
                            <div
                              className="pencil-icon"
                              onClick={() => handleEditCurso(courseModule.id!, courseModule.title!)}
                            >
                              <PencilIcon />
                            </div>
                            <S.Image
                              onClick={() =>
                                handleWatchLesson(
                                  courseModule.title,
                                  courseModule.id!
                                )
                              }
                            >
                              {courseModule.coverImage ? (
                                <img
                                  style={{
                                    background: courseModule.isEnable
                                      ? "blue"
                                      : "gray",

                                    zIndex: courseModule.isEnable ? 101 : 900,

                                    opacity: courseModule.isEnable ? 99 : 0.2,
                                  }}
                                  src={courseModule.coverImage}
                                  alt="curso"
                                />
                              ) : null}
                            </S.Image>
                          </S.IconContainer>
                        );
                      })
                    ) : null
                  ) : (
                    <div style={{ display: "flex" }}>{renderCursos()}</div>
                  )}
                </S.Wrapper>
              </S.ScrollContainer>
            </S.WrapperCarousel>
          );
        })
      ) : (
        <S.WrapperCarousel>
          <S.ScrollContainer>
            <S.Wrapper>
              <S.AddNewCurso>
                <div className="plus-curso-icon">
                  {/* <PlusCircleIcon /> */}
                </div>
                <S.Image className="add-image" />
              </S.AddNewCurso>
            </S.Wrapper>
          </S.ScrollContainer>
        </S.WrapperCarousel>
      )}
    </S.Container>
  );
};

export default Carousel;
