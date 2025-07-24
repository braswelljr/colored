/**
 * randomId - generates a random id
 * @returns string
 */
export function randomId() {
  // generate a random number
  return Math.random().toString(36).substring(2, 9);
}
