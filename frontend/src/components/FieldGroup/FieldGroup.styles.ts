import { FieldGroupProps } from "./FieldGroup";
import styled from "styled-components";

export const FieldGroupBlock = styled.div<FieldGroupProps>`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
`;

export const FieldGroupName = styled.p<FieldGroupProps>`
  width: 100%;
  margin: 0;
`;
