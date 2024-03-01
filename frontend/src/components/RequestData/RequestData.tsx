import { View } from "../../api/getInitialRequestData.ts";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner.tsx";

interface RequestDataProps {
  data: View[];
}

export const RequestData = ({ data }: RequestDataProps) => {
  console.log(data);
  return (
    <div>
      <div>DADSADSAD ADSAD SSD</div>
    </div>
  );
};
