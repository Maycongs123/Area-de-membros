import React, { useState } from "react";
import * as S from "./styles";
import { Input } from "../../components/CustomInput";
import { Button } from "../../components/CustomButtom";
import ButtonControl from "../../components/CustomButtom/ButtomControl";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import RecoverPasswordModal from "./RecoverPasswordModal";
import { ViewOnIcon } from "../../components/Icons/ViewOnIcon";
import { ViewOffIcon } from "../../components/Icons/ViewOffIcon";

const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("E-mail inválido. Tente novamente."),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(1, "Senha incorreta. Tente novamente."),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

const Login: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpenModal = () => {
    setModalOpen((value) => !value);
    setModalStep(1);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRecoverPassword = () => {
    if (modalStep === 3) {
      handleCloseModal();
    } else {
      setModalStep((step) => step + 1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error: any) {
      alert(error.message);
    }

    // }
  };

  const login = async (login: LoginFormData) => {
    try {
      // const REST_API = "https://localhost:7206/api";
      const REST_API =
        "https://areamembrosapi.azurewebsites.net/api";

      const API_URL = `${REST_API}/Login`;
      const httpHeaders = {
        "Content-Type": "application/json",
      };

      const response: any = await axios.post(API_URL, login, {
        headers: httpHeaders,
      });

      if (response.data.token) {
        const token = response.data.token;
        const idUser = response.data.idUser;
        const nameUser = response.data.nameUser;
        const profileImageB64 = response.data.profileImageBase64;
        localStorage.setItem("access_token", token);
        localStorage.setItem("id_user", idUser);
        localStorage.setItem("name_user", nameUser);
        localStorage.setItem("image_base64", profileImageB64);

        navigate("/");
      }
    } catch (error) {
      throw new Error("Email ou senha invalida");
    }
  };



  return (
    <S.Container>
      <div className="container-login-form">
        <S.Logo src="./logosvg.svg" alt="Logo" />

        <S.Form onSubmit={handleSubmit(handleLogin)}>
          <S.Wrapper>
            <label htmlFor="email">Email</label>
            <Input.Root
              error={errors.email?.message}
              className="input-container"
            >
              <Input.Control
                value={"usuarioteste@gmail.com"}
                type="email"
                placeholder="email@exemplo.com"
                {...register("email")}
              />
            </Input.Root>
            {errors.email && <span>{errors.email.message}</span>}
          </S.Wrapper>
          <S.Wrapper>
          <label htmlFor="password">Senha</label>
          <Input.Root error={errors.password?.message} className="input-container">
            <Input.Control  
              value={"123456"}            
              type={showPassword ? 'text' : 'password'} 
              placeholder="Insira sua senha"
              {...register("password")}           
            />
          <button
            type="button"           
            onClick={togglePasswordVisibility} 
          >       
            {showPassword ? <ViewOnIcon /> : <ViewOffIcon />}
          </button>
          </Input.Root>
          {errors.password && <span>{errors.password.message}</span>}
        </S.Wrapper>
          <Button.Root bgcolor="#EDEDED" className="login-button">
            <ButtonControl type="submit">Acessar agora</ButtonControl>
          </Button.Root>
        </S.Form>
        <button className="recover-password" onClick={handleOpenModal}>
          Esqueceu a senha?
        </button>
      </div>
      {modalOpen && (
        <RecoverPasswordModal
          modalStep={modalStep}
          onClose={handleCloseModal}
          onRecoverPassword={handleRecoverPassword}
        />
      )}
      <div style={{display: "flex"}}>
      {/* <div style={{ backgroundSize: "100% auto", backgroundRepeat: "no-repeat",display: "flex", width: "50%", height: "93rem"}}> */}
        <S.Image src="./marketing.png" alt="" />
      </div>

    </S.Container>
  );
};

export default Login;
