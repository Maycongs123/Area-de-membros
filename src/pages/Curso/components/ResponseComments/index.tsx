import React from "react";
import * as S from "./styles";

const RespostasComentarioComponent: React.FC<any> = ({ comment }) => {
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
      </div>
    </S.Comments>
  );
};

export default RespostasComentarioComponent;
