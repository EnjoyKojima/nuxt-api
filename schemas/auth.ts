import * as z from 'zod'

export const input = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8).max(50),
})

export const jwt = z.object({
    iss: z.string().optional(),
    sub: z.string().optional(),
    aud: z.union([z.string(), z.array(z.string())]).optional(),
    jti: z.string().optional(),
    nbf: z.union([z.string(), z.number()]).optional(),
    exp: z.union([z.string(), z.number()]).optional(),
    iat: z.string().optional()
})
