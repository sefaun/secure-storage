import crypto from 'crypto';

export function useCipheriv(cipherivSalt: string) {
  const algorithm: string = 'aes-192-cbc';
  let key;

  function encrypt(password: string) {
    key = crypto.scryptSync(cipherivSalt, 'salt', 24);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(password, 'utf8', 'hex');

    return encrypted + cipher.final('hex') + '|' + Buffer.from(iv).toString('hex');
  }

  function dencrypt(hashed_password: string): string | boolean {
    try {
      const [encrypted, iv] = hashed_password.split('|');
      if (!iv) {
        throw new Error('IV not found');
      }

      key = crypto.scryptSync(cipherivSalt, 'salt', 24);
      const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

      return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    } catch (error) {
      return false;
    }
  }

  return {
    encrypt,
    dencrypt,
  };
}
