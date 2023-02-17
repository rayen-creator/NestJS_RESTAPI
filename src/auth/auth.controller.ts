import { AuthDto } from './dto/auth.dto';
import { Controller, HttpStatus, Post } from "@nestjs/common";
import { Body, HttpCode } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
constructor(private authService: AuthService){}

// @HttpCode(HttpStatus.OK)
@Post('signup')
signup(@Body() authDto: AuthDto){
    
return this.authService.signup(authDto);
}
 
@HttpCode(HttpStatus.OK)
@Post('signin')
signin(@Body() authDto: AuthDto){
    return this.authService.signin(authDto);
}
}