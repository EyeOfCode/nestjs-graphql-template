import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Telegram } from 'entity/telegram.entity';
import { TelegramInput, TelegramUserInput } from 'input/telegram.input';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {omit} from 'lodash'
import { ChangePasswordInput, ForgotPasswordInput, VerifyEmailInput } from 'input/auth.input';
import { SendgridService } from '../sendgrid/sendgrid.service';
import { Auth } from 'entity/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TelegramService {
    constructor(
        @InjectRepository(Telegram)
        private readonly telegramRepository: Repository<Telegram>,
        @Inject(forwardRef(() => SendgridService))
        private readonly sendgridService: SendgridService,

        private readonly jwtService: JwtService
    ){}

    async findEmail(email: string): Promise<Telegram>{
      const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValidEmail = emailExpression.test(
        String(email).toLowerCase(),
      );
      if (!isValidEmail) {
        throw new BadRequestException('email not in proper format');
      }
      return this.telegramRepository.findOne({ email });
    }
  
    async find(): Promise<Telegram[]> {
      return this.telegramRepository.find();
    }
  
    async findById(id: string): Promise<Telegram> {
      const res = await this.telegramRepository.findOne(id);
      if (!res) {
        throw new NotFoundException('user not found');
      }
      return res;
    }
  
    async updateById(input: TelegramUserInput, id: string): Promise<Telegram> {
      const res = await this.telegramRepository.findOne(id);
      if (!res) {
        throw new NotFoundException('user not found');
      }
      const data = this.telegramRepository.create(input);
      return this.telegramRepository.save({ ...data, id });
    }
  
    async removeById(id: number): Promise<Telegram> {
      const res = await this.telegramRepository.findOne(id);
      if (!res) {
        throw new Error('user not found');
      }
      await this.telegramRepository.delete(id);
      return res;
    }
  
    async create(input: TelegramInput): Promise<Telegram> {
        const telegram = this.telegramRepository.create(input);
        telegram.id_telegram = input.user.id
        const email = await this.findEmail(input.email)
        if(email){
          throw new BadRequestException('duplicate email')
        }
        telegram.password = await bcrypt.hashSync(telegram.password,10);
        const omitId = await omit(input.user, ['id'])
        const data = {
          ...telegram,
          ...omitId
        }
        return this.telegramRepository.save(data);
    }

    async forgotPassword(input: ForgotPasswordInput): Promise<Auth>{
      const checkEmail = await this.findEmail(input.email)
      if(checkEmail){
        return this.sendgridService.sendEmail({id: checkEmail.id, type: "forgot-password", email: checkEmail.email})
      }
      throw new NotFoundException('user not found')
    }

    async validatorEmail(input: VerifyEmailInput): Promise<Telegram>{
      const checkToken = await this.sendgridService.findToken(input.token)
      if(!checkToken){
        throw new NotFoundException('token not found')
      }
      try{
        const accessToken = await this.jwtService.verifyAsync(input.token);
        if(accessToken.sub){
          return this.findById(accessToken.sub)
        }
        throw new NotFoundException('user not found')
      }catch(err){
        throw new BadRequestException('invalid token')
      }
    }

    async changePassword(input: ChangePasswordInput): Promise<string>{
      const data = this.telegramRepository.create({
        password: await bcrypt.hashSync(input.password,10)
      });
      try{
        const user = await this.telegramRepository.update(input.id, data)
        if(user){
          return "Success to change password"
        }
        throw new NotFoundException('user not found')
      }catch(err){
        throw new BadRequestException('invalid id')
      }
    }
}
