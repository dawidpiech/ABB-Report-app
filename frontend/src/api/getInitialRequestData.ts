import axios from "axios";

export interface View {
  nameOfView: string;
  groups: Group[];
}

interface Group {
  nameOfGroup: string;
  sections: Section[];
}

interface Section {
  typeOfSection: string;
  nameOfSection: string;
  values: Value[];
}

interface Value {
  value: string;
  isModified?: string;
  isNewValue?: boolean;
}

export const getRequestInitialData = async (id: string) => {
  try {
    const requestData = await axios.get<View[]>(
      `http://localhost:3000/api/request/getRequestData?id=${id}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
