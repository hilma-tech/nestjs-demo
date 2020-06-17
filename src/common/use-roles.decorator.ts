import { UseGuards } from "@nestjs/common";

import { Roles } from "./roles.decorator"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";

export const UseRoles = (...roles: string[]): MethodDecorator => {
    const rolesFn = Roles(...roles);
    const useGuardsFn = UseGuards(JwtAuthGuard, RolesGuard);

    const decorator: MethodDecorator = (...rest) => {
        rolesFn(...rest);
        useGuardsFn(...rest);
    }

    return decorator;
}