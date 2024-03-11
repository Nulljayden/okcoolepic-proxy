// Define a type called `CookieOptions` which represents the optional settings for a cookie.
// It has a single optional property `days` which specifies the number of days until expiration.
type CookieOptions = {
  days?: number;
};

/**
 * Create a cookie with the given name, value, and optional days until expiration.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional settings for the cookie.
 * This function creates a cookie with the specified name and value. If the `options` parameter is provided,
 * the cookie will be set to expire after the specified number of days (`options.days`). If `options` is not provided,
 * the cookie will not have an expiration date.
 */
function createCookie(name: string, value: string, options: CookieOptions = {}): void {
  // Destructure the `days` property from the `options` parameter
  const { days } = options;

  // Calculate the expiration date based on the `days` property
  const expirationDate = days
    ? new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    : undefined;

  // Create the `expires` string based on the expiration date
  const expires = expirationDate ? `expires=${expirationDate.toUTCString()};` : '';

  // Set the cookie with the specified name, value, and expiration date
  document.cookie = `${name}=${value}; ${expires} path=/`;
}

/**
 * Read the value of a cookie with the given name.
 * @param name - The name of the cookie.
 * @returns The value of the cookie or null if not found.
 * This function reads the value of a cookie with the specified name. If the cookie is not found, it returns `null`.
 */
function readCookie(name: string): string | null {
  // Define the `nameEQ` constant which is the name of the cookie followed by an equals sign
  const nameEQ = `${name}=`;

