import { MainContent } from "../../components/MainContent/MainContent";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { Table } from "../../components/Table/Table";

export const MainPage = () => {
  return (
    <MainContent>
      <SearchForm />
      <Table></Table>
    </MainContent>
  );
};
