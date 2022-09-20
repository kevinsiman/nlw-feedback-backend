import { FeedbackRepository } from "../repositories/feedbacks-repository";
import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbackData {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private FeedbackRepository: FeedbackRepository,
    private MailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackData) {
    await this.FeedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.MailAdapter.sendMail({
      subject: "Feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16pt;">`,
        `<p>Tipo: ${type} </p>`,
        `<p>Comentario: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
