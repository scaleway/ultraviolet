import type { ReactNode } from 'react'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type SingleXOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type XOR<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
    ? XOR<[SingleXOR<A, B>, ...Rest]>
    : never

export type PascalToCamelCase<S extends string> =
  S extends `${infer P1}${infer P2}` ? `${Lowercase<P1>}${P2}` : S

export type RemoveSuffix<
  S extends string,
  Suffix extends string,
> = S extends `${infer Prefix}${Suffix}` ? Prefix : S

/**
 * This type removes the suffix from a PascalCase string and converts it to camelCase. Pretty useful for Icon, CategoryIcon and ProductIcon components.
 * Their names being `AddressIcon` but we might need to have `address` as the prop name.
 */
export type PascalToCamelCaseWithoutSuffix<
  T extends string,
  Suffix extends string,
> = T extends `${infer Prefix}${Suffix}`
  ? `${PascalToCamelCase<Prefix extends `${infer First}${infer Rest}` ? `${First}${Rest}` : never>}`
  : never

/**
 * Classic prop type where label is a ReactNode and aria-label is a string.
 * One or another is required.
 */
export type LabelProp =
  | {
      label: ReactNode
      'aria-label'?: never
    }
  | {
      label?: never
      'aria-label': string
    }
