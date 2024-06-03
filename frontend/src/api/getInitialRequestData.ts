import axios, { AxiosError } from "axios";

export interface View {
  name: string;
  groups: Group[];
}

export interface Group {
  name: string;
  sections: Section[];
}

export interface Section {
  typeOfSection: string;
  name: string;
  fields: Field[];
}

export interface Field {
  name: string;
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
