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

interface FieldProps {
  value: Field;
  listOfFiles: File[];
}

export const FileUpload = ({ value, listOfFiles }: FieldProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (id: string, fileName: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getRequestFile(id);

      if (response) {
        const blob = new Blob([response.data], { type: "application/pdf" });
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
          "An error occurred while downloading the file. Please try again later. "
        );
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Błąd pobierania pliku:", error);
    }
  };

  return (
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
  );
};
