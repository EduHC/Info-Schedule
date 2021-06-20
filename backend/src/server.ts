import express from 'express';
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import 'express-async-errors';

import routes from "./routes";
import './database/connection';
import { BaseError, ValidationError } from './errors/Errors';
import { RepositoryNotFoundError } from 'typeorm';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({
        name: err.name,
        message: err.message,
        stack: err.stack
      });
    }

    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        name: err.name,
        message: err.message,
        errors: err.errors
      });
    }

    if (err instanceof RepositoryNotFoundError) {
      return res.status(500).json({
        name: err.name,
        message: err.message
      });
    }
    
    return res.status(500).json({
      name: err.name,
      message: `Internal server Error: ${err.message}`,
      stack: err.stack
    });
});

app.listen(3333);