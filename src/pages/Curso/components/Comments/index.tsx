import React from "react";
import * as S from "./styles";
import { format } from "date-fns";

const ComentariosComponent: React.FC<any> = ({ comment, onReplyClick  }) => {
  const dateObj = new Date(comment.createdAt);
  const dateFormatted = format(dateObj, "dd/MM/yyyy HH:mm");

  return (
    <S.Comments>
      <div className="user">
        <img src={comment.profileImageBase64} className="image-user" alt="" />
      </div>
      <div>
        <div className="comment">
          <p className="comment-tiltle">{comment.userName}</p>
          <span className="comment-content">{comment.text}</span>
        </div>
        <S.Awnser>
          <span className="answer-comment" onClick={() => onReplyClick(comment)}>Responder </span>
          <span className="separator">•</span>
          <span className="published-comment">{dateFormatted}</span>
        </S.Awnser>
      </div>
    </S.Comments>
  );
};

export default ComentariosComponent;
