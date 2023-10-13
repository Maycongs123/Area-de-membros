import axios from "axios";
import { CourseModule } from "../types";

const courseModuleService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  CreateCourse: async (newLesson: CourseModule) => {
    try {
      const API_URL = `${courseModuleService.baseUrl}/CourseModule`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.post(API_URL, newLesson, httpHeaders);

      if (response.status == 200) return response.data;

      return;
    } catch (error) {
      throw new Error("Erro durante a atualização da lição.");
    }
  },

  updateCourseModule: async (
    courseModuleId: string,
    newCourseModule: CourseModule
  ) => {
    try {
      const API_URL = `${courseModuleService.baseUrl}/CourseModule/${courseModuleId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.put(API_URL, newCourseModule, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },

  deleteCourseModule: async (courseId: string) => {
    try {
      const API_URL = `${courseModuleService.baseUrl}/CourseModule/${courseId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.delete(API_URL, httpHeaders);

      if (response.data) return response.data;
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },
};

export default courseModuleService;
