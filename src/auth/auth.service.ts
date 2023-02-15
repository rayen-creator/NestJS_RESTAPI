import { ConfigService } from '@nestjs/config/dist';
import { JwtPayload, Secret } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from './dto/auth.dto';
import * as argon from "argon2";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { Prisma } from '@prisma/client'
import { JwtService } from "@nestjs/jwt/dist";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                },
            });
            // //delete the hash from the object before return it
            // delete user.hash
            // return user;
            return this.signToken(user.id, user.email);


        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }

    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        const valid = await argon.verify(user.hash, dto.password);

        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }
        // delete the hash from the object before return it
        // delete user.hash;

        return this.signToken(user.id, user.email);
    }
    async signToken(userId: number, email: string): Promise<{access_token : string}> {
        const Secret = this.config.get('JWT_SECRET');
        const payload=  {
            sub: userId,
            email
        }
       const token=await this.jwt.signAsync(payload , {
            expiresIn: '15m',
            secret: Secret
        });
       
        return {
            access_token : token
        }
      
    }
}