import { View } from "./getInitialRequestData";
import axios, { AxiosError } from "axios";

export const getRequestDataOnStep = async (id: string, stepID: string) => {
  try {
    const requestData = await axios.get<View[]>(
      `${process.env.VITE_API}/request/getRequestDataOnStep?id=${id}&stepID=${stepID}`
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
