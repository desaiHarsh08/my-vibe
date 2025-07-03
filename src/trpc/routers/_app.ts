import { string, z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
    createAI: baseProcedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query((opts) => {
            return {
                greeting: `hello ${opts.input.text}`,
            };
        }),
    invoke: baseProcedure
        .input(
            z.object({
                value: string(),
            }),
        )
        .mutation(async ({ input }) => {
            await inngest.send({
                name: "test/hello.world",
                data: {
                    value: input.value
                }
            })

            return {
                ok: "success"
            }
        })
});
// export type definition of API
export type AppRouter = typeof appRouter;
