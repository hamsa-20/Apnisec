import { cookies } from 'next/headers';

// Next.js 15: cookies() returns a Promise
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function setCookie(
  name: string, 
  value: string, 
  options: any = {}
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}