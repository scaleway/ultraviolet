export type PascalToCamelCase<S extends string> =
  S extends `${infer P1}${infer P2}` ? `${Lowercase<P1>}${P2}` : S
