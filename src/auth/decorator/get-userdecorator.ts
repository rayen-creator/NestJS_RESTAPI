import {
    createParamDecorator,
    ExecutionContext,
  } from '@nestjs/common';
  
  //get user object from token
  export const GetUser = createParamDecorator(
    (
      data: string | undefined,
      ctx: ExecutionContext,
    ) => {
      const request: Express.Request = ctx
        .switchToHttp()
        .getRequest();
      if (data) {
        return request.user[data];
      }
      return request.user;
    },
  );
  