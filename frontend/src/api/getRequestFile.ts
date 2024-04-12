import axios, { AxiosError } from "axios";

export const getRequestFile = async (id: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const requestData = await axios.get(
      `${import.meta.env.VITE_API}/request/getRequestFile?id=${id}`,
      { headers: headers }
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
