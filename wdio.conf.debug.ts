import type { Options } from "@wdio/types";
export const config: Options.Testrunner = {
    runner: "local",
    tsConfigPath: "./tsconfig.json",
    specs: ["./test/specs/**/*.ts"],
    exclude: [],
    maxInstances: 1,
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    capabilities: [
        {
            browserName: "firefox",
        },
    ],
    logLevel: "info",
    bail: 0,
    waitforTimeout: 60000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 3,
    framework: "jasmine",
    reporters: ["spec"],
    jasmineOpts: {
        defaultTimeoutInterval: 24 * 60 * 60 * 1000,
        expectationResultHandler: function (passed, assertion) {},
    },
};
