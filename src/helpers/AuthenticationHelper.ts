import crypto from 'crypto';

const SECRET = 'FILL-THE-ROOMZ';

/**
 * Generates a random string.
 * @returns {string} - The random string.
 */
export const random = (): string => crypto.randomBytes(128).toString('base64');

/**
 * Generates an authentication hash using a salt and password.
 * @param {string} salt - The salt.
 * @param {string} password - The password.
 * @returns {string} - The authentication hash.
 */
export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
