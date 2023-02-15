import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('user')
export class UserController {
    @UseGuards()
    @Get('/me')
    getme() {
        return "Hello World";
    }
}
