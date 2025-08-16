export function decodeJWT(token: string) {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload; // { exp: number, ... }
  } catch {
    return null;
  }
}
