import { Link } from "react-router-dom";
import { StepNavigationWrapper } from "./StepNavigation.styles";
import { RequestStep } from "../../api/getListOfRequestSteps";

interface StepNavigationProps {
  steps: RequestStep[];
}

export const StepNavigation = ({ steps }: StepNavigationProps) => {
  return (
    <StepNavigationWrapper>
      <Link to="http://localhost:5173/request/102911/5110">
        fsafasfasdfasfasd
      </Link>
    </StepNavigationWrapper>
  );
};
