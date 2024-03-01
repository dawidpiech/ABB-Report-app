import axios from "axios";

export interface File {
  FileUUID: string;
  Filename: string;
}

export const getListOfRequestFiles = async (id: string) => {
  try {
    const requestData = await axios.get<File[]>(
      `http://localhost:3000/api/request/getRequestListOfFiles?id=${id}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
