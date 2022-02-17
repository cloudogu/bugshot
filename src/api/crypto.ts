import { AES, enc } from "crypto-js";

const keyPrefix = "LIVjvMRo";
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const random = (length: number) => {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

type Encrypted = {
  encrypted: string;
  keySuffix: string;
};

export const decrypt = ({ encrypted, keySuffix }: Encrypted) =>
  AES.decrypt(encrypted, keyPrefix + keySuffix).toString(enc.Utf8);

export const encrypt = (value: string): Encrypted => {
  const keySuffix = random(8);
  const encrypted = AES.encrypt(value, keyPrefix + keySuffix).toString();
  return {
    encrypted,
    keySuffix,
  };
};
