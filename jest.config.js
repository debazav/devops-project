module.exports = {
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    reporters: [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Test Report",
          outputPath: "./reports/test-report.html",
          includeFailureMsg: true,
          includeConsoleLog: true
        }
      ]
    ]
  };
  