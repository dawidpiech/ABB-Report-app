export const validateRequestId = (value: string) => {
  if (isNaN(Number(value))) {
    return "Request ID must be a number";
  } else {
    return "";
  }
};

export const validateDateRange = (start: string, end: string) => {
  if (start && end && new Date(start) > new Date(end)) {
    return "End Date must be later than Start Date";
  }
  return "";
};
