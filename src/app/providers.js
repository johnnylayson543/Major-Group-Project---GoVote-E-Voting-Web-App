'use client'
import { ThemeProvider } from "@mui/material/styles";
import theme from './components/theme';
import { UserAuthentication } from "./components/header/userAuthentication";

export function Providers({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <UserAuthentication>
                {children}
            </UserAuthentication>
        </ThemeProvider>
    );
}