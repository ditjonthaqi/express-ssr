import ReactServer from "react-dom/server";
import React from "react";
import Page from "./main";
import { StaticRouter } from "react-router-dom/server";

export const stringifyJSX = (opt: { script: string, url: string }) => {
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
                <script dangerouslySetInnerHTML={{ __html: opt.script }}></script>
            </body>
        </html>
    );

    return htmlFromJSX;
}


