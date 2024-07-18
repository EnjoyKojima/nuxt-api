import { z } from 'zod'
import jwt from "jsonwebtoken";
import {SignJWT} from 'jose'
import { publicProcedure, router } from '../trpc'

export const authRouter = router({
    signJWT: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            console.log({ctx,input})
            const runtimeConfig = useRuntimeConfig()
            const token = jwt.sign({ input }, runtimeConfig.authSecret, {
                expiresIn: '1h',
                algorithm: "HS256",
            });
            return { token }
        }),
    signJW2: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            console.log({ ctx, input })
            const runtimeConfig = useRuntimeConfig()
            const secret = new TextEncoder().encode(runtimeConfig.authSecret)
            const jwt = new SignJWT({ name: input.username })
            const token = await jwt.sign(secret)
            return { token }
        }),
    verifyJWT: publicProcedure
        .input(z.object({
            token: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const runtimeConfig = useRuntimeConfig()
            try {
                const decoded = jwt.verify(input.token, runtimeConfig.authSecret, {
                    algorithms: ["HS256"],
                });
                return { valid: true, decoded }
            } catch (error) {
                return { valid: false, error: error }
            }
        }),
})