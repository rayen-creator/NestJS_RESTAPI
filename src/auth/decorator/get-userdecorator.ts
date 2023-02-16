import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data:unknown ,ctx:ExecutionContext)=>{
        const req : Express.Request= ctx.switchToHttp().getRequest();
        return req.user;
    } 
)