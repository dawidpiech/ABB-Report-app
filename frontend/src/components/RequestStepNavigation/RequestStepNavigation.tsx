import {
  RequestStepNavigationWrapper,
  SlideInfo,
  StepWrapper,
} from "./RequestStepNavigation.styles";
import { RequestStep } from "../../api/getListOfRequestSteps";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface StepNavigationProps {
  steps: RequestStep[];
}

export const RequestStepNavigation = ({ steps }: StepNavigationProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [hasMovedEnough, setHasMovedEnough] = useState(false);
  const { stepID } = useParams();

  const navigationRef = useRef<HTMLDivElement>(null);

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
    <>
      <SlideInfo>Click and swipe left to see the remaining steps. </SlideInfo>
      <RequestStepNavigationWrapper
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        ref={navigationRef}
      >
        {steps.map((e, index) => (
          <StepWrapper
            key={index}
            to={`/request/${e.RequestID}/${e.RequestActivityID}`}
            $isActive={String(e.RequestActivityID) === String(stepID)}
          >
            {e.WorkflowTransitionName}
          </StepWrapper>
        ))}
      </RequestStepNavigationWrapper>
    </>
  );
};
