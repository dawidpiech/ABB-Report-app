import { FieldWrapperProps } from "./FieldWrapper";
import styled from "styled-components";

export const FieldWrapperBlock = styled.div<FieldWrapperProps>`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  padding: 15px 10px;
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  ${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : "")};
  input,
  select {
    width: 100%;
  }
`;
