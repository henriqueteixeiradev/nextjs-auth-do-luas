import { verify } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import * as env from "./config/env";
import { prisma } from "./database/connection";

type Auth = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<any>;

export const auth: Auth = async (request, response, next) => {
  try {
    if (!request.headers.authorization) {
      return response.status(400).json({
        message: "jwt is missing",
      });
    }

    const accessToken = request.headers.authorization.replace(
      /^Bearer\s?(.*)/g,
      "$1"
    );

    const payload: any = verify(accessToken, env.JWT_SECRET, {
      ignoreExpiration: false,
    });

    const data = await prisma.company.findUnique({
      where: {
        id: payload.id,
      },
    });

    request.company = data;

    next();
  } catch (error) {
    console.log(error.message);

    return response.status(400).json({
      message: "jwt invalid",
    });
  }
};
