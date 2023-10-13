import axios from "axios";
import {  Video } from "../types";

const videoService = {
  //  baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  CreateVideo: async (userId: string, newLesson: Video) => {
    try {
      const API_URL = `${videoService.baseUrl}/Video/${userId}`;

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

  FetchVideosByCourseModuleId: async (courseId: string) => {
    try {
      const API_URL = `${videoService.baseUrl}/Video/GetByCourseModuleId/${courseId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error) {
      console.log("Erro ao buscar aulas");
    }
  },

  UpdateVideo: async (videoId: string, newLesson: Video) => {
    try {
      const API_URL = `${videoService.baseUrl}/Video/${videoId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.put(API_URL, newLesson, httpHeaders);

      if (response.status === 200) {
        return response.status;
      } else {
        throw new Error("Falha ao atualizar a lição.");
      }
    } catch (error) {
      throw new Error("Falha ao atualizar a lição.");
    }
  },

  DeleteVideo: async (lessonId: string) => {
    try {
      const API_URL = `${videoService.baseUrl}/Video/${lessonId}`;

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

export default videoService;
