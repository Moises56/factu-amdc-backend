import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/mail.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-email')
  async sendEmail(@Body() body: Record<string, string>) {
    const dto: SendEmailDto = {
      // from: { name: 'Moises', address: 'moises.aviles@amdc.hn' },
      recipients: [{ name: 'Mou', address: 'mougrind@gmail.com' }],
      subject: 'Test',
      html: ``,
      placeholderReplacements: body,
    };
    return this.mailerService.sendEmail(dto);
  }
}
