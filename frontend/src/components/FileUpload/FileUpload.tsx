import { Field } from "../../api/getInitialRequestData";
import {
  LoadingSpinner,
  LoadingSpinnerAnimation,
  LoadingSpinnerLabel,
  StyledFile,
  StyledFileUploadWrapper,
  StyledLabel,
  StyledValue,
} from "./FileUpload.styles";
import { File } from "../../api/getListOfRequestFiles";
import { getRequestFile } from "../../api/getRequestFile";
import { useState } from "react";
import { useThrowAsyncError } from "../../hooks/useThrowAsyncError";
import ErrorBoundary from "../Error/ErrorBoundary";
import { useAuth } from "../../hooks/useAuth";

interface FieldProps {
  value: Field;
  listOfFiles: File[];
}

export const FileUpload = ({ value, listOfFiles }: FieldProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const throwAsyncError = useThrowAsyncError();
  const { accessToken } = useAuth();

  const downloadFile = async (id: string, fileName: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getRequestFile(id, accessToken);

      if (response) {
        const fileData = response.data[0].File;
        const uint8Array = new Uint8Array(fileData.data);

        const blob = new Blob([uint8Array], {
          type: response.data[0].MimeType,
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error(
          "An error occurred while downloading the file. Please try again later."
        );
      }
    } catch (error) {
      throwAsyncError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <StyledFileUploadWrapper>
        <StyledLabel>{value.nameOfField}:</StyledLabel>
        <StyledValue>
          {listOfFiles.map((file, index) => (
            <StyledFile
              key={index}
              onClick={() => downloadFile(file.FileUUID, file.Filename)}
            >
              {file.Filename}
            </StyledFile>
          ))}
        </StyledValue>
        {isLoading ? (
          <>
            <LoadingSpinner>
              <LoadingSpinnerAnimation />
              <LoadingSpinnerLabel>Dowloading...</LoadingSpinnerLabel>
            </LoadingSpinner>
          </>
        ) : (
          ""
        )}
      </StyledFileUploadWrapper>
    </ErrorBoundary>
  );
};
