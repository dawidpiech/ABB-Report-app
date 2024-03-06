import styled from "styled-components";

interface ViewWrapperProps {
  $isActive: boolean;
}

export const ViewWrapper = styled.div<ViewWrapperProps>`
  display: ${(props) => (props.$isActive ? "flex" : "none")};
  flex-wrap: wrap;
  width: 100%;
`;
