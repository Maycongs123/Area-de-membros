import React, { useEffect, useState } from "react";

import * as S from "./styles";
import { UserIcon } from "../Icons/UserIcon";
import { HouseIcon } from "../Icons/HouseIcon";
import { UserCircleIcon } from "../Icons/UserCircleIcon";
import { CertificationIcon } from "../Icons/CertificationIcon";
import { GearIcon } from "../Icons/GearIcon";
import { QuestionIcon } from "../Icons/QuestionIcon";
import { Link } from "react-router-dom";

const links = [
  { linkName: "Inicio", icon: <HouseIcon />, path: "/" },
  { linkName: "Minha conta", icon: <UserCircleIcon />, path: "/my-profile" },
  {
    linkName: "Central de notificações",
    icon: <CertificationIcon />,
    path: "/",
  },
  {
    linkName: "Configurações",
    icon: <GearIcon />,
    path: "/",
  },
  {
    linkName: "Suporte",
    icon: <QuestionIcon />,
    path: "/",
  },
];

const UserModal: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [name, setName] = useState<string>("");


  const handleLogOut = () => {
    localStorage.removeItem("image_base64")
    localStorage.removeItem("idBanner")
    localStorage.removeItem("bannerBase64")
    localStorage.removeItem("access_token")
    localStorage.removeItem("name_user")
    localStorage.removeItem("id_user")
  }

  useEffect(() => {
    const image64: any = localStorage.getItem("image_base64");
    setImageSrc(image64);

    const nameLocal: any = localStorage.getItem("name_user");
    setName(nameLocal);
  }, []);

  
  return (
    <S.Container>
      <S.Header>
        <div className="user-icon">
          {imageSrc ? (
            <img src={imageSrc} className="user-icon" alt="user" />
          ) : (
            <UserIcon />
          )}
        </div>
        <p>{name}</p>
      </S.Header>

      <S.ProgressWrapper>
        <span>Seu progresso</span>
        <S.ProgressBar progress={"33%"} />
      </S.ProgressWrapper>
      <S.Nav>
        {links.map((link) => (
          <S.NavButton to={link.path} key={link.linkName}>
            <div className="link-icon">{link.icon}</div>
            <span>{link.linkName}</span>
          </S.NavButton>
        ))}
        <Link to="/login" className="sign-out" onClick={handleLogOut}>
          Sair
        </Link>
      </S.Nav>
    </S.Container>
  );
};

export default UserModal;
