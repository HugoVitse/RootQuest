import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/types/auth'
import { cookies } from 'next/headers'


const SECRETKEY = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(SECRETKEY)

export async function encrypt(payload: {username : string}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') : Promise<SessionPayload | string> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return 'Failed to verify session';
  }
}


 
export async function createSession(username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ username})
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}