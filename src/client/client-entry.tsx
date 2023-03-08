import React from "react";
import ReactDOM from "react-dom/client";
import Page from "./main";
import { BrowserRouter } from "react-router-dom";
import { JssProvider } from "react-jss";
import { generateId } from "./server-entry";


ReactDOM.hydrateRoot(
    document.getElementById("root")!,
    <BrowserRouter>
        <React.StrictMode >
            <JssProvider generateId={generateId}>
                <Page />
            </JssProvider>
        </React.StrictMode >
    </BrowserRouter>
);

// const styles = document.getElementById("server-side-styles")!;
// styles.parentNode?.removeChild(styles);