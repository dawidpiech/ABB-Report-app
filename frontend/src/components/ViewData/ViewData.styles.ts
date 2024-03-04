import styled from "styled-components";
import { theme } from "../../styles/theme";

interface ViewWrapperProps {
  isActive: boolean;
}

export const ViewWrapper = styled.div<ViewWrapperProps>`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex-wrap: wrap;
  width: 100%;
`;
