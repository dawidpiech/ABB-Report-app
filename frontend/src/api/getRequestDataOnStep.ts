import { View } from "./getInitialRequestData";
import axios from "axios";

export const getRequestDataOnStep = async (id: string, stepID: string) => {
  try {
    const requestData = await axios.get<View[]>(
      `http://localhost:3000/api/request/getRequestDataOnStep?id=${id}&stepID=${stepID}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
