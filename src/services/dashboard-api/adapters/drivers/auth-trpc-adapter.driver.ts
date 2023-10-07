import { initTRPC } from '@trpc/server';
import { DashboardApi } from '../../app/dashboard-api';
import { AuthenticatedUserSchema, RegisterSchema } from '../../app/schemas/user.schema';

export function authTRPCAdapterDriver(dashboardApi: DashboardApi, trcp: ReturnType<typeof initTRPC.create>) {
  return trcp.router({
    login: trcp.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.login(input.email, input.password)),
    register: trcp.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.register(input))
  });
}
