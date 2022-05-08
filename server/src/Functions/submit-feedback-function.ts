import { MailAdapter } from "../Adapter/mail-adapter"
import { FeedbacksRepository } from "../Repositories/feedbacks-repositories"

interface SubmitFeedbackFunctionRequest{
    type: string
    comment: string
    screenshot?: string
}
export class SubmitFeedbackFunction{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackFunctionRequest) {
        const{type, comment, screenshot} = request

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        })

        await this.mailAdapter.sendMail({
             subject: "Novo feedback",
             body: [
                `<p> Tipo de feedback: ${type}<p/>`,
                `<p> Comentário: ${comment}<p/>`,
                `<p> Screenshot de feedback: ${screenshot}<p/>`,
            ].join('\n')
        })
    }
}