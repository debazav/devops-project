module.exports = {
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    reporters: [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Test Report",
          outputPath: `./reports/test-report-${new Date().toISOString().replace(/:/g, '-')}.html`,
          includeFailureMsg: true,
          includeConsoleLog: true
        }
      ]
    ]
  };
  