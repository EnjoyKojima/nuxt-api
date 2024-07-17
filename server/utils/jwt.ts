import { SignJWT,JWTPayload, jwtVerify } from 'jose';
import { auth } from '@/schemas'

// { name = 'jwt', secret, alg = 'HS256', crit, schema, nbf, exp, ...payload }

export default {
  sign: (payload: JWTPayload):Promise<string> => {
    const jwt = new SignJWT({ ...payload })
    const runtimeConfig = useRuntimeConfig();
    return jwt.sign(runtimeConfig.jwt.secret);
  },
  verify: async (jwt:any):Promise<false | JWTPayload> => {
    if (!jwt) return false;
    try {
        const runtimeConfig = useRuntimeConfig();
        const {payload} = await jwtVerify(jwt, runtimeConfig.jwt.secret);
        const {success,data} = auth.jwt.safeParse(payload);
        if (!success) return false;
        return data;
    } catch (_) {
        return false;
    }
  }
}
