import axios, { AxiosError } from "axios";
import { CountriesList } from "../components/SearchForm/SearchForm";

interface CountryData {
  CountryID: string;
  CountryName: string;
}

export const getListOfCountries = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const countries = await axios.get<CountryData[]>(
      `${import.meta.env.VITE_API}/list/getListOfSapCountry`,
      { headers: headers }
    );

    const countriesList: CountriesList = Object.fromEntries(
      countries.data.map((obj: { CountryID: string; CountryName: string }) => [
        obj.CountryID,
        obj.CountryName,
      ])
    );

    return countriesList;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
