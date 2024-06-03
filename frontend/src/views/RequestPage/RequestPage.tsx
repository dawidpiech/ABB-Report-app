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
import { useThrowAsyncError } from "../../hooks/useThrowAsyncError.tsx";
import { useAuth } from "../../hooks/useAuth.ts";

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
  const throwAsyncError = useThrowAsyncError();
  const { accessToken, accessTokenLoaded } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (params.stepID && params.id) {
          const responseData = await getRequestDataOnStep(
            params.id,
            params.stepID,
            accessToken
          );
          const responseFiles = await getListOfRequestFiles(
            params.id,
            params.stepID,
            accessToken
          );
          const responseSteps =
            requestData.steps.length !== 0
              ? { data: requestData.steps }
              : await getListOfRequestSteps(params.id, accessToken);
          if (responseData && responseFiles && responseSteps) {
            setRequestData({
              data: responseData.data,
              steps: responseSteps.data,
              files: responseFiles.data,
            });
          }
        } else {
          if (params.id) {
            const responseData = await getRequestInitialData(
              params.id,
              accessToken
            );
            const responseFiles = await getListOfRequestFiles(
              params.id,
              params.stepID,
              accessToken
            );
            const responseSteps =
              requestData.steps.length !== 0
                ? { data: requestData.steps }
                : await getListOfRequestSteps(params.id, accessToken);
            if (responseData && responseFiles && responseSteps) {
              setRequestData({
                data: responseData.data,
                steps: responseSteps.data,
                files: responseFiles.data,
              });
            }
          }
        }
      } catch (error) {
        throwAsyncError(error);
      } finally {
        if (accessTokenLoaded) setIsLoading(false);
      }
    };

    if (accessTokenLoaded) fetchData();
  }, [params, accessTokenLoaded]);

  return (
    <>
      <RequestStepNavigation steps={requestData.steps}></RequestStepNavigation>
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <RequestData
          data={requestData.data}
          files={requestData.files}
        ></RequestData>
      )}
    </>
  );
};
