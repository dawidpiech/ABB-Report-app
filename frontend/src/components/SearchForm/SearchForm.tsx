import { TextInput } from "../TextInput/TextInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { DatePicker } from "../DatePicker/DatePicker";
import * as validations from "../../utils/validations";
import { useEffect, useState } from "react";
import { FieldGroup } from "../FieldGroup/FieldGroup";
import { SearchFormWrapper } from "./SearchForm.styles";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { getListOfWorkflowTypes } from "../../api/getListOfWorkflowTypes";
import { getListOfCountries } from "../../api/getListOfCountries";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

export interface CountriesList {
  [key: string]: string;
}

export interface WorkFlowTypesList {
  [key: string]: string;
}

export const SearchForm = () => {
  const [requestId, setRequestId] = useState("");
  const [requestIdError, setRequestIdError] = useState("");
  const [requestorName, setRequestorName] = useState("");
  const [country, setCountry] = useState({ id: "", value: "" });
  const [email, setEmail] = useState("");
  const [workflowType, setWorkflowType] = useState({ id: "", value: "" });
  const [requestOpenedStartDate, setRequestOpenedStartDate] = useState("");
  const [requestOpenedEndDate, setRequestOpenedEndDate] = useState("");
  const [requestOpenedDateError, setRequestOpenedDateError] = useState("");
  const [requestClosedStartDate, setRequestClosedStartDate] = useState("");
  const [requestClosedEndDate, setRequestClosedEndDate] = useState("");
  const [requestClosedDateError, setRequestClosedDateError] = useState("");
  const [countries, setCountries] = useState<CountriesList>({});
  const [workflowTypes, setWorkflowTypes] = useState<WorkFlowTypesList>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesList = await getListOfCountries();
        const workflowTypesList = await getListOfWorkflowTypes();

        if (countriesList) setCountries(countriesList);
        if (workflowTypesList) setWorkflowTypes(workflowTypesList);
        setIsLoading(false);
      } catch (error) {
        console.error("Wystąpił błąd:", error);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case "requestId":
        setRequestId(value);
        setRequestIdError(validations.validateRequestId(value));
        break;
      case "requestorName":
        setRequestorName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "workflowType":
        setWorkflowType({ id: value, value: workflowTypes[value] });
        break;
      case "country":
        setCountry({ id: value, value: countries[value] });
        break;
      case "requestOpenedStartDate":
        setRequestOpenedStartDate(value);
        setRequestOpenedDateError(
          validations.validateDateRange(value, requestOpenedEndDate)
        );
        break;
      case "requestOpenedEndDate":
        setRequestOpenedEndDate(value);
        setRequestOpenedDateError(
          validations.validateDateRange(requestOpenedStartDate, value)
        );
        break;
      case "requestClosedStartDate":
        setRequestClosedStartDate(value);
        setRequestClosedDateError(
          validations.validateDateRange(value, requestClosedEndDate)
        );
        break;
      case "requestClosedEndDate":
        setRequestClosedEndDate(value);
        setRequestClosedDateError(
          validations.validateDateRange(requestClosedStartDate, value)
        );
        break;
      default:
        break;
    }
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const params: string[] = [];
    if (requestId) {
      params.push(`id=${requestId}`);
    }
    if (requestorName) {
      params.push(`requestorName=${requestorName}`);
    }
    if (country.id) {
      params.push(`country=${country.id}`);
    }
    if (email) {
      params.push(`email=${email}`);
    }
    if (workflowType.id) {
      params.push(`workflowType=${workflowType.id}`);
    }
    if (requestOpenedStartDate) {
      params.push(`requestOpenedStartDate=${requestOpenedStartDate}`);
    }
    if (requestOpenedEndDate) {
      params.push(`requestOpenedEndDate=${requestOpenedEndDate}`);
    }
    if (requestClosedStartDate) {
      params.push(`requestClosedStartDate=${requestClosedStartDate}`);
    }
    if (requestClosedEndDate) {
      params.push(`requestClosedEndDate=${requestClosedEndDate}`);
    }

    navigate(`/?${params.join("&")}`);
  };

  return isLoading ? (
    <LoadingSpinner>fasdfsda</LoadingSpinner>
  ) : (
    <SearchFormWrapper onSubmit={onSubmit}>
      <TextInput
        label="Request ID"
        value={requestId}
        error={requestIdError === "" ? false : true}
        errorMessage={requestIdError}
        width={20}
        onChange={(e) => handleFieldChange("requestId", e.target.value)}
      />
      <TextInput
        label="Requestor Name"
        value={requestorName}
        width={40}
        onChange={(e) => handleFieldChange("requestorName", e.target.value)}
      />
      <SelectInput
        label="Country"
        options={countries}
        width={40}
        value={country.id}
        onChange={(e) => handleFieldChange("country", e.target.value)}
      />
      <TextInput
        label="E-mail"
        value={email}
        width={50}
        onChange={(e) => handleFieldChange("email", e.target.value)}
      />
      <SelectInput
        label="Workflow Type"
        options={workflowTypes}
        value={workflowType.id}
        width={50}
        onChange={(e) => handleFieldChange("workflowType", e.target.value)}
      />
      <FieldGroup
        name="Request Opened"
        error={requestOpenedDateError === "" ? false : true}
        width={40}
        errorMessage={requestOpenedDateError}
      >
        <DatePicker
          label="Start Date"
          value={requestOpenedStartDate}
          width={50}
          onChange={(date) =>
            handleFieldChange("requestOpenedStartDate", date.target.value)
          }
        />
        <DatePicker
          label="End Date"
          width={50}
          value={requestOpenedEndDate}
          onChange={(date) =>
            handleFieldChange("requestOpenedEndDate", date.target.value)
          }
        />
      </FieldGroup>
      <FieldGroup
        name="Request Closed"
        width={40}
        error={requestClosedDateError === "" ? false : true}
        errorMessage={requestClosedDateError}
      >
        <DatePicker
          label="Start Date"
          width={50}
          value={requestClosedStartDate}
          onChange={(date) =>
            handleFieldChange("requestClosedStartDate", date.target.value)
          }
        />
        <DatePicker
          label="End Date"
          width={50}
          value={requestClosedEndDate}
          onChange={(date) =>
            handleFieldChange("requestClosedEndDate", date.target.value)
          }
        />
      </FieldGroup>
      <Button width={20} alignitems="flex-end" display="flex">
        Submit
      </Button>
    </SearchFormWrapper>
  );
};
