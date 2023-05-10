import express, { type Request, type Response } from "express";
import cors from "cors";
import { sign } from "jsonwebtoken";
import { hashSync, compare } from "bcrypt";
import path from "node:path";

import { auth } from "./auth";

import { prisma } from "./database/connection";

import * as env from "./config/env";

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, "..", "uploads")));
  app.use(
    cors({
      origin: "*",
      allowedHeaders: "*",
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  app.get("/", auth, async (request: Request, response: Response) => {
    const company = { ...request.company };

    delete company.password;

    return response.json(company);
  });

  app.get("/:username", async (request, response) => {
    const { username } = request.params;

    const data = await prisma.company.findUnique({
      where: {
        username,
      },
    });

    delete data.password;

    return response.json(data);
  });

  app.post("/sessions", async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const data = await prisma.company.findUnique({
      where: {
        email,
      },
    });

    if (!data) {
      return response.status(401).json({
        message: "email or password invalid",
      });
    }

    const passwordHash = await compare(password, data.password);
    if (!passwordHash) {
      return response.status(401).json({
        message: "email or password invalid",
      });
    }

    const accessToken = sign({ id: data.id }, env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return response.json({
      accessToken,
    });
  });

  app.listen({ port: env.PORT, host: "0.0.0.0" });
  console.log(`http://localhost:${env.PORT}`);
}

bootstrap();
