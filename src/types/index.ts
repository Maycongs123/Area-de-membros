export interface HomeModalProps {
  sandwichMenu: boolean;
  userModal: boolean;
  bannerModal: boolean;
  carouselModal: boolean;
  newCarouselModal: boolean;
  editCarouselModal: boolean;
  createCurso: boolean;
  searchModal: boolean;
}

export interface EditCursoModalProps {
  createClass: boolean;
  editCurso: boolean;
  editClass: boolean;
}

export interface Banner {
  id?: string | null;
  imageBase64: string;
}

export interface Video {
  id: string;
  title: string;
  url?: string | null;
  videoId: string | null;
  position: number;
  description: string;
  complementaryMaterial: string;
  courseModuleId: string;
  isWatched?: boolean;
  userVideoProgressId?: string;
  urlFileAws: string | null;
}

export interface UserVideoProgress {
  id: string;
  courseModuleId: string;
  videoId: string;
  userId: string;
  isWatched: boolean;
}

export interface CourseModule {
  id?: string;
  title: string;
  description: string;
  coverImage: string | null;
  position: number;
  isEnable: boolean;
  courseId: string;
  comments?: Comment[];
}

export interface Course {
  id: string;
  title: string;
  position: number;
  courseModule?: CourseModule[];
}
export interface Comment {
  id?: string;
  courseModuleId?: string;
  userId: string;
  text: string;
  doubtFileNameAws?: string | null;
  userName?: string;
  profileImageBase64?: string;
  createdAt?: string;
  isDoubt: boolean;
  isResponse: boolean;
  idRootComment?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: number;
}
