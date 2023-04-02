/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({

  getAll: protectedProcedure
  .input(z.object({topicId: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.prisma.note.findMany({
        where: {
            topicId: input.topicId
        }
    });
  }),
  
  create: protectedProcedure
  .input(z.object({title: z.string(), topicId: z.string(), content: z.string()}))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.note.create({
        data: {
            title: input.title,
            topicId: input.topicId,
            content: input.content
        }
    });
  }),

  delete: protectedProcedure
  .input(z.object({id: z.string()}))
  .mutation(({ ctx, input }) => {
    return ctx.prisma.note.delete({
        where: {
            id: input.id
        }
    });
  })
});
