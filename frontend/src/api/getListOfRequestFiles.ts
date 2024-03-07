import axios from "axios";

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
    throw new Error("Ooops... Something went wron please try again later.");
  }
};
