import { z } from "zod";
import { prisma } from "../prisma";

import { procedure, router } from "../trpc";

export const appRouter = router({
  links: procedure
    .input(
      z
        .object({
          priority: z.number(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      return await prisma.links.findMany({
        where: {
          priority: {
            equals: input?.priority,
          },
        },
        orderBy: [
          {
            created_at: "asc",
          },
        ],
      });
    }),
});

export type AppRouter = typeof appRouter;
