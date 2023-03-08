import React from "react";
import ReactDOM from "react-dom/client";
import Page from "./main";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
    document.getElementById("root")!,
    <BrowserRouter>
        <React.StrictMode >
            <Page  />
        </React.StrictMode >
    </BrowserRouter>
);