import axios from "axios";
import { Banner } from "../types";

const bannerService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  getBannerByUserId: async (userId: string) => {
    try {
      const API_URL = `${bannerService.baseUrl}/Banner/GetByUserId/${userId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };
      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error: any) {
      console.log("erro ao buscar banner")
    }
  },

  updateBanner: async (userId: string, newBanner: Banner) => {
    try {
      const API_URL = `${bannerService.baseUrl}/Banner/UpdateByUserId/${userId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };
      const response = await axios.put(API_URL, newBanner, httpHeaders);

      if (response.data) return response.data;

      return [];
    } catch (error) {
      console.log("Erro ao buscar comentarios");
    }
  },

  deleteBanner: async (userId: string) => {
    try {
      const API_URL = `${bannerService.baseUrl}/Banner/${userId}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.delete(API_URL, httpHeaders);

      if (response) return response;

      return [];
    } catch (error) {
      throw new Error("Erro ao excluir banner do banco");
    }
  },
};

export default bannerService;
