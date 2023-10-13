import { styled } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;

  .carroussel-icon {
    display: none;
  }
  .gallery-icon {
    display: none;
  }
  .search-bar {
    display: none;
  }
  .view-icon {
    margin-top: 3px;
  }
  p {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
    margin-left: 15px;
  }
  .title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
    font-size: 32px;
  }
  .title-2 {
    margin-left: -15px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    size: 16px;
  }

  p {
    font-family: IBM Plex Sans;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }
  .container {
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  ._linecontainer {
    background: #232832;
    padding: 10px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .align-right {
    margin-left: auto;
    gap: 32px;
  }
  .exit-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    width: 2.8rem;
    height: 2.8rem;
    background-color: none;
    background: rgba(237, 237, 237, 0.2);
    border-radius: 50%;
    cursor: pointer;
  }
  .edit-button {
    color: #ffc019;
  }
  .exclude-button {
    margin-left: 18px;
    color: #ff3131;
  }
  .top-button {
    background: #2f3849;
    color: #fff;
  }
  .classes {
    border: 1px solid #232832;
    padding: 15px;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 15px;
    margin-left: auto;
  }
  .y-button {
    margin-left: auto;
    max-width: 150px;
  }
  .text-2-button {
    white-space: nowrap;
  }
  .sub-title {
    color: #b2b2b2;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .text-button {
    color: #ffffff;
    font-weight: 400;
    white-space: nowrap;
  }
  .text-button {
    font-weight: 400;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .container {
      display:flex;
      flex-direction: column;
    }
    .classes .container{
      display:flex;
      flex-direction: row;
    }
    .classes{
      border:none;
    }
    .buttons{
      margin: auto;
      margin-top:20px;
    
    }
  }
`
