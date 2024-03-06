import styled from "styled-components";

interface FieldWrapperBlockProps {
  $width: number | undefined;
  $alignitems: string | undefined;
  $display: string | undefined;
}

export const FieldWrapperBlock = styled.div<FieldWrapperBlockProps>`
  width: ${(props) => (props.$width ? `${props.$width}%` : "100%")};
  align-items: ${(props) => (props.$alignitems ? props.$alignitems : "")};
  padding: 15px 10px;
  ${(props) => (props.$display ? `display: ${props.$display}` : "")};

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  input,
  select {
    width: 100%;
  }
`;
