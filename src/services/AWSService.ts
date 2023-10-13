import axios from "axios";

const awsService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  CreateAws: async (file: any) => {
    try {
      const API_URL = `${awsService.baseUrl}/AwsS3`;

      const httpHeaders = {
        headers: { "content-type": "multipart/form-data" },
      };

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_URL, formData, httpHeaders);
      if (response.data) return response.data;

      throw new Error("Erro ao criar imagem na AWS");
    } catch (error) {
      throw new Error("Erro ao criar imagem na AWS");
    }
  },

  getByIdAws: async (id: any) => {
    try {
      const API_URL = `${awsService.baseUrl}/AwsS3/${id}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      throw new Error("Erro ao buscar imagem");
    } catch (error) {
      console.log("Erro ao buscar imagem");
    }
  },

  getFileByIdAws: async (id: string) => {
    try {
      const API_URL = `${awsService.baseUrl}/AwsS3/file/${id}`;

      const httpHeaders = {
        headers: { "content-type": "application/octet-stream" },
      };

      debugger;
      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      throw new Error("Erro ao buscar imagem");
    } catch (error) {
      console.log("Erro ao buscar imagem");
    }
  },
};

export default awsService;
