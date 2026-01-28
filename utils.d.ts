/**
 * Usage:
 * Creating an array from string union type.
 * Useful to be used with a typeguard function where the type can evolve in the time like the SDK.
 *
 * @example
 * ```tsx
 *  const orderByArray: TupleUnion<SupportPrivate.v1.ListTicketsRequestOrderBy> = [
 *   'closed_at_asc',
 *   'closed_at_desc',
 *   'created_at_asc',
 *   'created_at_desc',
 *   'updated_at_asc',
 *   'updated_at_desc',
 * ]
 * ```
 */
type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type SingleXOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

declare type ArrayType<T> = T extends (infer U)[] ? U : never

declare type XOR<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
    ? XOR<[SingleXOR<A, B>, ...Rest]>
    : never

declare type NonEmptyArray<T> = [T, ...T[]]

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends ReadonlyArray<infer U>
      ? readonly DeepPartial<U>[]
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P]
}
