const logger = {
  error: (message: string, error?: unknown) => {
    console.error(`error: ${message}`, error || '');
  },

  warn: (message: string) => {
    console.warn(`warning: ${message}`);
  },

  info: (message: string) => {
    console.log(`info: ${message}`);
  },
};

export default logger;
