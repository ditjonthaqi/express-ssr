import express from "express";
import { config as initEnv } from "dotenv";
import * as esbuild from "esbuild";
import path from "path";
import fs from "fs";
initEnv();


const app = express();

const isDevMode = process.env.NODE_ENV === "development";

const serverEntryFilename = isDevMode
    ? path.resolve(__dirname, "../client/server-entry.tsx")
    : path.resolve(__dirname, "../client/server-entry.js");

const clientEntryFilename = isDevMode
    ? path.resolve(__dirname, "../client/client-entry.tsx")
    : path.resolve(__dirname, "../client/client-entry.js");

const serverBundleResult = esbuild.buildSync({
    entryPoints: [serverEntryFilename],
    target: "node10.4",
    write: false,
    platform: "node",
    bundle: true,
    sourcemap: isDevMode ? true : false,
    minify: isDevMode ? false : true
});

const clientBundleResult = esbuild.buildSync({
    entryPoints: [clientEntryFilename],
    bundle: true,
    write: false,
    platform: "browser",
    sourcemap: isDevMode ? true : false,
    minify: isDevMode ? false : true
});

if (!isDevMode) {
    app.use(express.static("./dist/client"));
}

(async () => {

    const [serverEntryOutput] = serverBundleResult.outputFiles;
    const [clientEntryOutput] = clientBundleResult.outputFiles;

    const stringifyJSX = <(opt: { script: string, url: string, isDevMode: boolean }) => string | [string, string]>
        (requireFromString(serverEntryOutput.text).stringifyJSX);

    app.get("*", (req, res) => {
        const htmlFromJSX = stringifyJSX({ script: clientEntryOutput.text, url: req.url, isDevMode })
        if (!isDevMode && typeof htmlFromJSX !== "string") {
            let toSend = htmlFromJSX[0].replace(`<style id="server-side-styles" type="text/css"></style>`,
                `<link rel="stylesheet" href="/main.css" />`
            );
            fs.writeFileSync(path.resolve(__dirname, "../client/main.css"), htmlFromJSX[1]);

            return   res.type("html").send(toSend);
        }
        res.type("html").send(htmlFromJSX);
    });

})();

const port = process.env.PORT || 3000
app.listen(port, () => console.log("started at port:" + port));

function requireFromString(src: string) {
    var Module = module.constructor;
    ///@ts-ignore
    var m = new Module();
    m._compile(src, "");
    return m.exports;
}
