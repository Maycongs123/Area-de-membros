import React, { useEffect, useState } from "react";

import * as S from "./styles";
import Header from "../../components/Header";
import { Button } from "../../components/CustomButtom";

import AsideContent from "./components/AsideContent";
import TabsComentsOrDoubts from "./components/TabsComentsOrDoubts";
import ComplementaryMaterial from "./components/ComplementaryMaterial";
import DescriptionVideo from "./components/DescriptionVideo";
import { DefaultUi, Player, Video as VimeVideo, Youtube } from "@vime/react";
import videoService from "../../services/videoService";
import { Comment, UserVideoProgress, Video } from "../../types";
import { useParams } from "react-router-dom";
import commentService from "../../services/commentService";
import { getIdFromYoutubeVideo } from "../../utils/getIdFromYoutubeVideo";
import moduleProgressService from "../../services/moduleProgressService";
import { CheckIcon } from "../../components/Icons/CheckIcon";
const Curso: React.FC = () => {
  const { id: courseModuleId } = useParams<{ id: string }>();

  const [lessonList, setLessonList] = useState<Video[] | []>([]);
  const [commentList, setCommentList] = useState<Comment[] | []>([]);

  const [selectedLesson, setSelectedLesson] = useState<Video | null>(null);

  const [currentProgress, setCurrentProgress] = useState(0);

  const fetchVideos = async (courseModuleId: string) => {
    try {
      const userId: string | null = localStorage.getItem("id_user");

      if (!userId) return;

      if (!courseModuleId)
        alert(
          "Houve um erro ao buscar os cursos, por favor atualize a página e tente novamente"
        );

      const lessonList: Video[] =
        await videoService.FetchVideosByCourseModuleId(courseModuleId!);

      const progressList: UserVideoProgress[] | [] =
        await moduleProgressService.fetchProgressDatasFromModule(
          courseModuleId!,
          userId!
        );

      const newVideosList: Video[] = lessonList.map((video) => {
        const currentUserVideoProgress = progressList.find(
          (progress) => progress.videoId == video.id
        );

        const newLesson: Video = {
          id: video.id,
          url: video.url,
          title: video.title,
          description: video.description,
          position: video.position,
          videoId: getIdFromYoutubeVideo(video.url!),
          complementaryMaterial: video.complementaryMaterial,
          courseModuleId: video.courseModuleId,
          isWatched: currentUserVideoProgress?.isWatched,
          userVideoProgressId: currentUserVideoProgress?.id!,
          urlFileAws: video.urlFileAws,
        };
        return newLesson;
      });

      newVideosList.sort((a, b) => a.position - b.position);

      if (newVideosList) {
        setLessonList(newVideosList);
        setSelectedLesson(newVideosList[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (courseModuleId: string) => {
    try {
      if (courseModuleId == undefined) {
        alert(
          "Houve um erro ao buscar comentários, por favor tente novamente!"
        );
        return;
      }
      const comments: Comment[] =
        await commentService.GetComment(courseModuleId);
      comments.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : null;
        const dateB = b.createdAt ? new Date(b.createdAt) : null;

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB.getTime() - dateA.getTime();
      });

      if (comments) return setCommentList(comments);

      alert("Erro ao buscar comentários");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLVideoClick = (newSelectedLesson: Video) => {
    setSelectedLesson(newSelectedLesson);
  };

  const handleChangeWatchedVideo = async () => {
    const userId: any = localStorage.getItem("id_user");
    debugger;
    const updatedUserVideoProgress: UserVideoProgress = {
      id: selectedLesson?.userVideoProgressId!,
      courseModuleId: selectedLesson?.courseModuleId!,
      isWatched: !selectedLesson?.isWatched,
      userId: userId,
      videoId: selectedLesson?.id!,
    };

    const response: any = await moduleProgressService.updateUserVideoProgress(
      updatedUserVideoProgress
    );

    if (!response) return;

    setLessonList((prevLessons) => {
      return prevLessons.map((lesson) => {
        if (lesson.id === updatedUserVideoProgress.videoId) {
          return { ...lesson, isWatched: !lesson.isWatched };
        }
        return lesson;
      });
    });

    setSelectedLesson((prevSelectedLesson: Video | null) => {
      if (prevSelectedLesson) {
        return {
          ...prevSelectedLesson,
          isWatched: !prevSelectedLesson.isWatched,
        };
      }
      return null;
    });
  };

  const calculateProgress = (progressDatas: Video[] | []) => {
    if (progressDatas.length == 0) return;

    let totalVideos: number;
    let watchedVideos: number;
    let percentWatched: number;

    totalVideos = progressDatas.length;

    const watchedProgressDatas: Video[] = lessonList.filter(
      (progressData) => progressData.isWatched === true
    );

    watchedVideos = watchedProgressDatas.length;

    percentWatched = (watchedVideos * 100) / totalVideos;

    setCurrentProgress(percentWatched);
  };

  useEffect(() => {
    if (courseModuleId) {
      fetchVideos(courseModuleId);
      fetchComments(courseModuleId);
    }
  }, []);

  useEffect(() => {
    if (lessonList) {
      calculateProgress(lessonList);
    }
  }, [lessonList]);

  return (
    <S.Container>
      <Header hideGalleryIcon={true} />
      <S.Wrapper>
        <S.Main>
          <S.VideoLesson>
            {selectedLesson ? (
              <>
                {selectedLesson.urlFileAws && (
                  <Player key="teste">
                    <VimeVideo>
                      <source
                        data-src="https://filesareamembers.s3.amazonaws.com/9df28f72-d31e-49f2-9350-09091bf4a772"
                        type="video/mp4"
                      />
                      <track
                        default
                        kind="subtitles"
                        src="https://filesareamembers.s3.amazonaws.com/9df28f72-d31e-49f2-9350-09091bf4a772"
                        srcLang="en"
                        label="English"
                      />
                      <track
                        kind="captions"
                        src="https://filesareamembers.s3.amazonaws.com/9df28f72-d31e-49f2-9350-09091bf4a772"
                        srcLang="es"
                        label="Spanish"
                      />
                    </VimeVideo>
                    <DefaultUi />
                  </Player>
                )}

                {selectedLesson.videoId && (
                  <Player key={selectedLesson.videoId}>
                    <Youtube videoId={selectedLesson.videoId!} />
                    <DefaultUi />
                  </Player>
                )}
              </>
            ) : (
              <div className="player-undefined">
                <h1>X</h1>
                <h2>Este módulo ainda não possui aulas</h2>
              </div>
            )}
          </S.VideoLesson>

          <S.ProgressDiv>
            <S.ProgressBar progress={currentProgress + "%"} />
            <p className="">
              {" "}
              Seu progresso deste módulo: {currentProgress + "%"}{" "}
            </p>
          </S.ProgressDiv>

          <S.TitleAndConcludeVideo>
            <h3>{selectedLesson?.title}</h3>

            {!selectedLesson?.isWatched ? (
              <Button.Root
                bgcolor="#FFC019;"
                maxwidth="20rem"
                className="conclude-button"
                onClick={handleChangeWatchedVideo}
              >
                <Button.Control>CONCLUIR AULA</Button.Control>
              </Button.Root>
            ) : (
              <Button.Root
                bgcolor="#323C4C"
                maxwidth="20rem"
                className="conclude-button"
                onClick={handleChangeWatchedVideo}
              >
                <Button.Control style={{ color: "green" }}>
                  AULA CONCLUIDA
                </Button.Control>
                <CheckIcon />
              </Button.Root>
            )}
          </S.TitleAndConcludeVideo>
          <S.DescriptionVideoClass>
            <DescriptionVideo
              description={
                selectedLesson?.description ? selectedLesson.description : " "
              }
            />
          </S.DescriptionVideoClass>
          <S.ComplementaryMaterial>
            <ComplementaryMaterial
              complementaryMaterial={
                selectedLesson?.complementaryMaterial
                  ? selectedLesson.complementaryMaterial
                  : " "
              }
            />
          </S.ComplementaryMaterial>
          <TabsComentsOrDoubts
            commentsList={commentList}
            fetchComments={fetchComments}
          />
        </S.Main>

        <AsideContent videos={lessonList} onLessonClick={handleLVideoClick} />
      </S.Wrapper>
    </S.Container>
  );
};

export default Curso;
