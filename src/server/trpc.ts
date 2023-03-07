import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

const loggerMiddleware = middleware(async ({ path, type, next }) => {
  const result = await next();
  result.ok
    ? console.log("tRPC: success", { path, type })
    : console.log("tRPC: fail", { path, type });

  return result;
});

export const router = t.router;
export const procedure = t.procedure.use(loggerMiddleware);
