import { Request, Response, NextFunction } from "express";

const timeoutGuard = (req: Request, res: Response, next: NextFunction) => {
  const timer = setTimeout(() => {
    if (!res.headersSent) {
      res
        .status(503)
        .json({ error: "Request timed out. The server is taking too long." });
    }
  }, 30000);

  res.on("finish", () => {
    clearTimeout(timer);
  });

  next();
};

export { timeoutGuard };
