import { useParams } from "react-router-dom";
import { RequestData } from "../../components/RequestData/RequestData";
import { RequestStepNavigation } from "../../components/RequestStepNavigation/RequestStepNavigation";
import { useEffect, useState } from "react";
import { getRequestInitialData } from "../../api/getInitialRequestData";
import { getRequestDataOnStep } from "../../api/getRequestDataOnStep";
import { View } from "../../api/getInitialRequestData.ts";
import {
  RequestStep,
  getListOfRequestSteps,
} from "../../api/getListOfRequestSteps.ts";
import {
  getListOfRequestFiles,
  File,
} from "../../api/getListOfRequestFiles.ts";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner.tsx";

export const RequestPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [requestData, setRequestData] = useState<{
    data: View[];
    steps: RequestStep[];
    files: File[];
  }>({
    data: [],
    steps: [],
    files: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (params.stepID && params.id) {
        const responseData = await getRequestDataOnStep(
          params.id,
          params.stepID
        );
        const responseFiles = await getListOfRequestFiles(params.id);
        const responseSteps =
          requestData.steps.length !== 0
            ? { data: requestData.steps }
            : await getListOfRequestSteps(params.id);
        if (responseData && responseFiles && responseSteps) {
          setRequestData({
            data: responseData.data,
            steps: responseSteps.data,
            files: responseFiles.data,
          });
        }
      } else {
        if (params.id) {
          const responseData = await getRequestInitialData(params.id);
          const responseFiles = await getListOfRequestFiles(params.id);
          const responseSteps =
            requestData.steps.length !== 0
              ? { data: requestData.steps }
              : await getListOfRequestSteps(params.id);
          if (responseData && responseFiles && responseSteps) {
            setRequestData({
              data: responseData.data,
              steps: responseSteps.data,
              files: responseFiles.data,
            });
          }
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, [params]);

  return isLoading ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <>
      <RequestStepNavigation steps={requestData.steps}></RequestStepNavigation>
      <RequestData
        data={requestData.data}
        files={requestData.files}
      ></RequestData>
    </>
  );
};
