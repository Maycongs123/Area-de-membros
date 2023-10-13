import React, { useEffect, useState } from "react";
import * as S from "./styles";

import { ExitIcon } from "../Icons/ExitIcon";
import { Button } from "../CustomButtom";
import { Banner } from "../../types";
import bannerService from "../../services/bannerService";

interface ModalBannerEditProps {
  setToogleBannerModal: React.Dispatch<React.SetStateAction<boolean>>;
  getBanner: () => void;
}

const ModalBannerEdit: React.FC<ModalBannerEditProps> = ({
  setToogleBannerModal,
  getBanner,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (event: any) => {
    event.preventDefault();

    if (!imageSrc) {
      alert("Selecione uma imagem para salvar!");
      return;
    }

    try {
      const userId: string | null = localStorage.getItem("id_user");
      const bannerId: string | null = localStorage.getItem("idBanner");

      if (!userId)
        alert(
          "Houve um erro ao buscar o Banner, se o erro persistir realize o login novamente"
        );

      const newBanner: Banner = {
        id: bannerId ? bannerId : null,
        imageBase64: imageSrc,
      };

      const response: any = await bannerService.updateBanner(
        userId!,
        newBanner
      );
      debugger;
      if (response) {
        localStorage.setItem("idBanner", "");
        localStorage.setItem("bannerBase64", "");

        localStorage.setItem("idBanner", response.id);
        localStorage.setItem("bannerBase64", imageSrc);
        getBanner();
      }

      setToogleBannerModal((value) => !value);
    } catch (error) {
      alert("Erro ao enviar a imagem.");
    }
  };

  const deleteFile = async () => {
    const confirmDelete = window.confirm(
      "Você tem certeza que deseja excluir esta este Banner?"
    );

    if (!confirmDelete) return;

    const idBanner = localStorage.getItem("idBanner");

    if (!idBanner) return;

    const response: any = await bannerService.deleteBanner(idBanner!);
    if (response) {
      setImageSrc("");
      localStorage.setItem("idBanner", "");
      localStorage.setItem("bannerBase64", "");

      getBanner!();
      setToogleBannerModal((value) => !value);
    }
  };

  useEffect(() => {
    const image64: any = localStorage.getItem("bannerBase64");
    setImageSrc(image64);
  }, []);

  return (
    <S.Container>
      <S.Header>
        <p className="modal-title">BANNER</p>
        <S.IconContainer
          onClick={() => setToogleBannerModal((value) => !value)}
        >
          <ExitIcon />
        </S.IconContainer>
      </S.Header>

      <S.Form
        onSubmit={(e) => {
          e.preventDefault();
          setToogleBannerModal((value) => !value);
        }}
      >
        <S.ImageContainer>
          <S.ImageWrapper image={imageSrc}>
            {imageSrc ? (
              <>
                <S.BannerImage src={imageSrc} alt="user" />
                <S.ChangeImage>
                  <div className="change-image-buttons">
                    <div className="change-button">
                      <S.InputFile
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="input-file"
                      />
                      Substituir adicionar
                    </div>
                    <span
                      className="remove-button"
                      onClick={() => deleteFile()}
                    >
                      remover
                    </span>
                  </div>

                  <span className="image-dimension">
                    Dimensão da imagem: 1440x750
                  </span>
                </S.ChangeImage>
              </>
            ) : (
              <>
                <S.NoImage className="preview" />
                <S.InfoImage>
                  <span>Clique para adicionar</span>
                  <span className="image-dimension">
                    Dimensão da imagem: 1440x750
                  </span>
                </S.InfoImage>
                <S.InputFile
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </>
            )}
          </S.ImageWrapper>
        </S.ImageContainer>

        <S.Buttons>
          <Button.Root bgcolor="#000B20" maxwidth="fit-content">
            <Button.Control type="submit" className="cancel-button">
              Cancelar
            </Button.Control>
          </Button.Root>
          <Button.Root bgcolor="#FFC019" maxwidth="7rem">
            <Button.Control type="submit" onClick={(e) => handleSave(e)}>
              Salvar
            </Button.Control>
          </Button.Root>
        </S.Buttons>
      </S.Form>
    </S.Container>
  );
};

export default ModalBannerEdit;
