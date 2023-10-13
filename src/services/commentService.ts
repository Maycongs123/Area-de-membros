import axios from "axios";
import { Comment } from "../types";

const commentService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  createComment: async (newComment: Comment) => {
    try {
      const API_URL = `${commentService.baseUrl}/Comment`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };
      const response = await axios.post(API_URL, newComment, httpHeaders);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Falha ao atualizar a lição.");
      }
    } catch (error) {
      throw new Error("Erro durante a atualização da lição.");
    }
  },

  GetComment: async (id?: string) => {
    try {
      const API_URL = `${commentService.baseUrl}/Comment/GetByCourseModuleId/${id}`;

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
};

export default commentService;
