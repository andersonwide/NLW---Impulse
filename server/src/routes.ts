import express from 'express'
import { PrismaFeedbackRepository } from './Repositories/prisma/prisma-feedback-repository';
import { SubmitFeedbackFunction } from './Functions/submit-feedback-function';
import { NodemailerMailAdapter } from './Adapter/nodemailerAdapter/nodemailer-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res )=>{
    const {type, comment, screenshot} = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter
    const submitFeedbackFunction = new SubmitFeedbackFunction(
        prismaFeedbackRepository, nodemailerMailAdapter
    )

    await submitFeedbackFunction.execute({
        type,
        comment,
        screenshot,
})

    return res.status(201).send();
})