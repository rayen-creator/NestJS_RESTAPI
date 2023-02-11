import { AuthDto } from './dto/auth.dto';
import { Controller, Post } from "@nestjs/common";
import { Body } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
constructor(private authService: AuthService){}

@Post('signup')
signup(@Body() authDto: AuthDto){
    
return this.authService.signup(authDto);
}

@Post('signin')
signin(@Body() authDto: AuthDto){
    return this.authService.signin(authDto);
}
}