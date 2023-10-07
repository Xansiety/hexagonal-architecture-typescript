import { initTRPC } from '@trpc/server';
import { DashboardApi } from '../../app/dashboard-api';
import { AuthenticatedUserSchema, RegisterSchema } from '../../app/schemas/user.schema';

export function authTRPCAdapterDriver(dashboardApi: DashboardApi, trcp: ReturnType<typeof initTRPC.create>) {
  return trcp.router({
    login: trcp.procedure
      .input(RegisterSchema.pick({ email: true, password: true }))
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => {
        // this can help to avoid the need to create a new schema if in the client the property names are different to schema zod names
        const { mail } = {
          ...input,
          mail: input.email
        };
        
        return dashboardApi.login(mail, input.password);
      }),
    register: trcp.procedure
      .input(RegisterSchema)
      .output(AuthenticatedUserSchema)
      .mutation(({ input }) => dashboardApi.register(input))
  });
}
