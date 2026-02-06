import fs from "fs";

export const loggerMiddleware = (req, res, next) => {
  const log = `${new Date().toISOString()} | ${req.method} | ${req.path}\n`;
  fs.appendFileSync("logs.txt", log);
  next();
};
