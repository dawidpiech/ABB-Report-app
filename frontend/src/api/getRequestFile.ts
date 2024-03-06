import axios from "axios";

export const getRequestFile = async (id: string) => {
  try {
    const requestData = await axios.get(
      `http://localhost:3000/api/request/getRequestFile?id=${id}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
