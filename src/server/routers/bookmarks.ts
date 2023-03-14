import { z } from "zod";
import { prisma } from "../prisma";

import { procedure, router } from "../trpc";

export const bookmarksRouter = router({
  getByPriorityId: procedure
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
      const bookmark = await prisma.link.create({
        data: input,
      });

      return bookmark;
    }),
  updatePriority: procedure
    .input(
      z.object({
        id: z.number(),
        priority: z.number().min(1).max(3),
      })
    )
    .mutation(async ({ input }) => {
      const bookmark = await prisma.link.update({
        where: {
          id: input.id,
        },
        data: {
          priority: input.priority,
        },
      });

      return bookmark;
    }),
  delete: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const bookmark = await prisma.link.delete({
        where: {
          id: input.id,
        },
      });

      return bookmark;
    }),
});
