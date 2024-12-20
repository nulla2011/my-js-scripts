const crypto = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const PATH = 'C:/Users/nulla/Desktop/temp/mai/day/all/';
const KEY_PATH = 'C:/Users/nulla/Desktop/serve (4).key';
const KEY = readFileSync(KEY_PATH);
const IV = Buffer.alloc(16, 0);
// const aesKey = crypto.enc.Utf8.parse(KEY);

const main = () => {
  for (let index = 0; index < 1157; index++) {
    try {
      decodeFile(`index_13_${index.toString().padStart(4, '0')}.ts`);
    } catch (error) {
      console.error(error);
    }
  }
};
// const decodeFile = (name) => {
//   const data = readFileSync(join(PATH, name));
//   const wordArray = crypto.lib.WordArray.create(data);
//   const decryptedData = crypto.AES.decrypt(wordArray, aesKey);
//   writeFileSync(join(PATH, '../test/t.ts'), decryptedData.toString(crypto.enc.Utf8), 'utf8');
// };
const decodeFile = (name) => {
  const data = readFileSync(join(PATH, name));
  const decipher = crypto.createDecipheriv('aes-128-cbc', KEY, IV);
  let decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  writeFileSync(join(PATH, `../test/${name}_decrypted.ts`), decrypted);
};
main();
