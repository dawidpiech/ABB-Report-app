import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import { loginRequest } from "../config/azureConfig";

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const [accessTokenLoaded, setAccessTokenLoaded] = useState(false);

  const { instance, accounts } = useMsal();

  useEffect(() => {
    const getToken = async () => {
      if (accounts[0]) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          setAccessToken(response.accessToken);
          setAccessTokenLoaded(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getToken();
  }, [instance, accounts]);

  return { accessToken, accessTokenLoaded };
};
