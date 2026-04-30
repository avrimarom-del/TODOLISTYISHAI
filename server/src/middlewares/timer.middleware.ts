import { Request, Response, NextFunction } from "express";

const responseTimer = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Finished! Total time: ${duration}ms`);
  });

  next();
};

export { responseTimer };
