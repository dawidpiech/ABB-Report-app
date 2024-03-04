import { useParams } from "react-router-dom";
import {
  RequestStepNavigationWrapper,
  StepWrapper,
} from "./RequestStepNavigation.styles";
import { RequestStep } from "../../api/getListOfRequestSteps";
import { useState, useEffect } from "react";

interface StepNavigationProps {
  steps: RequestStep[];
}

export const RequestStepNavigation = ({ steps }: StepNavigationProps) => {
  const { stepID } = useParams();
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [hasMovedEnough, setHasMovedEnough] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isMouseDown) {
        setIsMouseDown(false);
        setHasMovedEnough(false);
        document.querySelector(".draggable")?.classList.remove("draggable");
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown]);

  const handleMouseDown: React.MouseEventHandler = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX);
    setStartScrollLeft(e.currentTarget.scrollLeft);
    e.currentTarget.classList.add("draggable");
  };

  const handleMouseMove: React.MouseEventHandler = (e) => {
    if (!isMouseDown) return;

    if (!hasMovedEnough) {
      const x = e.pageX;
      if (Math.abs(x - startX) >= 5) {
        setHasMovedEnough(true);
      } else {
        return;
      }
    }

    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = startScrollLeft - walk;
  };

  return (
    <RequestStepNavigationWrapper
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {steps.map((e) => (
        <StepWrapper
          key={e.WorkflowTransitionID}
          to={`http://localhost:5173/request/${e.RequestID}/${e.WorkflowTransitionID}`}
          isActive={stepID === String(e.WorkflowTransitionID)}
        >
          {e.WorkflowTransitionName}
        </StepWrapper>
      ))}
    </RequestStepNavigationWrapper>
  );
};
