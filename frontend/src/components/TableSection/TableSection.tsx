import { Field } from "../../api/getInitialRequestData";
import {
  TableSectionTable,
  TableSectionTbody,
  TableSectionTd,
  TableSectionTh,
  TableSectionThead,
  TableSectionTr,
  TableSectionWrapper,
} from "./TableSection.styles";

interface TableSectionProps {
  data: Field[];
}

export const TableSection = ({ data }: TableSectionProps) => {
  return (
    <TableSectionWrapper>
      <TableSectionTable>
        <TableSectionThead>
          <TableSectionTr $background={true}>
            {data.map((comlumName, index) => (
              <TableSectionTh key={index}>
                {comlumName.nameOfField}
              </TableSectionTh>
            ))}
          </TableSectionTr>
        </TableSectionThead>
        <TableSectionTbody>
          {data[0].values.map((row, rowIndex, array) =>
            array.length === 1 && row.value === "" ? (
              <TableSectionTr
                key={rowIndex}
                $background={rowIndex % 2 === 0 ? false : true}
              >
                <TableSectionTd colSpan={data.length} $textalign="center">
                  Table is empty
                </TableSectionTd>
              </TableSectionTr>
            ) : (
              <TableSectionTr
                key={rowIndex}
                $background={rowIndex % 2 === 0 ? false : true}
              >
                {data.map((value, index) => (
                  <TableSectionTd key={index}>
                    {value.values[rowIndex].value}
                  </TableSectionTd>
                ))}
              </TableSectionTr>
            )
          )}
        </TableSectionTbody>
      </TableSectionTable>
    </TableSectionWrapper>
  );
};
