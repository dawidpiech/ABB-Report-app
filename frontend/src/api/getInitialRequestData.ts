import axios, { AxiosError } from "axios";

export interface View {
  nameOfView: string;
  groups: Group[];
}

export interface Group {
  nameOfGroup: string;
  sections: Section[];
}

export interface Section {
  typeOfSection: string;
  nameOfSection: string;
  fields: Field[];
}

export interface Field {
  nameOfField: string;
  typeOfField: string;
  values: Value[];
}

export interface Value {
  value: string;
  isModified?: string;
  isNewValue?: boolean;
}

export const getRequestInitialData = async (id: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const requestData = await axios.get<View[]>(
      `${import.meta.env.VITE_API}/request/getRequestData?id=${id}`,
      { headers: headers }
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
