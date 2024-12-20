import { readFileSync } from 'fs';
import { resolve } from 'path';
import { exec } from 'child_process';

const STEP_LENGTH = 10;
const APP_PATH = 'C:/Program Files/Honeyview/Honeyview.exe';
const IMG_PATH = 'Z:/shared/Android/data/com.tencent.mobileqq/Tencent/MobileQQ/chatpic/chatimg/';

const main = (count) => {
  const list = readFileSync('C:/users/nulla/desktop/img_list.txt', 'utf-8').split('\n');
  for (let i = count * STEP_LENGTH; i < count * STEP_LENGTH + STEP_LENGTH; i++) {
    exec(`"${APP_PATH}" ${resolve(IMG_PATH, list[i].split('	')[1])}`);
  }
};
main(process.argv[2]);
