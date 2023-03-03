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
      return await prisma.link.findMany({
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
    return await prisma.link.findMany({
      orderBy: [
        {
          created_at: "desc",
        },
      ],
    });
  }),
  getCount: procedure.query(async () => {
    const countedByPriority = await prisma.link.groupBy({
      by: ["priority"],
      _count: {
        priority: true,
      },
      orderBy: {
        priority: "asc",
      },
    });

    const result = countedByPriority.map((element) => {
      return { priority: element.priority, count: element._count.priority };
    });

    return result;
  }),
  create: procedure
    .input(
      z.object({
        title: z.string(),
        url: z.string().url(),
        priority: z.number().min(1).max(3),
      })
    )
    .mutation(async ({ input }) => {
      const link = await prisma.link.create({
        data: input,
      });

      return link;
    }),
  updatePriority: procedure
    .input(
      z.object({
        id: z.number(),
        priority: z.number().min(1).max(3),
      })
    )
    .mutation(async ({ input }) => {
      const link = await prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          priority: input.priority,
        },
      });

      return link;
    }),
});
