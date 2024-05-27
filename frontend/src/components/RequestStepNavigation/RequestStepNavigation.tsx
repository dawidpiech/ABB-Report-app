import {
  RequestStepArrowLeft,
  RequestStepArrowRight,
  RequestStepsNavigationWrapper,
  RequestStepsWrapper,
  StepWrapper,
} from "./RequestStepNavigation.styles";
import { RequestStep } from "../../api/getListOfRequestSteps";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface StepNavigationProps {
  steps: RequestStep[];
}

export const RequestStepNavigation = ({ steps }: StepNavigationProps) => {
  const { stepID } = useParams();
  const requestStepsWrapperInnerRef = useRef<HTMLDivElement>(null);
  const [stepsWrapperInnerWidth, setStepsWrapperInnerWidth] =
    useState<number>(0);
  const [stepWrapperWidth, setStepWrapperWidth] = useState<number>(0);
  const [firstTransform, setFirstTransform] = useState<number>(0);
  const [transformx, setTransformX] = useState<number>(0);

  useEffect(() => {
    if (
      requestStepsWrapperInnerRef.current &&
      requestStepsWrapperInnerRef.current.childNodes[0]
    ) {
      const stepWrapper = requestStepsWrapperInnerRef.current
        .childNodes[0] as HTMLElement;
      const stepWrapperWidth = stepWrapper.offsetWidth;
      setStepsWrapperInnerWidth(
        requestStepsWrapperInnerRef.current.offsetWidth
      );
      setStepWrapperWidth(stepWrapperWidth);

      setFirstTransform(
        Math.ceil(stepsWrapperInnerWidth / (stepWrapperWidth + 20)) *
          (stepWrapperWidth + 20) -
          stepsWrapperInnerWidth -
          20
      );
    }
  }, [requestStepsWrapperInnerRef, stepsWrapperInnerWidth]);

  const onClickArrowRight = () => {
    transformx === 0
      ? setTransformX(transformx - firstTransform - 20)
      : setTransformX(transformx - stepWrapperWidth - 20);
  };

  const onClickArrorLeft = () => {
    Math.abs(transformx) % (stepWrapperWidth + 20) !== 0
      ? setTransformX(transformx + firstTransform + 20)
      : setTransformX(transformx + stepWrapperWidth + 20);
  };

  return (
    <>
      <RequestStepsNavigationWrapper>
        <RequestStepArrowLeft
          onClick={onClickArrorLeft}
          disabled={transformx === 0}
        />
        <RequestStepsWrapper ref={requestStepsWrapperInnerRef}>
          {steps.map((e, index) => (
            <StepWrapper
              transformx={transformx}
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
            Math.abs(transformx) + stepsWrapperInnerWidth >=
              steps.length * (stepWrapperWidth + 20) ||
            Math.abs(transformx) + stepsWrapperInnerWidth >=
              steps.length * (stepWrapperWidth + 20) - 20
          }
        />
      </RequestStepsNavigationWrapper>
    </>
  );
};
