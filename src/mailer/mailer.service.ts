import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './dto/mail.interface';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
    return transporter;
  }

  template(html: string, replacements: Record<string, string>) {
    return html.replace(/%(\w*)%/g, function (m, key) {
      return replacements.hasOwnProperty(key) ? replacements[key] : '';
    });
  }

  async sendEmail(dto: SendEmailDto) {
    const { from, recipients, subject, text } = dto;
    const html = dto.placeholderReplacements;
    const transporter = this.mailTransport();

    const mailOptions = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIN_FROM'),
      },
      to: recipients,
      subject,
      text,
      html,
    };

    try {
      const result = await transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.error("Error: Couldn't send email", error);
    }
  }
}
