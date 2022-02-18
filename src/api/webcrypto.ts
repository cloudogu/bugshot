type Config = {
  hash: string;
  iterations: number;
  keyLength: number;
  passwordRef: string;
};

const passwords: { [key: string]: string } = {
  firstOne: "Hb2*e2FxFinpd6pc6Lbur9Kxz6tMFw@c",
};

const createDefaultConfig = (): Config => ({
  hash: "SHA-256",
  iterations: 1000,
  keyLength: 48,
  passwordRef: "firstOne",
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const bufferToBase64 = (buffer: any) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const base64ToBuffer = (base64: string) => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const derive = async (config: Config, salt: Uint8Array) => {
  const textEncoder = new TextEncoder();
  const passwordBuffer = textEncoder.encode(passwords[config.passwordRef]);
  const importedKey = await crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveBits"]);

  const params = { name: "PBKDF2", hash: config.hash, salt, iterations: config.iterations };
  const derivation = await crypto.subtle.deriveBits(params, importedKey, config.keyLength * 8);
  return derivation;
};

const createKey = async (derivation: ArrayBuffer) => {
  const derivedKey = derivation.slice(0, 32);
  const iv = derivation.slice(32);
  const importedEncryptionKey = await crypto.subtle.importKey("raw", derivedKey, { name: "AES-CBC" }, false, [
    "encrypt",
    "decrypt",
  ]);
  return {
    key: importedEncryptionKey,
    iv,
  };
};

const createSalt = () => crypto.getRandomValues(new Uint8Array(16));

export const encrypt = async (value: string) => {
  const salt = createSalt();
  const config = createDefaultConfig();

  const derivation = await derive(config, salt);
  const { key, iv } = await createKey(derivation);

  const buffer = new TextEncoder().encode(value);
  const encryptedText = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, buffer);

  return btoa(
    JSON.stringify({
      config,
      salt: bufferToBase64(salt),
      value: bufferToBase64(encryptedText),
    })
  );
};

export const decrypt = async (encrypted: string) => {
  const enc = JSON.parse(atob(encrypted));

  const derivation = await derive(enc.config, base64ToBuffer(enc.salt));
  const { key, iv } = await createKey(derivation);

  const decryptedText = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, base64ToBuffer(enc.value));
  return new TextDecoder().decode(decryptedText)
};
