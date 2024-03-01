import axios from "axios";

interface File {
  MimeType: string;
  File: FileData;
}

interface FileData {
  type: string;
  data: [];
}

export const getRequestFile = async (id: string) => {
  try {
    const requestData = await axios.get<File[]>(
      `http://localhost:3000/api/request/getRequestFile?id=${id}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
