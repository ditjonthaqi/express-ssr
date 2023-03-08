import ReactServer from "react-dom/server";
import React from "react";
import Page from "./main";
import { StaticRouter } from "react-router-dom/server";
import { JssProvider, SheetsRegistry, createGenerateId } from "react-jss";


export const generateId = (() => {
    let counter = 0
    return (rule: any, sheet: any) => `entail-ai--${rule.key}`
})();


export const stringifyJSX = (opt: { script: string, url: string, isDevMode: boolean }) => {

    const sheets = new SheetsRegistry();


    const htmlFromJSX = ReactServer.renderToString(
        <html lang="en">
            <head>
                <title>Document</title>
                <style id="server-side-styles" type="text/css"></style>
                <link rel="stylesheet" href="" />
            </head>
            <body>
                <div id="root">
                    <StaticRouter location={opt.url}>
                        <React.StrictMode>
                            <JssProvider registry={sheets} generateId={generateId}>
                                <Page />
                            </JssProvider>
                        </React.StrictMode>
                    </StaticRouter>
                </div>
                {opt.isDevMode
                    ? <script dangerouslySetInnerHTML={{ __html: opt.script }}></script>
                    : <script src="/client-entry.js"></script>
                }
            </body>
        </html >
    );

    if (opt.isDevMode) {
        return htmlFromJSX.replace(`<style id="server-side-styles" type="text/css"></style>`,
            `<style id="server-side-styles" type="text/css">${sheets.toString()}</style>`
        );
    }


    return [htmlFromJSX, sheets.toString()];
}


