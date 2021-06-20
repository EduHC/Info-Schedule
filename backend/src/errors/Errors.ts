import { HttpStatusCode } from "../utils/HttpStatusCode";
import { fixProto } from "../utils/PrototypeAdjustment";

export class BaseError {
  public readonly name: string;
  public readonly message: string;
  public readonly isOperational: boolean;
  public readonly statusCode: HttpStatusCode;
  public readonly stack: any;

  constructor (name: string, message: string, isOperational: boolean, statusCode: HttpStatusCode) {
    this.name = name;
    this.message = message;
    this.isOperational = isOperational;
    this.statusCode = statusCode;

    fixProto(this, new.target.prototype);
  }
}

export class ValidationError {
  public readonly name: string;
  public readonly errors: any;
  public readonly message: string;
  public readonly isOperational: boolean;
  public readonly statusCode: HttpStatusCode;

  constructor (name: string, errors: Array<any>, isOperational: boolean, statusCode: HttpStatusCode, message: string) {
    this.name = name;
    this.errors = errors;
    this.message = message;
    this.isOperational = isOperational;
    this.statusCode = statusCode;

    fixProto(this, new.target.prototype);
  }
}
