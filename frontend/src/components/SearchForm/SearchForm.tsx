import { TextInput } from "../TextInput/TextInput";
import { SelectInput } from "../SelectInput/SelectInput";
import { DatePicker } from "../DatePicker/DatePicker";
import * as validations from "../../utils/validations";
import { useEffect, useState } from "react";
import { FieldGroup } from "../FieldGroup/FieldGroup";
import { SearchFormWrapper } from "./SearchForm.styles";
import { Button } from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { getListOfWorkflowTypes } from "../../api/getListOfWorkflowTypes";
import { getListOfCountries } from "../../api/getListOfCountries";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
export interface CountriesList {
  [key: string]: string;
}

export interface WorkFlowTypesList {
  [key: string]: string;
}

export const SearchForm = () => {
  const [requestId, setRequestId] = useState("");
  const [requestorName, setRequestorName] = useState("");
  const [country, setCountry] = useState({ id: "", value: "" });
  const [email, setEmail] = useState("");
  const [workflowType, setWorkflowType] = useState({ id: "", value: "" });
  const [requestOpenedStartDate, setRequestOpenedStartDate] = useState("");
  const [requestOpenedEndDate, setRequestOpenedEndDate] = useState("");
  const [requestClosedStartDate, setRequestClosedStartDate] = useState("");
  const [requestClosedEndDate, setRequestClosedEndDate] = useState("");
  const [countries, setCountries] = useState<CountriesList>({});
  const [workflowTypes, setWorkflowTypes] = useState<WorkFlowTypesList>({});
  const [requestOpenedDateError, setRequestOpenedDateError] = useState("");
  const [requestClosedDateError, setRequestClosedDateError] = useState("");
  const [requestIdError, setRequestIdError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFormValues();
    fetchData();
  }, []);

  useEffect(() => {
    setFormValues();
  }, [navigate, location.search, location.pathname]);

  const fetchData = async () => {
    setIsLoading(true);
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

  const setFormValues = () => {
    const searchParams = Object.fromEntries(
      new URLSearchParams(location.search).entries()
    );

    const values = {
      id: searchParams.id ? searchParams.id : "",
      requestorName: searchParams.requestorName
        ? searchParams.requestorName
        : "",
      email: searchParams.email ? searchParams.email : "",
      requestOpenedStartDate: searchParams.requestOpenedStartDate
        ? searchParams.requestOpenedStartDate
        : "",
      requestOpenedEndDate: searchParams.requestOpenedEndDate
        ? searchParams.requestOpenedEndDate
        : "",
      requestClosedStartDate: searchParams.requestClosedStartDate
        ? searchParams.requestClosedStartDate
        : "",
      requestClosedEndDate: searchParams.requestClosedEndDate
        ? searchParams.requestClosedEndDate
        : "",
      workflowType: searchParams.workflowType ? searchParams.workflowType : "",
      country: searchParams.country ? searchParams.country : "",
    };

    for (const [key, value] of Object.entries(values)) {
      switch (key) {
        case "id":
          setRequestId(value);
          break;
        case "requestorName":
          setRequestorName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "requestOpenedStartDate":
          setRequestOpenedStartDate(value);
          break;
        case "requestOpenedEndDate":
          setRequestOpenedEndDate(value);
          break;
        case "requestClosedStartDate":
          setRequestClosedStartDate(value);
          break;
        case "requestClosedEndDate":
          setRequestClosedEndDate(value);
          break;
        case "workflowType":
          setWorkflowType({ id: value, value: workflowTypes[value] });
          break;
        case "country":
          setCountry({ id: value, value: countries[value] });
          break;
      }
    }
  };

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

  return (
    <>
      {isLoading ? <LoadingSpinner zindex={9999} /> : ""}
      <SearchFormWrapper onSubmit={onSubmit}>
        <TextInput
          label="Request ID"
          value={requestId}
          error={requestIdError === "" ? false : true}
          errorMessage={requestIdError}
          width={15}
          onChange={(e) => handleFieldChange("requestId", e.target.value)}
        />
        <TextInput
          label="Requestor Name"
          value={requestorName}
          width={40}
          onChange={(e) => handleFieldChange("requestorName", e.target.value)}
        />
        <TextInput
          label="E-mail"
          value={email}
          width={45}
          onChange={(e) => handleFieldChange("email", e.target.value)}
        />
        <FieldGroup
          name="Request Opened"
          error={requestOpenedDateError === "" ? false : true}
          width={50}
          errorMessage={requestOpenedDateError}
        >
          <DatePicker
            label="Start Date"
            value={
              requestOpenedStartDate ? new Date(requestOpenedStartDate) : null
            }
            width={50}
            onChange={(date) =>
              handleFieldChange(
                "requestOpenedStartDate",
                date ? format(date as Date, "yyyy-MM-dd") : ""
              )
            }
          />
          <DatePicker
            label="End Date"
            width={50}
            value={requestOpenedEndDate ? new Date(requestOpenedEndDate) : null}
            onChange={(date) =>
              handleFieldChange(
                "requestOpenedEndDate",
                date ? format(date as Date, "yyyy-MM-dd") : ""
              )
            }
          />
        </FieldGroup>
        <FieldGroup
          name="Request Closed"
          width={50}
          error={requestClosedDateError === "" ? false : true}
          errorMessage={requestClosedDateError}
        >
          <DatePicker
            label="Start Date"
            width={50}
            value={
              requestClosedStartDate ? new Date(requestClosedStartDate) : null
            }
            onChange={(date) =>
              handleFieldChange(
                "requestClosedStartDate",
                date ? format(date as Date, "yyyy-MM-dd") : ""
              )
            }
          />
          <DatePicker
            label="End Date"
            width={50}
            value={requestClosedEndDate ? new Date(requestClosedEndDate) : null}
            onChange={(date) =>
              handleFieldChange(
                "requestClosedEndDate",
                date ? format(date as Date, "yyyy-MM-dd") : ""
              )
            }
          />
        </FieldGroup>
        <SelectInput
          label="Country"
          options={countries}
          width={50}
          value={country.id}
          onChange={(e) => handleFieldChange("country", e.target.value)}
        />
        <SelectInput
          label="Workflow Type"
          options={workflowTypes}
          value={workflowType.id}
          width={50}
          onChange={(e) => handleFieldChange("workflowType", e.target.value)}
        />

        <Button
          width={100}
          alignitems="flex-end"
          display="flex"
          disabled={
            requestOpenedDateError !== "" ||
            requestClosedDateError !== "" ||
            requestIdError !== ""
          }
        >
          Submit
        </Button>
      </SearchFormWrapper>
    </>
  );
};
