import styled from "styled-components";

interface FieldWrapperBlockProps {
  width: number;
  alignitems: string;
  display: string;
}

export const FieldWrapperBlock = styled.div<FieldWrapperBlockProps>`
  width: ${(props) => (props.width ? `${props.width}%` : "100%")};
  align-items: ${(props) => (props.alignitems ? props.alignitems : "")};
  padding: 15px 10px;
  ${(props) => (props.display ? `display: ${props.display}` : "")};

  input,
  select {
    width: 100%;
  }
`;
