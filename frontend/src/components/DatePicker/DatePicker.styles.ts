import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const StyledDatePicker = styled(DatePicker)`
  min-height: 2rem;
  font-size: 1.2rem;
  border: unset;
  border-radius: 4px;
  margin-left: 5px;
  outline-color: ${({ theme }) => theme.colors.brightRed};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`;

export const StyledDatePickerWrapper = styled.div`
  display: block;
  width: 100%;
  cursor: pointer;

  > div {
    width: 100%;
  }

  button::after {
    background-color: unset;
    color: ${({ theme }) => theme.colors.red};
    font-size: 2rem;
  }
`;
