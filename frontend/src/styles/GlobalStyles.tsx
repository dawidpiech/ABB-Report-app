import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
