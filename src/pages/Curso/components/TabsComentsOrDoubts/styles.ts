import { styled } from "styled-components";

interface ContainerSelectTabProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ComentsAndDoubtsButtons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 4.8rem;
`;

export const TabButton = styled.button<ContainerSelectTabProps>`
  display: flex;
  border-bottom: 4px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.white : theme.colors["text-dark"]};
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  justify-content: center;
  padding-bottom: 1.1rem;
  font-weight: 700;

  @media (min-width: 768px) {
    &:first-child {
      display: none;
    }
  }
`;

export const ChangeFile = styled.div`
  display: flex;
  max-width: 30rem;
  width: 75%;
  flex-direction: column;
  align-items: center;
  margin: auto;

  z-index: 1;
  .change-file-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    position: relative;

    .change-button {
      max-width: 100%;
      padding: 1.2rem;
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 0.8rem;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

export const SelectedFiles = styled.div`
  max-width: 15rem;
  max-height: 4rem;
  display: flex;

  margin-right: 1.5rem;
  margin-top: 1.5rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  font-size: 1.5rem;
  font-weight: 500;

  .file-name {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const NewComment = styled.div`
  display: flex;
  flex-direction: column;

  .new-comment {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 2rem;
    .comment-button {
      align-self: end;
    };
  }

  .new-comment-reponse {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 1rem;    
    width: 72%;
    padding-left: 6rem;

    .comment-button-reponse {
      align-self: end;
    };

    .div-button{
      display: flex;    
      gap: 1rem;
    }

    @media (min-width: 768px) {    
      .new-comment-reponse {
        display: flex;
        flex-direction: row;
        gap: 2rem; 
        width: 50%;       
      };

      .div-button{
        display: flex;
        justify-content: end;
        gap: 1rem;
      }
    }

  @media (min-width: 768px) {
    .new-comment {
      display: flex;
      flex-direction: row;
      gap: 2rem;
    };  
  }
`;

export const NewDoubt = styled.div`
  display: flex;
  flex-direction: column;

  .new-doubt {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 2rem;
    .comment-button {
      align-self: end;
    }
  }

  @media (min-width: 768px) {
    div {
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
    }

    .arquivo-button {
      flex-direction: row;
    }
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: flex-start;
  align-self: start;
  margin-top: 8.1rem;
  margin-bottom: 12rem;
  gap: 1.2rem;
  max-width: 29.5rem;
  width: 100%;
  margin-bottom: 1rem;

  .comment {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 2.4rem;
    background-color: #232832;
    max-width: 59.4rem;
    width: 100%;
    border-radius: 0.8rem;
  }

  .comment-tiltle {
    display: flex;
    color: white;
    font-weight: 700;
  }

  .comment-content {
    color: #b2b2b2;
  }

  .user {
    display: flex;
    width: 5rem;
    max-height: 5rem;
    align-items: center;
    background-color: white;
    border-radius: 9999px;
  }

  @media (min-width: 768px) {
    min-width: 59.5rem;
    width: 100%;

    .comment {
      width: 53rem;
    }
  }
`;

export const Awnser = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  gap: 2rem;

  .answer-comment {
    color: white;
  }

  .separator {
    color: white;
  }

  .published-comment {
    color: #717171;
  }
`;

export const ChangeButton = styled.div`
  max-width: 100%;
  padding: 1.2rem;
  background-color: ${({ theme }) => theme.colors.yellow};
  border-radius: 0.8rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

export const InputFile = styled.input`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 13rem;
  height: 5rem;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
`;
