import { UseGuards, applyDecorators } from "@nestjs/common";

import { Roles } from "./roles.decorator"
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export const UseRoles = (...roles: string[]): MethodDecorator => {
	return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
}