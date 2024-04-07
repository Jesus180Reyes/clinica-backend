/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export class SendMail {


  private smtpTransport: Transporter<SMTPTransport.SentMessageInfo>;
  private emailTemplateProvider: any;
  private template: any;

  constructor(template: string) {
    this.template = template;
    this.smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: 'luisdejesus200122@gmail.com',
          pass: process.env.NODEMAILER_PASSWORD,
    },
    });
    this.emailTemplateProvider = fs.readFileSync(path.join(__dirname, `../../public/handlebars/${this.template}.hbs`), 'utf8');

  }

  public setTemplate(template: string) {
    this.template = template
  }

  /**
   * Send email
   */
  public send(values: any, subject: string, file?: any) {
    return new Promise((resolve, reject) => {
      const handleTemplate = handlebars.compile(this.emailTemplateProvider)
      const htmlToSend = handleTemplate(values);
      const mailOptions: any = {
        to: values.to ? values.email : process.env.USER_EMAIL_SEND,
        from: 'Edwin Corrales | Clinica la pope <www.edwinantonio40@gmail.com>',
        subject: subject,
        html: htmlToSend,
        attachments: values.filename && [
          {
            filename: values.filename,
            content: file,
          }
        ]
      }

      this.smtpTransport.sendMail(mailOptions, (error: any, response: any) => {
        if (error) {
          reject(error)
          console.error(error);
        } else {
          console.log('message', 'Successfully sent email.')
          resolve({ status: true, message: 'Successfully sent email.', response })
        }
      });

    });
  }

}