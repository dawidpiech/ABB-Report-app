import { Field } from "../../api/getInitialRequestData";
import {
  TableSectionTd,
  TableSectionTh,
  TableSectionThead,
  TableSectionWrapper,
} from "./TableSection.styles";

interface TableSectionProps {
  data: Field[];
}

export const TableSection = ({ data }: TableSectionProps) => {
  console.log(data);
  return (
    <TableSectionWrapper>
      <TableSectionThead>
        <TableSectionTh>
          {data.map((comlumName) => (
            <TableSectionTd>{comlumName.nameOfField}</TableSectionTd>
          ))}
        </TableSectionTh>
      </TableSectionThead>
    </TableSectionWrapper>
  );
};
