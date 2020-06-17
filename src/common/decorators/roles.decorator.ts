import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]): MethodDecorator => SetMetadata('roles', roles);
