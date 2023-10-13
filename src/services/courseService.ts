import axios from "axios";
import { Course } from "../types";

const courseService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  getCoursesByUserId: async (userId: string) => {
    try {
      const API_URL = `${courseService.baseUrl}/Course/GetByuserId/${userId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },

  createCourse: async (userId: string, newCurso: Course) => {
    const API_URL = `${courseService.baseUrl}/Course/${userId}`;
    const httpHeaders = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post(API_URL, newCurso, httpHeaders);
    debugger
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Falha ao criar o curso.");
    }
  },

  deleteCourse: async (courseId: string) => {
    try {
      const API_URL = `${courseService.baseUrl}/Course/${courseId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.delete(API_URL, httpHeaders);

      if (response.data) return response.data;

      return false;
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },

  updateCurso: async (curso: any) => {
    try {
      const API_URL = `${courseService.baseUrl}/Course/${curso.id}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.put(API_URL, curso, httpHeaders);

      if (response.data) return response.data;
      
      return [];
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },



};






export default courseService;
