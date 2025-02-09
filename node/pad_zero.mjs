import { readdirSync, rename } from 'fs';

const list = readdirSync('./');
for (const file of list) {
  const match3 = file.match(/(?<=_\d_)\d{3}\.ts$/);
  const match2 = file.match(/(?<=_\d_)\d{2}\.ts$/);
  const match1 = file.match(/(?<=_\d_)\d{1}\.ts$/);
  let newFile;
  if (match1) {
    newFile = file.slice(0, -4) + '000' + match1[0];
  } else if (match2) {
    newFile = file.slice(0, -5) + '00' + match2[0];
  } else if (match3) {
    newFile = file.slice(0, -6) + '0' + match3[0];
  } else {
    continue;
  }
  rename(file, newFile, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(newFile);
    }
  });
}
