import ReactServer from "react-dom/server";
import React from "react";
import Page from "./main";
import { StaticRouter } from "react-router-dom/server";

export const stringifyJSX = (opt: { script: string, url: string, isDevMode: boolean }) => {
    const htmlFromJSX = ReactServer.renderToString(
        <html lang="en">
            <head>
                <title>Document</title>
            </head>
            <body>
                <div id="root">
                    <StaticRouter location={opt.url}>
                        <React.StrictMode>
                            <Page />
                        </React.StrictMode>
                    </StaticRouter>
                </div>
                {opt.isDevMode
                    ? <script dangerouslySetInnerHTML={{ __html: opt.script }}></script>
                    : <script  src="/client-entry.js"></script>
                }
            </body>
        </html>
    );

    return htmlFromJSX;
}


