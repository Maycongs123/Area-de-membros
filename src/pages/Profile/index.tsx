import React, { useEffect, useState } from "react";

import * as S from "./styles";
import Header from "../../components/Header";
import { Input } from "../../components/CustomInput";
import { Button } from "../../components/CustomButtom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userService from "../../services/userService";

const Profile: React.FC = () => {
  const editUserFormSchema = z.object({
    name: z.string(),
    newPassword: z.string(),
  });

  type EditUserFormData = z.infer<typeof editUserFormSchema>;

  const [imageSrc, setImageSrc] = useState<string>("");
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState<string>("");

  const { register, handleSubmit } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
  });

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

  const handleNewUser = async ({ name, newPassword }: EditUserFormData) => {
    const newUser: any = {
      name,
      newPassword,
      image: imageSrc ? imageSrc : null,
    };

    editFormUser(newUser);
  };

  const editFormUser = async (editUser: any) => {
    const id: any = localStorage.getItem("id_user");

    await getById();

    var newUser: any;

    if (editUser.newPassword === "") {
      newUser = {
        id: user.id,
        name: name,
        password: user.password,
        email: user.email,
        profileImageBase64: editUser.image,
      };
    } else {
      newUser = {
        id: id,
        name: name,
        password: editUser.newPassword,
        email: user.email,
        profileImageBase64: editUser.image,
      };
    }

    await userService.updateUser(newUser);

    getById();
  };

  const getById = async () => {
    const id: string | null = localStorage.getItem("id_user");

    const response: any = await userService.getByIdUser(id!);
    if (response) {
      setUser(response);

      localStorage.setItem("name_user", response.name);
      localStorage.setItem("image_base64", response.profileImageBase64);
    }
  };

  const deleteImage = async () => {
    const newUser: any = {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      profileImageBase64: null,
    };

    userService
      .updateUser(newUser)
      .then(() => {
        getById();

        localStorage.setItem("image_base64", " ");

        setImageSrc("");
      })
      .catch((error) => {
        console.error("Erro na solicitação:", error);
      });
  };

  useEffect(() => {
    const image64: any = localStorage.getItem("image_base64");

    if (image64 != " " && image64) {
      setImageSrc(image64);
    } else localStorage.setItem("image_base64", " "), setImageSrc("");

    const nameLocal: any = localStorage.getItem("name_user");
    setName(nameLocal);

    if (nameLocal) getById();
  }, []);

  return (
    <S.Container>
      <Header  hideGalleryIcon={true} />
      <S.ProfileData>
        <h3>Dados básicos</h3>
        <S.ImageContainer>
          <S.ImageWrapper image={imageSrc}>
            {imageSrc ? (
              <img src={imageSrc} alt="user" />
            ) : (
              <S.NoImage className="preview" />
            )}

            {imageSrc ? <span></span> : <span>Clique para adicionar</span>}

            <S.InputFile
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </S.ImageWrapper>
          <span className="delete-image" onClick={() => deleteImage()}>
            excluir imagem
          </span>
        </S.ImageContainer>

        <S.Form onSubmit={handleSubmit(handleNewUser)} id="form-new-user">
          <S.WrapperInputLabel>
            <Input.Root>
              <Input.Control
                {...register("name")}
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Input.Root>
          </S.WrapperInputLabel>

          <S.Privace>
            <div>
              <h3>Privacidade</h3>
              <p>Mudar senha</p>
            </div>
            <S.WrapperInputLabel>
              <label htmlFor="">Senha atual</label>
              <Input.Root>
                <Input.Control type="text" placeholder="Senha atual" />
              </Input.Root>
            </S.WrapperInputLabel>

            <S.WrapperInputLabel>
              <label htmlFor="">Nova senha</label>
              <Input.Root>
                <Input.Control
                  {...register("newPassword")}
                  type="text"
                  placeholder="Nova senha"
                />
              </Input.Root>
            </S.WrapperInputLabel>
          </S.Privace>
        </S.Form>
        <div className="save-button">
          <Button.Root
            bgcolor="#FFC019"
            className="save-button"
            maxwidth="32rem"
          >
            <Button.Control type="submit" form="form-new-user">
              Salvar
            </Button.Control>
          </Button.Root>
        </div>
      </S.ProfileData>
    </S.Container>
  );
};

export default Profile;
