import React, { useEffect } from "react";

import * as S from "./styles";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";

import bannerService from "../../services/bannerService";
import { Banner } from "../../types";

const Home: React.FC = () => {
  const getBanner = async () => {
    try {
      const base64String = localStorage.getItem("bannerBase64");

      if (base64String) {
        handleDivBannerImagem(base64String);
        return;
      }

      const userId: string | null = localStorage.getItem("id_user");

      if (!userId)
        alert(
          "Houve um erro ao buscar o Banner, se o erro persistir realize o login novamente"
        );
      const response: Banner = await bannerService.getBannerByUserId(userId!);

      if (response.id) {
        localStorage.setItem("idBanner", response.id);
        localStorage.setItem("bannerBase64", response.imageBase64);
        handleDivBannerImagem(response.imageBase64);
        return;
      }
      handleDivBannerImagem("");
    } catch (error: any) {
      // alert(error.message);
    }
  };

  const handleDivBannerImagem = (image: any) => {
    if (image) {
      var backgroundImage = `url(${image})`;

      var idDiv = document.querySelector("#imageBanner") as HTMLDivElement;

      if (idDiv) {
        idDiv.style.backgroundImage = backgroundImage;
      }
    } else {
      var backgroundImage = `url("/desktopBackground.png")`;

      var idDiv = document.querySelector("#imageBanner") as HTMLDivElement;

      if (idDiv) {
        idDiv.style.backgroundImage = backgroundImage;
      }
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <S.Container>
      <S.GradientOverlay />
      <S.BackgroundImage id="imageBanner" />
      <Header getBanner={getBanner} />
      <Carousel className="carousel" />
    </S.Container>
  );
};

export default Home;
