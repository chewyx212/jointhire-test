import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import TopNavbar from "./TopNavbar"
import { Routes, Route } from "react-router-dom";
import { CataloguePage } from "./pages/CataloguePage"
import { HomePage } from "./pages/HomePage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <TopNavbar />
    <Routes>
        <Route path="/"  element={<HomePage />} />
        <Route path="/catalogue" element={<CataloguePage />} />

    </Routes>
  </ChakraProvider>
);
