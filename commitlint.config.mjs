const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation changes
        "style", // Code style (formatting, no logic change)
        "refactor", // Code refactoring
        "perf", // Performance improvement
        "test", // Add or update tests
        "chore", // Build, tools, dependencies
        "revert", // Revert previous commit
        "ci", // CI configuration
      ],
    ],
    "subject-case": [0], // Allow any case
    "subject-full-stop": [0], // Allow ending punctuation
    "header-max-length": [2, "always", 150], // Allow longer commit messages
  },
};

export default config;
