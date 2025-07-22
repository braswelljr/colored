/**
 * copy - write text to clipboard
 * @param {string} text
 * @returns {Promise<void>}
 */
export default function copy(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
