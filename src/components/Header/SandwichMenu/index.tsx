import React, { useState } from "react";

import * as S from "./styles";
import { GalleryIcon } from "../../Icons/GalleryIcon";
import { ExitIcon } from "../../Icons/ExitIcon";
import { SearchIcon } from "../../Icons/SearchIcon";
import { SlideShowIcon } from "../../Icons/SlideShowIcon";
import ModalBannerEdit from "../../ModalBannerEdit";
import { UserIcon } from "../../Icons/UserIcon";
import { HomeModalProps } from "../../../types";

import CarouselModal from "../../CarouselModal";
import { useNavigate } from "react-router-dom";
import SearchModal from "../SearchModal";

interface SandwichModalProps {
  modals: HomeModalProps;
  setToogleSandwichMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: (modalName: keyof HomeModalProps) => void;
  getBanner: () => void;
}

const SandwichMenu: React.FC<SandwichModalProps> = ({
  modals,
  setToogleSandwichMenu,
  toggleModal,
  getBanner,
}) => {
  const [toogleBannerModal, setToogleBannerModal] = useState(false);
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate("/my-profile");
  };

  return (
    <S.Container>
      <S.Header>
        <S.LogoContanier src="./logosvg.svg" alt="logo" />
        <S.IconContainer
          onClick={() => setToogleSandwichMenu((value) => !value)}
        >
          <ExitIcon />
        </S.IconContainer>
      </S.Header>

      <S.NavContainer>
        <S.NavLink onClick={() => setToogleBannerModal((value) => !value)}>
          <S.IconContainer>
            <GalleryIcon />
          </S.IconContainer>

          <p>Banner</p>
        </S.NavLink>

        <S.NavLink onClick={() => toggleModal("carouselModal")}>
          <S.IconContainer>
            <SlideShowIcon />
          </S.IconContainer>

          <p>Curso</p>
        </S.NavLink>

        <S.NavLink onClick={() => toggleModal("searchModal")}>
          <S.IconContainer>
            <SearchIcon />
          </S.IconContainer>
          <p>Pesquisar</p>
        </S.NavLink>

        <S.NavLink onClick={() => navigateProfile()}>
          <S.IconContainer>
            <UserIcon />
          </S.IconContainer>
          <p>Minha Conta</p>
        </S.NavLink>
      </S.NavContainer>

      {toogleBannerModal && (
        <ModalBannerEdit
          getBanner={getBanner}
          setToogleBannerModal={setToogleBannerModal}
        />
      )}

      {modals.searchModal && <SearchModal toggleModal={toggleModal} />}
      {modals.carouselModal && <CarouselModal toggleModal={toggleModal} />}
    </S.Container>
  );
};

export default SandwichMenu;
