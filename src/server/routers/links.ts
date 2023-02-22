import { z } from "zod";
import { prisma } from "../prisma";

import { procedure, router } from "../trpc";

export const linksRouter = router({
  getById: procedure
    .input(
      z.object({
        priority: z.number(),
      })
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
  getAll: procedure.query(async () => {
    return await prisma.links.findMany({
      orderBy: [
        {
          created_at: "asc",
        },
      ],
    });
  }),
});
