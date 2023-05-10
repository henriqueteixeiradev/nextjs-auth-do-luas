import "express";

declare module "express" {
  export interface Request {
    company: any;
  }
}
