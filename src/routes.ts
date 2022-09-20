import express from "express";
import { PrismaFeedbackRepository } from "./repositories/prisma/prisma-feedback-repository";
import { NodeMailerAdapter } from "./adapters/nodemailer/nodemailer-adapter";
import { SubmitFeedback } from "./use-cases/submit-feedback";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodeMailerAdapter = new NodeMailerAdapter();
  const submitFeedback = new SubmitFeedback(
    prismaFeedbackRepository,
    nodeMailerAdapter
  );

  await submitFeedback.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
