import axios from "axios";
import { CountriesList } from "../components/SearchForm/SearchForm";

type CountryData = { CountryID: string; CountryName: string };

export const getListOfCountries = async () => {
  try {
    const countries = await axios.get<CountryData[]>(
      "http://localhost:3000/api/list/getListOfSapCountry"
    );

    const countriesList: CountriesList = Object.fromEntries(
      countries.data.map((obj: { CountryID: string; CountryName: string }) => [
        obj.CountryID,
        obj.CountryName,
      ])
    );

    return countriesList;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
