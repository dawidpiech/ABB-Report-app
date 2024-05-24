import {
  RequestStepArrowLeft,
  RequestStepArrowRight,
  RequestStepsNavigationWrapper,
  RequestStepsWrapper,
  StepWrapper,
} from "./RequestStepNavigation.styles";
import { RequestStep } from "../../api/getListOfRequestSteps";
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

interface StepNavigationProps {
  steps: RequestStep[];
}

export const RequestStepNavigation = ({ steps }: StepNavigationProps) => {
  const { stepID } = useParams();
  const stepWrapperRef = useRef<HTMLAnchorElement>(null);
  const requestStepsWrapperRef = useRef<HTMLDivElement>(null);
  const [transformX, setTransformX] = useState<number>(0);
  const wrapperInnerWidth =
    (requestStepsWrapperRef.current &&
      requestStepsWrapperRef.current.offsetWidth) ||
    1260;
  const stepWrapperWidth =
    (stepWrapperRef.current && stepWrapperRef.current.offsetWidth) || 200;
  const firstTransform =
    Math.ceil(wrapperInnerWidth / (stepWrapperWidth + 20)) *
      (stepWrapperWidth + 20) -
    wrapperInnerWidth -
    20;

  const onClickArrowRight = () => {
    transformX === 0
      ? setTransformX(transformX - firstTransform - 20)
      : setTransformX(transformX - stepWrapperWidth - 20);
  };

  const onClickArrorLeft = () => {
    Math.abs(transformX) % (stepWrapperWidth + 20) !== 0
      ? setTransformX(transformX + firstTransform + 20)
      : setTransformX(transformX + stepWrapperWidth + 20);
  };

  return (
    <>
      <RequestStepsNavigationWrapper>
        <RequestStepArrowLeft
          onClick={onClickArrorLeft}
          disabled={transformX === 0}
        />
        <RequestStepsWrapper ref={requestStepsWrapperRef}>
          {steps.map((e, index) => (
            <StepWrapper
              ref={stepWrapperRef}
              transformX={transformX}
              key={index}
              to={`/request/${e.RequestID}/${e.RequestActivityID}`}
              $isActive={String(e.RequestActivityID) === String(stepID)}
            >
              {e.WorkflowTransitionName}
            </StepWrapper>
          ))}
        </RequestStepsWrapper>
        <RequestStepArrowRight
          onClick={onClickArrowRight}
          disabled={
            Math.abs(transformX) + wrapperInnerWidth ===
              steps.length * (stepWrapperWidth + 20) ||
            Math.abs(transformX) + wrapperInnerWidth ===
              steps.length * (stepWrapperWidth + 20) - 20 ||
            Math.abs(transformX) + wrapperInnerWidth ===
              steps.length * (stepWrapperWidth + 20) - 19
          }
        />
      </RequestStepsNavigationWrapper>
    </>
  );
};
