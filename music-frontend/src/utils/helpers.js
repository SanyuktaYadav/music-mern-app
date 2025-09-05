import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key';

// Encrypt plaintext to base64 string
export function encryptText(plainText) {
  const encrypted = CryptoJS.AES.encrypt(plainText, secretKey);
  // encrypted.toString() returns base64 by default
  return encrypted.toString();
}

// Decrypt base64 ciphertext back to plaintext
export function decryptText(cipherTextBase64) {
  const decrypted = CryptoJS.AES.decrypt(cipherTextBase64, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
}
