import crypto from 'crypto';





export class CryptoObserver {
  /**
 * Encrypts data using AES-256-CBC encryption.
 * 
 * @param {string} plaintext - The plaintext data to encrypt.
 * @param {Buffer} encryptionKey - The encryption key as a Buffer.
 * @returns {string} The encrypted data in the format IV:EncryptedData.
 */
static  encryptData = (plaintext: string, encryptionKey: Buffer):string => {
  // Generate a new Initialization Vector (IV) for each encryption
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return `${iv.toString('hex')}:${encrypted}`;
}
/**
 * Decrypts data encrypted with AES-256-CBC encryption.
 * 
 * @param {string} ciphertext - The ciphertext data to decrypt.
 * @param {Buffer} encryptionKey - The encryption key as a Buffer.
 * @returns {string} The decrypted plaintext data.
 */
static  decryptData = (ciphertext: string, encryptionKey: Buffer):string => {
  const [ivHex, encrypted] = ciphertext.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

  
}