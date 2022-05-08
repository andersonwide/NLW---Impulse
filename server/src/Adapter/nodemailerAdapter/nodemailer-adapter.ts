import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f9362c76fac6c5",
      pass: "249a5bf5e38185"
    }
});
 
export class NodemailerMailAdapter implements MailAdapter{
   async sendMail({subject, body}: SendMailData) {

        await transport.sendMail({
        from: 'Equipe help help',
        to: 'Anderson Michael <andersonwide@outlook.com>',
        subject,
        html: body,
    });

   }
}