import { View } from "./getInitialRequestData";
import axios, { AxiosError } from "axios";

export const getRequestDataOnStep = async (
  id: string,
  stepID: string,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const requestData = await axios.get<View[]>(
      `${
        import.meta.env.VITE_API
      }/request/getRequestDataOnStep?id=${id}&stepID=${stepID}`,
      { headers: headers }
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
