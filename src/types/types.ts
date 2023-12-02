export type Primitive = string | number | boolean | null | undefined | symbol | bigint

export interface ErrorCause extends Error {
  cause?: { error: Error; res: Response }
}
