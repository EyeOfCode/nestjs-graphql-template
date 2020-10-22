import { Injectable, NotFoundException } from '@nestjs/common';
import SendGrid = require('@sendgrid/mail');
import { JwtService } from '@nestjs/jwt';
import { SendGridInput } from 'input/email.input';
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
        const email = await this.emailHistoryRepository.findOne({token, is_active: false})
        return email;
        }catch(err){
            throw new NotFoundException('Token not found')
        }
    }

    async activeEmail(email: string): Promise<string>{
        const emailHistory = await this.emailHistoryRepository.find({send_email: email, is_active: false})
        if(emailHistory.length > 0){
            await emailHistory.map(data => this.emailHistoryRepository.update(data.id, {is_active: true}))
        }
        return "success to updated active all"
    }

    async sendEmail(input: SendGridInput): Promise<boolean>{
        const accessToken = await this.jwtService.sign(
            {
              iss: "key", //key gateway
              sub: input.id,
              type: input.type
            }
        );

        await SendGrid.setApiKey(this.configService.get<string>('app.email.SENDGRID_API_KEY'))

        const msg = {
            to: input.email,
            from: this.configService.get<string>('app.email.SENDGRID_EMAIL'),
            templateId: "d-02f73ec9e002483388903dcef7f08aae",
            dynamic_template_data: {
                url: `${input.callback}?token=${accessToken}`
            }
        }
          
        try{
            await SendGrid.send(msg)
            const email = await this.emailHistoryRepository.create({
                token: accessToken,
                send_email: input.email,
                form: this.configService.get<string>('app.email.SENDGRID_EMAIL'),
                type: input.type
            })
            await this.emailHistoryRepository.save(email);
            return true
        }catch(err){
            console.log('=>', err)
            return false
        }
    }
}
