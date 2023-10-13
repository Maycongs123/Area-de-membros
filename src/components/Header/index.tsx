import React, { ComponentProps } from "react";
import * as S from "./styles";

import { useHeaderModals } from "../../hooks/useHeaderModals";
import SandwichMenu from "./SandwichMenu";
import UserModal from "../UserModal";
import ModalBannerEdit from "../ModalBannerEdit";
import CarouselModal from "../CarouselModal";
import NewCarrousselModal from "../CarouselModal/NewCarrousselModal";

import { GalleryIcon } from "../Icons/GalleryIcon";
import { SandwichIcon } from "../Icons/SandwichIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { SlideShowIcon } from "../Icons/SlideShowIcon";
import { UserIcon } from "../Icons/UserIcon";
import EditCourseModal from "../EditCarouselModal";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";

interface HeaderProps extends ComponentProps<"header"> {
  hideGalleryIcon?: boolean;
  getBanner?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  getBanner,
  hideGalleryIcon,
  ...rest
}) => {
  const { toggleModal, modals } = useHeaderModals();

  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <S.Container {...rest}>
      <S.IconContainer
        onClick={() => toggleModal("sandwichMenu")}
        className="sandwich-icon"
      >
        <SandwichIcon />
      </S.IconContainer>

      <S.LogoContanier
        src="/logosvg.svg"
        alt="logo"
        onClick={handleNavigateToHome}
      />

      <S.NavBar>
        <S.IconContainer
          style={{ display: !hideGalleryIcon ? "hidden" : "none" }}
          // className={`gallery-icon ${(hideGalleryIcon)  ? "hidden" : ""}`}
          onClick={() => toggleModal("bannerModal")}
        >
          <GalleryIcon />
        </S.IconContainer>

        <S.IconContainer
          style={{ display: !hideGalleryIcon ? "hidden" : "none" }}
          className="slide-show-icon"
          onClick={() => toggleModal("carouselModal")}
        >
          <SlideShowIcon />
        </S.IconContainer>

        <S.IconContainer
          className="search-icon"
          onClick={() => toggleModal("searchModal")}
        >
          <SearchIcon />
        </S.IconContainer>

        <S.IconContainer
          className="user-icon"
          onClick={() => toggleModal("userModal")}
        >
          <UserIcon />
          {modals.userModal && <UserModal />}
        </S.IconContainer>
      </S.NavBar>
      
      {modals.carouselModal && <CarouselModal toggleModal={toggleModal} />}

      {modals.newCarouselModal && ( // criar novo carousel modal
        <NewCarrousselModal toggleModal={toggleModal} />
      )}
      {modals.editCarouselModal && ( // editar o carousel
        <EditCourseModal toggleModal={toggleModal} />
      )}
      {modals.bannerModal && ( // editar o banner
        <ModalBannerEdit
          setToogleBannerModal={() => toggleModal("bannerModal")}
          getBanner={getBanner!}
        />
      )}
      {modals.searchModal && <SearchModal toggleModal={toggleModal} />}

      {modals.sandwichMenu && ( // menu apenas no mobile
        <SandwichMenu
          getBanner={getBanner!}
          modals={modals}
          toggleModal={toggleModal}
          setToogleSandwichMenu={() => toggleModal("sandwichMenu")}
        />
      )}
    </S.Container>
  );
};

export default Header;
