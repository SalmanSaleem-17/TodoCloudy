import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/utils/token';

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}