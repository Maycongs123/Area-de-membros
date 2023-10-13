import React, { useState } from "react";

import * as S from "./styles";
import { Input } from "../../../../components/CustomInput";
import { Button } from "../../../../components/CustomButtom";
import { PaperClipIcon } from "../../../../components/Icons/PaperClip.Icon";
import DescriptionVideo from "../DescriptionVideo";
import ComplementaryMaterial from "../ComplementaryMaterial";
import commentService from "../../../../services/commentService";
import { Comment } from "../../../../types";
import { useParams } from "react-router-dom";
import ComentariosComponent from "../Comments";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import awsService from "../../../../services/AWSService";
import DoubtsComponent from "../Doubts";
import { saveAs } from "file-saver";
import RespostasComentarioComponent from "../ResponseComments";

interface ComponentTabsComentsOrDoubts {
  commentsList: Comment[] | [];
  fetchComments: (courseModuleId: string) => void;
}

const TabsComentsOrDoubts: React.FC<ComponentTabsComentsOrDoubts> = ({
  commentsList,
  fetchComments,
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "comment" | "doubt" | "description"
  >("comment");

  const handleTabClick = (tab: "comment" | "doubt" | "description") => {
    setSelectedTab(tab);
  };

  const [commentText, setCommentText] = useState("");
  const [responseCommentText, setResponseCommentText] = useState("");
  const [doubtText, setDoubtText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState("");

  const doubtsList: Comment[] | [] = commentsList.filter(
    (comment) => comment.isDoubt
  );

  const regularCommentsList: Comment[] | [] = commentsList.filter(
    (comment) => !comment.isDoubt
  );

  const responseRegularCommentsList: Comment[] | [] = commentsList.filter(
    (comment) => comment.isResponse
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  let { id: courseModuleId } = useParams<{ id: string }>();
  const [isReplying, setIsReplying] = useState(false);

  const handleReplyClick = (comment : any) => {
    debugger
    setIsReplying(true);
    setReplyingToCommentId(comment.id);
  };

  const handleCommentSubmit = async () => {
    let isResponse: boolean = false;
    let isDoubt: boolean = false;
    let messageText: string = "";
    let FileNameAws: string | null = null;

    if (selectedTab == "doubt") isDoubt = true;

    messageText = isDoubt ? doubtText : commentText;

    if (messageText.trim() !== "") {
      try {
        const userId: string | null = localStorage.getItem("id_user");
        const currentDate = new Date();

        if (isDoubt && selectedFile) {
          const response: any = await handleUpload(selectedFile);
          if (response) FileNameAws = response;
        }

        const newComment: Comment = {
          id: uuidv4(),
          isDoubt,
          isResponse,
          courseModuleId: courseModuleId,
          createdAt: format(currentDate, "yyyy-MM-dd'T'HH:mm:ss"),
          userId: userId!,
          text: messageText,
          doubtFileNameAws: FileNameAws,
        };

        const response: Comment =
          await commentService.createComment(newComment);

        if (response) fetchComments(courseModuleId!);

        setResponseCommentText("");
        setCommentText("");
        setDoubtText("");
        setSelectedFile(null);
        return;
      } catch (error: any) {
        alert(`Erro ao atualizar a aula: ${error.message}`);
      }
    }
  };

  

  const handleResponseCommentSubmit = async () => {    
    let isResponse: boolean = true;
    let isDoubt: boolean = false;
    let messageText: string = "";
    let FileNameAws: string | null = null;

    if (selectedTab == "doubt") isDoubt = true;

    messageText =  responseCommentText;

    if (messageText.trim() !== "") {
      try {
        const userId: string | null = localStorage.getItem("id_user");
        const currentDate = new Date();

        if (isDoubt && selectedFile) {
          const response: any = await handleUpload(selectedFile);
          if (response) FileNameAws = response;
        }

        const newComment: Comment = {
          id: uuidv4(),
          isDoubt,
          isResponse,
          idRootComment: replyingToCommentId,
          courseModuleId: courseModuleId,
          createdAt: format(currentDate, "yyyy-MM-dd'T'HH:mm:ss"),
          userId: userId!,
          text: messageText,
          doubtFileNameAws: FileNameAws,
        };

        const response: Comment =
          await commentService.createComment(newComment);

        if (response) fetchComments(courseModuleId!);

        setResponseCommentText("");
        setCommentText("");
        setDoubtText("");
        setIsReplying(false);
        setSelectedFile(null);
        return;
      } catch (error: any) {
        alert(`Erro ao atualizar a aula: ${error.message}`);
      }
    }
  };

  const handleUpload = async (file: File) => {
    if (file) {
      const response: string = await awsService.CreateAws(file);

      return response;
    } else {
      console.log("Nenhum arquivo selecionado.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 30000000) {
        setSelectedFile(null);
        alert("O arquivo é maior do que 30 MB. Selecione um arquivo menor.");
      } else {
        setSelectedFile(file);
        const reader = new FileReader();

        reader.readAsDataURL(file);
      }
    }
  };

  const onDownloadAttachment = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fileNameAws: string
  ) => {
    event.preventDefault();
    const response: string = await awsService.getByIdAws(fileNameAws);

    downloadBase64File(response, "anexo-duvida");
  };

  function downloadBase64File(base64String: string, fileName: string) {
    const matches = base64String.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
      alert("O arquivo está corrompido!");
      return;
    }

    let fileType = matches[1];
    const base64WithoutPrefix = matches[2];

    if (fileType === "image/jpg") {
      fileType = "image/jpeg";
    }

    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: fileType });
    saveAs(blob, fileName);
  }

  return (
    <S.Container>
      <S.ComentsAndDoubtsButtons>
        <S.TabButton
          onClick={() => handleTabClick("description")}
          selected={selectedTab === "description"}
        >
          Descrição
        </S.TabButton>
        <S.TabButton
          onClick={() => handleTabClick("comment")}
          selected={selectedTab === "comment"}
        >
          Comentários
        </S.TabButton>
        <S.TabButton
          onClick={() => handleTabClick("doubt")}
          selected={selectedTab === "doubt"}
        >
          Dúvidas
        </S.TabButton>
      </S.ComentsAndDoubtsButtons>

      {selectedTab === "comment" ? (
        <S.NewComment>
          <div className="new-comment">
            <Input.Root width="59.4rem">
              <Input.Control
                placeholder="Deixar um comentário"
                type="text"
                value={commentText} // Define o valor do campo de texto
                onChange={(e) => setCommentText(e.target.value)} // Atualiza o estado do texto do comentário
              />
            </Input.Root>

            <Button.Root
              maxwidth="20.1rem"
              bgcolor="#FFC019"
              className="comment-button"
              onClick={handleCommentSubmit} // Chama a função ao clicar no botão Enviar
            >
              <Button.Control>Enviar</Button.Control>
            </Button.Root>
          </div>
          {regularCommentsList && (
            regularCommentsList.length > 0 ? (
            regularCommentsList.filter((comment) => comment.isResponse === false)
            .map((comment: any, index: number) => (
            <div key={index}>

            <ComentariosComponent comment={comment} onReplyClick={handleReplyClick} />

            {isReplying && replyingToCommentId === comment.id && (
              <div className="new-comment-reponse">
                <Input.Root>
                  <Input.Control
                    placeholder="Deixar um comentário"
                    type="text"
                    value={responseCommentText}
                    onChange={(e) => setResponseCommentText(e.target.value)}
                  />
                </Input.Root>
                <div className="div-button">                  
                    <Button.Root
                      maxwidth="10rem"
                      bgcolor="#FFC019"
                      className="comment-button-reponse"
                      onClick={() => setIsReplying(false)}
                    >                 
                      <Button.Control>Cancelar</Button.Control>
                    </Button.Root>                 
                 
                    <Button.Root
                      maxwidth="10rem"                   
                      bgcolor="#FFC019"
                      className="comment-button-reponse"
                      onClick={() => handleResponseCommentSubmit()}
                    >                 
                      <Button.Control>Comentar</Button.Control>
                    </Button.Root>                  
                </div>
              </div>
            )}

            {responseRegularCommentsList
              .filter((responseComment) => responseComment.idRootComment === comment.id)
              .map((responseComment, responseIndex) => (
                <div style={{paddingLeft: "5rem"}} key={responseIndex}>                  
                  <RespostasComentarioComponent comment={responseComment} onReplyClick={handleReplyClick} />
                </div>
              ))}
        
          
        
           
      </div>
    ))
  ) : null
)}
        </S.NewComment>
      ) : selectedTab === "doubt" ? (
        <S.NewDoubt>
          <div className="div-inputs">
            <Input.Root>
              <Input.Control
                placeholder="Deixar uma dúvida"
                type="text"
                value={doubtText}
                onChange={(e) => setDoubtText(e.target.value)}
              />
            </Input.Root>

            <div className="button-doubt">
              <S.ChangeFile>
                <div className="change-file-buttons">
                  <div className="change-button">
                    <S.InputFile
                      type="file"
                      onChange={handleFileChange}
                      className="input-file"
                    />
                    Arquivo
                    <Button.Icon icon={PaperClipIcon} />
                  </div>
                </div>
              </S.ChangeFile>

              <Button.Root
                maxwidth="30rem"
                bgcolor="#FFC019"
                onClick={handleCommentSubmit}
              >
                <Button.Control style={{ width: 75 }}>Enviar</Button.Control>
              </Button.Root>
            </div>
          </div>

          {selectedFile && (
            <>
              <S.SelectedFiles>
                <div className="file-name">{selectedFile.name}</div>
                <Button.Icon icon={PaperClipIcon} />
              </S.SelectedFiles>
            </>
          )}

          {doubtsList && (
            <>
              {doubtsList.length > 0
                ? doubtsList.map((comment: any, index: number) => (
                    <div className="div-doubt-component">
                      <DoubtsComponent
                        key={index}
                        comment={comment}
                        onDownloadAttachment={onDownloadAttachment}
                      />
                    </div>
                  ))
                : null}
            </>
          )}
        </S.NewDoubt>
      ) : selectedTab === "description" ? (
        <S.Description>
          <DescriptionVideo />
          <ComplementaryMaterial />
        </S.Description>
      ) : null}
    </S.Container>
  );
};

export default TabsComentsOrDoubts;
