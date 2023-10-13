import React, { useEffect } from "react";

import * as S from "./styles";
import { Video } from "../../../../types";
import { CheckIcon } from "../../../../components/Icons/CheckIcon";

interface AsideContentProps {
  videos: Video[];
  onLessonClick: (lesson: Video) => any;
}

const AsideContent: React.FC<AsideContentProps> = ({
  videos: lessons,
  onLessonClick,
}) => {
  const handleVideoClick = (video: Video) => {
    onLessonClick(video);
  };

  const generateVideoThumbnail = (url: string, canvas: any) => {
    return new Promise((resolve) => {
      console.log(url);
      const video = document.createElement("video");

      // this is important
      video.autoplay = false;
      video.muted = true;
      video.currentTime = 10;
      video.src = url;

      video.onloadeddata = () => {
        let ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      };
    });
  };

  // const capture = () => {
  //   const img = document.getElementById("img") as HTMLImageElement;
  //   const canvas = document.getElementById("canvas");

  //   generateVideoThumbnail("", canvas).then((data: any) => {
  //     img!.src = data;
  //   });
  // };

  const handleVideosCanvas = () => {
    debugger;
    lessons.map((lesson) => {
      if (lesson.urlFileAws) {
        const canvas = document.getElementById(lesson.id);
        generateVideoThumbnail(lesson.urlFileAws, canvas);
      }
    });
  };

  useEffect(() => {
    // capture();
    // const canvas = document.getElementById("canvas");
    // generateVideoThumbnail("", canvas);
    console.log(lessons)
    debugger
    if (lessons.length > 0) handleVideosCanvas();
  }, [lessons]);

  return (
    <S.Aside>
      {lessons.map((video) => (
        <S.ContentAside key={video.id} onClick={() => handleVideoClick(video)}>
          {video.url && (
            <div className="div-video">
              <img
                className="img-content"
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt=""
              />

              {video.isWatched && (
                <div className="check-video">
                  <CheckIcon />
                </div>
              )}
            </div>
          )}

          {video.urlFileAws && (
            <div className="div-video">
              <canvas className="img-content" id={video.id}></canvas>

              {video.isWatched && (
                <div className="check-video">
                  <CheckIcon />
                </div>
              )}
            </div>
          )}

          <div className="text-div-video">
            <p>{video.title}</p>
            <span>{video.description}</span>
          </div>
        </S.ContentAside>
      ))}
    </S.Aside>
  );
};

export default AsideContent;
