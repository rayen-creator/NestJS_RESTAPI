import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from './dto/auth.dto';
import * as argon from "argon2";
import { ForbiddenException } from "@nestjs/common/exceptions";
import {  Prisma } from '@prisma/client'

@Injectable()
export class AuthService{
constructor(private prisma: PrismaService){}

    async signup(dto:AuthDto){
        const hash=await argon.hash(dto.password);
        try{
            const user =await this.prisma.user.create({
                data:{
                    email: dto.email,
                    hash
            },
        });
        delete user.hash
        return  user;

        }catch(error){
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if (error.code == 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
       
    }

   async signin(dto:AuthDto){
       const user=await this.prisma.user.findUnique({
              where:{
                email:dto.email
            },
       });
       if (!user){
              throw new ForbiddenException('Invalid credentials');
       }
       const valid=await argon.verify(user.hash,dto.password);

       if (!valid){
              throw new ForbiddenException('Invalid credentials');
       }

       delete user.hash;
       return user;
    }
}