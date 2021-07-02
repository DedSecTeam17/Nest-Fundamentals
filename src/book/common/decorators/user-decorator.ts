import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // const user = request.user;

    const user = {
      'id': 101,
      'firstName': 'Alan',
      'lastName': 'Turing',
      'email': 'alan@email.com',
      'roles': ['admin'],
    };

    return data ? user?.[data] : user;
  },
);
