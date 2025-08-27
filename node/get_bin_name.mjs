import { readSync, readdir, open, statSync } from 'fs';
import { join } from 'path';

const PATH = 'C:/ProgramData/Blackmagic Design/DaVinci Resolve/Support/plugins/'

function readName(file) {
  const filePath = join(PATH, file)
  const fileSize = statSync(filePath).size
  let position = fileSize - 46
  open(filePath, (err, fd) => {
    if (err) console.error(err);
    let name = ''
    const buffer = Buffer.alloc(1)
    for (let i = 0; i < 35; i++) {
      readSync(fd, buffer, 0, 1, position)
      const letter = buffer.toString()
      name = letter + name
      position--
    }
    name = name.match(/[\w ]+\.\w+/)
    console.log(`${file} | ${name?.[0]?.padEnd(20)} | ${(fileSize / 1048576).toFixed(2)}`);
  })
}

readdir(PATH, (err, files) => {
  if (err) console.error(err);
  for (const file of files) {
    if (file.endsWith('.bin')) {
      readName(file)
    }
  }
})