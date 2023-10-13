import React from "react";
import * as S from "./styles";
import { format } from "date-fns";
import { Button } from "../../../../components/CustomButtom";

const DoubtsComponent: React.FC<any> = ({ comment, onDownloadAttachment }) => {
  const dateObj = new Date(comment.createdAt);
  const dateFormatted = format(dateObj, "dd/MM/yyyy HH:mm");
  return (
    <S.Doubts>
      <div className="user">
        <img src={comment.profileImageBase64} className="image-user" alt="" />
      </div>

      <div className="body-doubt">
        <div className="doubt">
          <p className="doubt-title">{comment.userName}</p>
          <span className="doubt-content">{comment.text}</span>
        </div>

        <S.Awnser>
          <span className="answer-comment">Responder </span>
          <span className="separator">•</span>
          <span className="published-comment">{dateFormatted}</span>
          {comment.doubtFileNameAws ? (
            <Button.Root
              maxwidth="10rem"
              bgcolor="#FFC019"
              onClick={(e) => onDownloadAttachment(e, comment.doubtFileNameAws)}
            >
              <Button.Control style={{ fontSize: 12 }}>
                Baixar Anexo
              </Button.Control>
            </Button.Root>
          ) : (
            <Button.Root maxwidth="10rem" bgcolor="#808080">
              <Button.Control style={{ fontSize: 12 }}>
                Baixar Anexo
              </Button.Control>
            </Button.Root>
          )}
        </S.Awnser>
      </div>
    </S.Doubts>
  );
};

export default DoubtsComponent;
