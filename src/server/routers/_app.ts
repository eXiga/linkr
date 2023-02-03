import { z } from "zod";
import { procedure, router } from "../trpc";

// for now it will be basic hello world to check if everything is fine
export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello, ${input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
