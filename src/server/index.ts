import express from "express";
import { config as initEnv } from "dotenv";
import * as esbuild from "esbuild";
import path from "path";
initEnv();

const app = express();


const isDevMode = process.env.NODE_ENV === "development";
const serverEntryFilename = isDevMode
    ? path.resolve(__dirname, "../client/server-entry.tsx")
    : path.resolve(__dirname, "../client/server-entry.js");

const clientEntryFilename = isDevMode
    ? path.resolve(__dirname, "../client/client-entry.tsx")
    : path.resolve(__dirname, "../client/client-entry.js");

(async () => {
    const serverBundleResult = esbuild.buildSync({
        entryPoints: [serverEntryFilename],
        target: "node10.4",
        write: false,
        platform: "node",
        bundle: true,
        minify: true,
    });

    const clientBundleResult = esbuild.buildSync({
        entryPoints: [clientEntryFilename],
        bundle: true,
        write: false,
        platform: "browser",
        sourcemap: true,
        minify: true
    });

    const [serverEntryOutput] = serverBundleResult.outputFiles;
    const [clientEntryOutput] = clientBundleResult.outputFiles;

    const stringifyJSX = <(opt: { script: string, url: string }) => string>(requireFromString(serverEntryOutput.text).stringifyJSX);

    app.get("*", (req, res) => {
        const htmlFromJSX = stringifyJSX({ script: clientEntryOutput.text, url: req.url })
        res.type("html").send(htmlFromJSX);
    });

})();

function requireFromString(src: string) {
    var Module = module.constructor;
    ///@ts-ignore
    var m = new Module();
    m._compile(src, "");
    return m.exports;
}
app.listen(3000, () => console.log("started"));