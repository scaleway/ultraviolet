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
  S extends string,
  Suffix extends string,
> = PascalToCamelCase<RemoveSuffix<S, Suffix>>
