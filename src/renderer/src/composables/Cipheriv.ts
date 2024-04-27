import crypto from 'crypto';

export function useCipheriv() {
  const algorithm: string = 'aes-192-cbc';
  let key: Buffer | null = null;

  function encrypt(cipherivSalt: string, password: string): Promise<string> {
    const salt = Buffer.from('salt', 'utf8');

    return new Promise((resolve, _reject) => {
      crypto.pbkdf2(cipherivSalt, salt, 100000, 24, 'sha256', (err, derivedKey): void => {
        if (err) {
          throw err;
        }
        
        key = derivedKey;

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(password, 'utf8', 'hex');

        return resolve(encrypted + cipher.final('hex') + '|' + iv.toString('hex'));
      });
    });
  }

  function dencrypt(encryptedData: string): string | boolean {
    try {
      const [encrypted, ivHex] = encryptedData.split('|');
      if (!ivHex) {
        throw new Error('IV not found');
      }

      const iv = Buffer.from(ivHex, 'hex');
      if (!key) {
        throw new Error('Key not derived');
      }

      const decipher = crypto.createDecipheriv(algorithm, key, iv);

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
