import axios, { AxiosError } from "axios";

export interface File {
  FileUUID: string;
  Filename: string;
}

export const getListOfRequestFiles = async (id: string) => {
  try {
    const requestData = await axios.get<File[]>(
      `${import.meta.env.VITE_API}/request/getRequestListOfFiles?id=${id}`
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
