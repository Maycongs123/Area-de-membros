import axios from "axios";

const userService = {
  // baseUrl: "https://localhost:7206/api",
  baseUrl: "https://areamembrosapi.azurewebsites.net/api",

  updateUser: async (newUser: any) => {
    try {
      const API_URL = `${userService.baseUrl}/User/${newUser.id}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };

      const response = await axios.put(API_URL, newUser, httpHeaders);

      if (response.data) return response.data;

      throw new Error("Erro ao atualizar o usuario");
    } catch (error) {
      console.log("Erro ao atualizar o usuario");
    }
  },

  getByIdUser: async (id: string) => {
    try {
      const API_URL = `${userService.baseUrl}/User/${id}`;

      const httpHeaders = {
        headers: { "content-type": "application/json" },
      };
      debugger;
      const response = await axios.get(API_URL, httpHeaders);

      if (response.data) return response.data;

      throw new Error("Erro ao atualizar o usuario");
    } catch (error) {
      console.log("Erro ao buscar usuario");
    }
  },
};

export default userService;
