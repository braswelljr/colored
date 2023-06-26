import * as fs from 'node:fs/promises'
import { join } from 'path'

/**
 * writeFile - write file to disk
 * @param {string} path - path to file
 * @param {string} file - file name with extension
 * @param {string} content - content to write
 * @param {boolean} [append=false] - append to file
 * @return {Promise<void>}
 */
export async function writeFile(
  path: string,
  file: string,
  content: string,
  append = false
): Promise<void> {
  const filePath = join(path, file)
  const options = append ? { flag: 'a' } : { flag: 'w' }

  await fs.writeFile(filePath, content, options)
}
