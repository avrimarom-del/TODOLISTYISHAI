import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod"; // Add ZodRawShape here
import { HttpError } from "../errors/HttpError";

interface ValidationTarget {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const validate = (schemas: ValidationTarget) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        const parsedParams = await schemas.params.parseAsync(req.params);
        Object.defineProperty(req, "params", {
          value: parsedParams,
          writable: true,
          configurable: true,
        });
      }

      if (schemas.query) {
        const parsedQuery = await schemas.query.parseAsync(req.query);
        Object.defineProperty(req, "query", {
          value: parsedQuery,
          writable: true,
          configurable: true,
        });
      }

      if (schemas.body) {
        Object.defineProperty(req, "body", {
          value: await schemas.body.parseAsync(req.body),
          writable: true,
          configurable: true,
        });
      }

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // Using 'issues' is the most type-safe way to map Zod errors
        const message = (error as ZodError).issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");

        throw new HttpError(message, 400);
      }
      next(error);
    }
  };
};
