import pino from "pino";

const LEVEL_TO_SECURITY: Record<string, string> = {
  trace: "DEBUG",
  debug: "DEBUG",
  info: "INFO",
  warn: "WARNING",
  error: "ERROR",
  fatal: "CRITICAL",
};

export const LOGGER = pino({
  messageKey: "message",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label: string) {
      if (process.env.LOCAL_DEV_LOGGER) {
        return { level: label };
      }

      return { level: label, severity: LEVEL_TO_SECURITY[label] || label };
    },

    log(object) {
      if (object instanceof Error) {
        return {
          ...object,
          stack: object.stack,
          message: object.message,
        };
      }
      return object;
    },
  },
});
