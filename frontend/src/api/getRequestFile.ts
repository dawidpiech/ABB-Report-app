import axios, { AxiosError } from "axios";

export const getRequestFile = async (id: string) => {
  try {
    const requestData = await axios.get(
      `${import.meta.env.VITE_API}/request/getRequestFile?id=${id}`
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
