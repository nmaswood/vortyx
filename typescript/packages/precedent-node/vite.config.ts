import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "document",
    setupFiles: [],
    env: {
      SQL_URI:
        process.env.SQL_URI ??
        "postgres://postgres:postgres@localhost:5432/summer-test?sslmode=disable",
    },
  },
});
