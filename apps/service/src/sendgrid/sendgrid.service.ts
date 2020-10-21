import { Injectable, NotFoundException } from '@nestjs/common';
import SendGrid = require('@sendgrid/mail');
import { JwtService } from '@nestjs/jwt';
import { SendGridInput } from 'input/email.input';
import { Auth } from 'entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailHistory } from 'entity/email-history';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendgridService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        @InjectRepository(EmailHistory)
        private readonly emailHistoryRepository: Repository<EmailHistory>,
    ){}

    async findToken(token: string): Promise<EmailHistory>{
        try{
        const email = await this.emailHistoryRepository.findOne({token})
        return email;
        }catch(err){
            throw new NotFoundException('Token not found')
        }
    }

    async sendEmail(input: SendGridInput): Promise<Auth>{
        const accessToken = await this.jwtService.sign(
            {
              iss: "key", //key gateway
              sub: input.id,
              type: input.type
            }
        );
        
        const email = await this.emailHistoryRepository.create({
            token: accessToken,
            send_email: input.email,
            form: this.configService.get<string>('app.email.SENDGRID_API_KEY'),
            type: input.type
        })
        await this.emailHistoryRepository.save(email);
        // await SendGrid.setApiKey(this.configService.get<string>('app.email.SENDGRID_API_KEY'))

        // const msg = {
        //     to: 'champuplove@gmail.com',
        //     from: this.configService.get<string>('app.email.SENDGRID_EMAIL'),
        //     subject: 'Blockfyre',
        //     text: 'Test send email',
        //     html: '<strong>Forgot password blockfyre</strong>',
        // }
          
        // try{
        //     await SendGrid.send(msg)
        //     return "Email sent"
        // }catch(err){
        //     return err
        // }
        return {token: accessToken}
    }
}
