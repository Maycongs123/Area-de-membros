import axios from "axios";
import { UserVideoProgress } from "../types";

const moduleProgressService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  updateUserVideoProgress: async (newUserVideoProgress: UserVideoProgress) => {
    try {
      const API_URL = `${moduleProgressService.baseUrl}/UserVideoProgress/${newUserVideoProgress.id}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };
      debugger
      const response = await axios.put(API_URL, newUserVideoProgress, httpHeaders);

      if (response.status == 200) return response.data;

      return;
    } catch (error) {
      throw new Error("Erro durante a atualização da lição.");
    }
  },

  fetchProgressDatasFromModule: async (
    courseModuleId: string,
    userId: string
  ) => {
    try {
      const API_URL = `${moduleProgressService.baseUrl}/UserVideoProgress/GetByCourseModuleIdAndUserId/${courseModuleId}/${userId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response: any = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error) {
      console.log("Erro ao buscar aulas");
    }
  },

  deleteVideo: async (lessonId: string) => {
    try {
      const API_URL = `${moduleProgressService.baseUrl}/Video/${lessonId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.delete(API_URL, httpHeaders);

      return response.data;
    } catch (error) {
      alert("Erro ao buscar aulas");
    }
  },
};

export default moduleProgressService;
