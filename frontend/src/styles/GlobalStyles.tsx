import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

html{
    box-sizing: border-box;
}

*, *::after, *::before{
    box-sizing: inherit;
}

body{
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-size: ${({ theme }) => theme.fontSize};
    margin: 0;
    padding: 0;
}

a, button{
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

a{
    text-decoration: none;
    cursor: pointer;
}
`;
