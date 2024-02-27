import { FieldWrapperProps } from "./FieldWrapper";
import styled from "styled-components";

export const FieldWrapperBlock = styled.div<FieldWrapperProps>`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
  padding: 15px 10px;
  ${(props) => (props.display ? `display: ${props.display}` : "")};

  input,
  select {
    width: 100%;
  }
`;
