import * as fs from 'fs';

export async function readFileAsync(path: string) {
  return fs.promises.readFile(path, 'utf8');
}

export async function saveFileAsync(path: string, content: string) {
  return fs.promises.writeFile(path, content, 'utf8');
}
