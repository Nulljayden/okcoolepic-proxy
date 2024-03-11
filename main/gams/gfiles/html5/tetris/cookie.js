type CookieOptions = {
  days?: number;
};

/**
 * Create a cookie with the given name, value, and optional days until expiration.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional settings for the cookie.
 */
function createCookie(name: string, value: string, options: CookieOptions = {}): void {
  const { days } = options;
  const expirationDate = days
    ? new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    : undefined;
  const expires = expirationDate ? `expires=${expirationDate.toUTCString()};` : '';
  document.cookie = `${name}=${value}; ${expires} path=/`;
}

/**
 * Read the value of a cookie with the given name.
 * @param name - The name of the cookie.
 * @returns The value of the cookie or null if not found.
 */
function readCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies: string[] = document.cookie.split(';');

  for (const cookie of cookies) {
    let c = cookie.trim();
    if (c.startsWith(nameEQ)) {
      return c.substring(nameEQ.length);
    }
  }

  return null;
}

/**
 * Erase a cookie with the given name.
 * @param name - The name of the cookie.
 */
function eraseCookie(name: string): void {
  createCookie(name, '', { days: -1 });
}
